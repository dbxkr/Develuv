package kr.bit.service;

import kr.bit.dto.*;
import kr.bit.mapper.MatchingListMapper;
import kr.bit.mapper.UserMapper;
import kr.bit.model.User;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    TokenService tokenService;

    @Autowired
    MatchingListMapper matchingListMapper;

    @Autowired
    private JavaMailSender mailSender;

    private Map<String, String> verificationCodes = new HashMap<>();
    private Map<String, Long> verificationCodeTimestamps = new HashMap<>();

    public String findPwEmail(UserFindPwDTO findPwDTO) {

        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder result = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 12; i++) {
            int index = random.nextInt(characters.length());
            result.append(characters.charAt(index));
        }

        findPwDTO.setNew_password(BCrypt.hashpw(result.toString(), BCrypt.gensalt()));

        int res = userMapper.sendPwToEmail(findPwDTO);
        String sendResult = "";

        if (res == 0) {
            sendResult = "아이디 혹은 이메일을 다시 확인하세요";
        } else {
            MimeMessage message = mailSender.createMimeMessage();
            try {
                MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");

                messageHelper.setFrom("btt0408@gmail.com", "Develuv");
                messageHelper.setSubject("Develuv 임시 비밀번호 발급");
                messageHelper.setTo(findPwDTO.getUser_email());
                messageHelper.setText("임시 비밀번호: " + result.toString() + "\n이후 마이페이지에서 비밀번호를 변경해주세요.");
                mailSender.send(message);

            } catch (Exception e) {
                e.printStackTrace();
            }
            sendResult = "메일을 확인해주세요.";
        }
        return sendResult;
    }

    public UserFindIdDTO findId(UserFindIdDTO findIdDTO) {
        UserFindIdDTO userFindIdDTO = userMapper.findId(findIdDTO);
        if (userFindIdDTO == null || userFindIdDTO.getUser_id() == null) {
            userFindIdDTO = new UserFindIdDTO();
            userFindIdDTO.setUser_id("이메일을 다시 확인하세요");;
        }else if(!userFindIdDTO.getUser_provider_id().equals("develuv")){
            userFindIdDTO.setUser_id(userFindIdDTO.getUser_provider_id()+"를 통해 가입한 계정입니다.\n해당 서비스를 통해 로그인 해주세요.");
        }
        return userFindIdDTO;
    }

    public String findPw(UserFindPwDTO findPwDTO) {
        String pw = userMapper.findPw(findPwDTO);
        if (pw == null) {
            pw = "아이디 혹은 이메일을 다시 확인하세요";
        }
        return pw;
    }

    public UserLoginDTO login(String userId, String userPw) {
        UserLoginDTO userLoginDTO = userMapper.login(userId);
        if (userLoginDTO != null) {
            boolean passwordMatches = BCrypt.checkpw(userPw, userLoginDTO.getUser_pw());
            if (passwordMatches) {
                return userLoginDTO;
            }
        }
        return null;
    }

    public boolean findById(String user_id) {
        return userMapper.findById(user_id) != null;
    }

    public void updateUserProfile(UserDto userDto) {
        if (userDto.getUser_pw() != null && !userDto.getUser_pw().isEmpty()) {
            String hashedPassword = BCrypt.hashpw(userDto.getUser_pw(), BCrypt.gensalt());
            userDto.setUser_pw(hashedPassword);
        }
        userMapper.updateUserProfile(userDto);
    }

    public String findPasswordByUserId(String userId) {
        return userMapper.findPasswordByUserId(userId);
    }
    public void saveUser(UserDto userDto) {
        String hashedPassword = BCrypt.hashpw(userDto.getUser_pw(), BCrypt.gensalt());
        userDto.setUser_pw(hashedPassword);
        userMapper.save(userDto);
    }

    public boolean isUserIdAvailable(String userId) {
        return !userMapper.existsById(userId);
    }

    public boolean isUserEmailAvailable(String email) {
        return !userMapper.existsByEmail(email);
    }

    public String sendVerificationCode(String email) {
        if (!isUserEmailAvailable(email)) {
            return "이미 가입된 이메일입니다.";
        }

        MimeMessage message = mailSender.createMimeMessage();
        String success = "인증번호가 발송되었습니다";
        try {
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
            String verificationCode = generateVerificationCode();
            verificationCodes.put(email, verificationCode);
            verificationCodeTimestamps.put(email, System.currentTimeMillis());
            messageHelper.setFrom("btt0408@gmail.com", "Develuv");
            messageHelper.setSubject("Develuv 가입 인증 번호.");
            messageHelper.setTo(email);
            messageHelper.setText("인증번호: " + verificationCode);
            mailSender.send(message);

        } catch (Exception e) {
            e.printStackTrace();
            success = "메일 전송에 실패했습니다. 주소를 다시 확인해주세요.";
        }
        return success;
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(9000) + 1000;
        return String.valueOf(code);
    }

    public String verifyCode(String email, String code) {
        String storedCode = verificationCodes.get(email);
        Long timestamp = verificationCodeTimestamps.get(email);
        long validDuration = 5 * 60 * 1000;

        if (storedCode != null && storedCode.equals(code) && (System.currentTimeMillis() - timestamp) < validDuration) {
            return "인증이 완료되었습니다.";
        } else {
            return "인증번호가 일치하지 않거나 만료되었습니다. 다시 입력해주세요.";
        }
    }

    public String findNameById(String user_id) {
        return userMapper.findUserNameById(user_id);
    }

    public UserDto findUserById(String user_id) {
        UserDto userDto = userMapper.findUserById(user_id);
        userDto.setToken(tokenService.getToken(user_id).getToken());
        return userDto;
    }

    public UserDto findOtherUserById(String user_id, String my_id) {
        UserDto userDto = userMapper.findOtherUserById(user_id, my_id);
        userDto.setUser_city(matchingListMapper.findLatLonByUserId(user_id).getCity());
        return userDto;
    }

    public void updateOneProfile(UserProfileUpdate userProfileUpdate) {
        String type = userProfileUpdate.getType();
        if (type.equals("git")) {
            userMapper.updateProfileGit(userProfileUpdate);
        } else if (type.equals("memo")) {
            userMapper.updateProfileMemo(userProfileUpdate);
        }else if (type.equals("nbti")) {
            userMapper.updateProfileNbti(userProfileUpdate);
        }else if (type.equals("proLang")) {
            userMapper.updateProfileProLang(userProfileUpdate);
        }else if (type.equals("drink")) {
            userMapper.updateProfileDrink(userProfileUpdate);
        }else if (type.equals("smoke")) {
            userMapper.updateProfileSmoke(userProfileUpdate);
        }else if (type.equals("religion")) {
            userMapper.updateProfileReligion(userProfileUpdate);
        }else if (type.equals("edu")) {
            userMapper.updateProfileEdu(userProfileUpdate);
        }else if (type.equals("user_profile")) {
            userMapper.updateProfileProfile(userProfileUpdate);
        }else if (type.equals("user_address")) {
            userMapper.updateProfileAddress(userProfileUpdate);
        }


    }

    public List<User> recommendUser(String userId, String excludedUserIds) {
        return userMapper.findUsers(userId, excludedUserIds);
    }

    public List<User> findUsersByNbti(String nbti, String excludedUserIds) {
        return userMapper.findUsersByNbti(nbti, excludedUserIds);
    }

    public void increaeHeart(UnblurDTO unblurDTO){
        userMapper.increaseHeart(unblurDTO);
    }

    public List<User> findUsersByFame(String excludedUserIds) {
        return userMapper.findFamousUsers(excludedUserIds);
    }

    public List<UserDto> getAll(){
        return userMapper.getAll();
    }
}
