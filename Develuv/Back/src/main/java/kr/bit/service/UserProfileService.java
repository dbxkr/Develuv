package kr.bit.service;

import kr.bit.dto.UserDto;
import kr.bit.mapper.UserMapper;
import kr.bit.dto.UserProfileDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    @Autowired
    private UserMapper userMapper;

    public void updateUserProfile(UserProfileDto userProfileDto) {
        UserDto userDto = new UserDto();
        userDto.setUser_id(userProfileDto.getUser_id());
        userDto.setUser_pw(userProfileDto.getUser_pw()); // 비밀번호만 업데이트
        userDto.setUser_phone(userProfileDto.getUser_phone());
        userDto.setUser_job(userProfileDto.getUser_job());
        userDto.setUser_address(userProfileDto.getUser_address());

        userMapper.updateUserProfile(userDto);
    }

    public UserProfileDto getUserProfile(String userId) {
        UserDto userDto = userMapper.findUserById(userId);
        if (userDto == null) {
            return null;
        }

        UserProfileDto userProfileDto = new UserProfileDto();
        userProfileDto.setUser_id(userDto.getUser_id());
        userProfileDto.setUser_pw(userDto.getUser_pw());
        userProfileDto.setUser_phone(userDto.getUser_phone());
        userProfileDto.setUser_job(userDto.getUser_job());
        userProfileDto.setUser_address(userDto.getUser_address());

        return userProfileDto;
    }
}
