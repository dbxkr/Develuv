package kr.bit.mapper;

import kr.bit.dto.UserFindPwDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {
    @Select("select user_pw from users where user_email = #{userEmail} and user_Id = #{userId}")
    String findPw(UserFindPwDTO userFindPwDTO);
}
