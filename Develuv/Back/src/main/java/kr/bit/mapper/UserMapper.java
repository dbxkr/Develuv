package kr.bit.mapper;

import kr.bit.dto.UserFindIdDTO;
import kr.bit.dto.UserFindPwDTO;
import kr.bit.dto.UserLoginDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {
    @Select("select user_id from users where user_email = #{user_email}")
    String findId(UserFindIdDTO userFindIdDTO);

    @Select("select user_pw from users where user_email = #{user_email} and user_id = #{user_id}")
    String findPw(UserFindPwDTO userFindPwDTO);

    @Select("select * from users where user_id=#{user_id} and user_pw=#{user_pw}")
    UserLoginDTO login(@Param("user_id") String user_id, @Param("user_pw") String user_pw);
}
