package kr.bit.dto;

import kr.bit.mapper.UserMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MatchingListDTO {

    private UserMapper userMapper;

    private String user_id;
    private String user_name;
    private String user_gender;
    private String user_nbti;
    private String user_address;
    private String user_profile;
    private String user_birth;
    private String user_heart;

    public UserDto toUserDTO(){
        return userMapper.findUserById(this.user_id);
    }
}
