package kr.bit.service;

import kr.bit.dto.UserFindPwDTO;
import kr.bit.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserMapper userMapper;

    public String findPw(UserFindPwDTO findPwDTO) {
        String pw = userMapper.findPw(findPwDTO);
        if (pw == null) {
            pw = "아이디 혹은 이메일을 다시 확인하세요";
        }
        return pw;
    }
}
