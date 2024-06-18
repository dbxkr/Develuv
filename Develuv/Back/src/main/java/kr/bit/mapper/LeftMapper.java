package kr.bit.mapper;

import kr.bit.model.User;
import org.apache.ibatis.annotations.*;

@Mapper
public interface LeftMapper {
    @Select("SELECT COALESCE(user_heart, 0) FROM Users WHERE user_id = #{user_id}")
    Integer getUserCoins(@Param("user_id") String user_id);

    @Update("UPDATE Users SET user_heart = user_heart - #{amount} WHERE user_id = #{user_id} AND user_heart >= #{amount}")
    int deductUserCoins(@Param("user_id") String user_id, @Param("amount") int amount);

    @Insert("INSERT INTO CoinHistory (user_id, amount, timestamp) VALUES (#{user_id}, #{amount}, NOW())")
    void insertCoinHistory(@Param("user_id") String user_id, @Param("amount") int amount);

    @Select("SELECT * FROM Users WHERE user_id != #{user_id} ORDER BY RAND() LIMIT 1")
    User recommendUser(@Param("user_id") String user_id);

    @Select("<script>"
            + "SELECT * FROM Users WHERE 1=1"
            + "<if test='nbti1 != null'>AND user_nbti LIKE CONCAT('%', #{nbti1}, '%')</if>"
            + "<if test='nbti2 != null'>AND user_nbti LIKE CONCAT('%', #{nbti2}, '%')</if>"
            + "<if test='nbti3 != null'>AND user_nbti LIKE CONCAT('%', #{nbti3}, '%')</if>"
            + "<if test='nbti4 != null'>AND user_nbti LIKE CONCAT('%', #{nbti4}, '%')</if>"
            + "ORDER BY RAND() LIMIT 1"
            + "</script>")
    User recommendUserByNbti(@Param("nbti1") String nbti1, @Param("nbti2") String nbti2, @Param("nbti3") String nbti3, @Param("nbti4") String nbti4);
}
