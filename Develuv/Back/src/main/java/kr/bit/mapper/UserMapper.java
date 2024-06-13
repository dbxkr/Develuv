package kr.bit.mapper;

import kr.bit.model.User;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserMapper {

    @Insert("INSERT INTO Users(user_id, user_pw, user_name, user_email, user_birth, user_phone) VALUES(#{user_id}, #{user_pw}, #{user_name}, #{user_email}, #{user_birth}, #{user_phone})")
    void save(User user); // User 객체를 데이터베이스에 저장

    @Select("SELECT COUNT(*) > 0 FROM Users WHERE user_id = #{userId}")
    boolean existsById(@Param("userId") String userId);
}
