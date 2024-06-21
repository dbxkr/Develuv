package kr.bit.mapper;

import kr.bit.dto.UserDto;
import kr.bit.dto.UserFindIdDTO;
import kr.bit.dto.UserFindPwDTO;
import kr.bit.dto.UserLoginDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import kr.bit.model.User;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserMapper {
    @Select("select user_id from users where user_email = #{user_email}")
    String findId(UserFindIdDTO userFindIdDTO);

    @Select("select user_id from users where user_id = #{user_id}")
    String findById(String user_id);

    @Insert("INSERT INTO Users(user_id, user_pw, user_name, user_email, user_birth, user_phone, user_gender, user_profile, user_provider_id, user_heart, user_code, user_job, user_address, user_nbti,user_pro_lang,user_drink,user_smoke,user_religion,user_edu) VALUES(#{user_id}, #{user_pw}, #{user_name}, #{user_email}, #{user_birth}, #{user_phone}, #{user_gender}, #{user_profile}, #{user_provider_id}, #{user_heart}, #{user_code}, #{user_job}, #{user_address}, #{user_nbti},#{user_pro_lang},#{user_drink},#{user_smoke},#{user_religion},#{user_edu})")
    void save(UserDto user);

    @Select("select user_pw from users where user_email = #{user_email} and user_id = #{user_id}")
    String findPw(UserFindPwDTO userFindPwDTO);

    @Select("SELECT COUNT(*) > 0 FROM Users WHERE user_id = #{userId}")
    boolean existsById(@Param("userId") String userId);

    @Select("select * from users where user_id=#{user_id} and user_pw=#{user_pw}")
    UserLoginDTO login(@Param("user_id") String user_id, @Param("user_pw") String user_pw);

    @Select("SELECT COUNT(*) > 0 FROM Users WHERE user_email = #{email}")
    boolean existsByEmail(@Param("email") String email);

    @Select("SELECT * from users where user_id=#{user_id}")
    UserDto findUserById(@Param("user_id") String user_id);

    @Select("select user_name from users where user_id=#{user_id}")
    String findUserNameById(@Param("user_id") String user_id);

    @Update("UPDATE users SET user_pw = #{user_pw}, user_phone = #{user_phone}, user_job = #{user_job}, user_address = #{user_address} WHERE user_id = #{user_id}")
    void updateUserProfile(UserDto userDto);
}
