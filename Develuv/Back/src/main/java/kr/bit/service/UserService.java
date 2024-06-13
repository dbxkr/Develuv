package kr.bit.service;

import kr.bit.dto.UserDto;
import kr.bit.mapper.UserMapper;
import kr.bit.model.User;
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
    private UserMapper userMapper;
    @Autowired
    private JavaMailSender mailSender;
    // 인증번호를 저장할 Map (key: 이메일, value: 인증번호)
    private Map<String, String> verificationCodes = new HashMap<>();

    public void saveUser(UserDto userDto) {
        try {
            User user = new User();
            user.setUser_id(userDto.getUser_id());
            user.setUser_pw(userDto.getUser_pw());
            user.setUser_name(userDto.getUser_name());
            user.setUser_email(userDto.getUser_email());
            user.setUser_birth(userDto.getUser_birth());
            user.setUser_phone(userDto.getUser_phone());

            userMapper.save(user);  // 데이터베이스에 저장
        } catch (Exception e) {  // 추가된 예외 처리
            e.printStackTrace();
            throw new RuntimeException("User saving failed", e);  // 예외 발생 시 메시지 출력 및 예외 던지기
        }
    }

    public boolean isUserIdAvailable(String userId) {
        return !userMapper.existsById(userId);
    }


    public String sendVerificationCode(String email) {
        MimeMessage message = mailSender.createMimeMessage();
        String success = "인증번호가 발송되었습니다";
        try {
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");

            // 랜덤한 4자리 숫자 생성
            String verificationCode = generateVerificationCode();

            // 인증번호를 Map에 저장
            verificationCodes.put(email, verificationCode);

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
        int code = random.nextInt(9000) + 1000; // 1000부터 9999 사이의 숫자 생성
        return String.valueOf(code);
    }

    public String verifyCode(String email, String code) {
        String storedCode = verificationCodes.get(email);
        if (storedCode != null && storedCode.equals(code)) {
            return "인증이 완료되었습니다.";
        } else {
            return "인증번호가 일치하지 않습니다. 다시 입력해주세요.";
        }
    }
}

