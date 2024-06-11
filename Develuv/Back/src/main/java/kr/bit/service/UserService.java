package kr.bit.service;

import kr.bit.dto.UserFindIdDTO;
import kr.bit.dto.UserFindPwDTO;
import kr.bit.dto.UserLoginDTO;
import kr.bit.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;

@Service
public class UserService {
    @Autowired
    UserMapper userMapper;

    @Autowired
    private JavaMailSender mailSender;

    public String findPwEmail(UserFindPwDTO findPwDTO) {
        String pw = userMapper.findPw(findPwDTO);
        if (pw == null) {
            pw = "아이디 혹은 이메일을 다시 확인하세요";
        }else{
            MimeMessage message = mailSender.createMimeMessage();
            try {
                MimeMessageHelper messageHelper = new MimeMessageHelper(message,true,"UTF-8");

                //메일 수신 시 표시될 이름 설정
                messageHelper.setFrom("btt0408@gmail.com","develuv");
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
}
