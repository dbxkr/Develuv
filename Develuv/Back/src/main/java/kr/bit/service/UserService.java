package kr.bit.service;

import com.mysql.cj.x.protobuf.MysqlxDatatypes;
import kr.bit.dto.UserFindIdDTO;
import kr.bit.dto.UserFindPwDTO;
import kr.bit.dto.UserLoginDTO;
import kr.bit.dto.UserDto;
import kr.bit.mapper.UserMapper;
import kr.bit.model.User;
import org.apache.ibatis.annotations.Param;
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

    // 인증번호를 저장할 Map (key: 이메일, value: 인증번호)
    private Map<MysqlxDatatypes.Scalar.String, String> verificationCodes = new HashMap<>();

    // 인증번호 발송 시간 저장
    private Map<String, Long> verificationCodeTimestamps = new HashMap<>();


    public String findPwEmail(UserFindPwDTO findPwDTO) {
        String pw = userMapper.findPw(findPwDTO);

        if (pw == null) {
            pw = "아이디 혹은 이메일을 다시 확인하세요";
        }else{
            MimeMessage message = mailSender.createMimeMessage();
            try {
                MimeMessageHelper messageHelper = new MimeMessageHelper(message,true,"UTF-8");

                //메일 수신 시 표시될 이름 설정
                messageHelper.setFrom("btt0408@gmail.com","Develuv");
                messageHelper.setSubject("비번 확인하셈");
                messageHelper.setTo(findPwDTO.getUser_email());
                messageHelper.setText("비밀번호 이거임:\n"+pw);
                mailSender.send(message);

            } catch (Exception e)
            {
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

        return userMapper.login(userId,userPw);
    }

    public boolean findById(String user_id) {
        if(userMapper.findById(user_id) == null) {
            return false;
        }
        return true;
    }

    public void saveUser(UserDto userDto) {
        System.out.println(userDto);
        try {
//            User user = new User();
//            user.setUser_id(userDto.getUser_id());
//            user.setUser_pw(userDto.getUser_pw());
//            user.setUser_name(userDto.getUser_name());
//            user.setUser_email(userDto.getUser_email());
//            user.setUser_birth(userDto.getUser_birth());
//            user.setUser_phone(userDto.getUser_phone());
//            user.setUser_gender(userDto.getUser_gender());
//            user.setUser_profile(userDto.getUser_profile());
//            user.setUser_provider_id(userDto.getUser_provider_id());
//            user.setUser_heart(userDto.getUser_heart());
//            user.setUser_code(userDto.getUser_code());
//            user.setUser_job(userDto.getUser_job());
//            user.setUser_address(userDto.getUser_address());
//            user.setUser_nbti(userDto.getUser_nbti());
            userMapper.save(userDto);  // 데이터베이스에 저장
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("User saving failed: " + e.getMessage(), e);
        }
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

            // 랜덤한 4자리 숫자 생성
            String verificationCode = generateVerificationCode();

            // 인증번호를 Map에 저장 (이전 인증번호 무효화)
            verificationCodes.put(email, verificationCode);

            // 인증번호 발송 시간 저장
            verificationCodeTimestamps.put(email, System.currentTimeMillis());

            // 메일 수신 시 표시될 이름 설정
            messageHelper.setFrom("btt0408@gmail.com", "Develuv");
            messageHelper.setSubject("Develuv 가입 인증 번호.");
            messageHelper.setTo(email);
            // 메일 내용 설정
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
        int code = random.nextInt(9000) + 1000;  // 1000부터 9999 사이의 숫자 생성
        return String.valueOf(code);
    }

    public String verifyCode(String email, String code) {
        String storedCode = verificationCodes.get(email);
        Long timestamp = verificationCodeTimestamps.get(email);

        // 인증번호가 유효한 시간 설정 (예: 5분)
        long validDuration = 5 * 60 * 1000;

        if (storedCode != null && storedCode.equals(code) && (System.currentTimeMillis() - timestamp) < validDuration) {
            return "인증이 완료되었습니다.";
        } else {
            return "인증번호가 일치하지 않거나 만료되었습니다. 다시 입력해주세요.";
        }
    }

    public String findNameById(String user_id){
        return userMapper.findUserNameById(user_id);
    }
}
