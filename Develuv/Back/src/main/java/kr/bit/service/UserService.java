package kr.bit.service;

import kr.bit.dto.UserFindIdDTO;
import kr.bit.dto.UserFindPwDTO;
import kr.bit.dto.UserLoginDTO;
import kr.bit.dto.UserDto;
import kr.bit.mapper.UserMapper;
import kr.bit.model.User;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    private JavaMailSender mailSender;

    private Map<String, String> verificationCodes = new HashMap<>();
    private Map<String, Long> verificationCodeTimestamps = new HashMap<>();

    public String findPwEmail(UserFindPwDTO findPwDTO) {
        String pw = userMapper.findPw(findPwDTO);

        if (pw == null) {
            pw = "아이디 혹은 이메일을 다시 확인하세요";
        } else {
            MimeMessage message = mailSender.createMimeMessage();
            try {
                MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");

                messageHelper.setFrom("btt0408@gmail.com", "Develuv");
                messageHelper.setSubject("비번 확인하셈");
                messageHelper.setTo(findPwDTO.getUser_email());
                messageHelper.setText("비밀번호 이거임:\n" + pw);
                mailSender.send(message);

            } catch (Exception e) {
                e.printStackTrace();
            }
            pw = "메일을 확인해주세요.";
        }
        return pw;
    }

    public String findId(UserFindIdDTO findIdDTO) {
        String id = userMapper.findId(findIdDTO);
        if (id == null) {
            id = "이메일을 다시 확인하세요";
        }
        return id;
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
            System.out.println("User found: " + userLoginDTO.getUser_id());
            System.out.println("Stored password: " + userLoginDTO.getUser_pw());
            System.out.println("Input password: " + userPw);
            boolean passwordMatches = BCrypt.checkpw(userPw, userLoginDTO.getUser_pw());
            System.out.println("Password match result: " + passwordMatches);
            if (passwordMatches) {
                System.out.println("Password matches for user: " + userLoginDTO.getUser_id());
                return userLoginDTO;
            } else {
                System.out.println("Password does not match for user: " + userLoginDTO.getUser_id());
            }
        } else {
            System.out.println("User not found with user_id: " + userId);
        }
        return null;
    }

    public boolean findById(String user_id) {
        return userMapper.findById(user_id) != null;
    }



    public void saveUser(UserDto userDto) {
        String hashedPassword = BCrypt.hashpw(userDto.getUser_pw(), BCrypt.gensalt());
        System.out.println("Hashed Password (Backend): " + hashedPassword); // 해싱된 비밀번호 출력
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
        return userMapper.findUserById(user_id);
    }
}
