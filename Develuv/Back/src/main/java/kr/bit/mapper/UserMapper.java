package kr.bit.mapper;

import kr.bit.model.User;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserMapper {

    @Insert("INSERT INTO Users(user_id, user_pw, user_name, user_email, user_birth, user_phone, user_gender, user_profile, user_provider_id, user_heart, user_code, user_job, user_address, user_nbti) VALUES(#{user_id}, #{user_pw}, #{user_name}, #{user_email}, #{user_birth}, #{user_phone}, #{user_gender}, #{user_profile}, #{user_provider_id}, #{user_heart}, #{user_code}, #{user_job}, #{user_address}, #{user_nbti})")
    void save(User user);

    @Select("SELECT COUNT(*) > 0 FROM Users WHERE user_id = #{userId}")
    boolean existsById(@Param("userId") String userId);

    @Select("SELECT COUNT(*) > 0 FROM Users WHERE user_email = #{email}")
    boolean existsByEmail(@Param("email") String email);
}
