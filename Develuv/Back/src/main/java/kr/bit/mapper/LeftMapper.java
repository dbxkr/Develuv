package kr.bit.mapper;

import org.apache.ibatis.annotations.*;

import kr.bit.model.User;
import java.util.List;

@Mapper
public interface LeftMapper {
    @Select("SELECT COALESCE(user_heart, 0) FROM Users WHERE user_id = #{user_id}")
    Integer getUserCoins(@Param("user_id") String user_id);

    @Update("UPDATE Users SET user_heart = user_heart - #{amount} WHERE user_id = #{user_id} AND user_heart >= #{amount}")
    int deductUserCoins(@Param("user_id") String user_id, @Param("amount") int amount);

    @Insert("INSERT INTO CoinHistory (user_id, amount, timestamp) VALUES (#{user_id}, #{amount}, NOW())")
    void insertCoinHistory(@Param("user_id") String user_id, @Param("amount") int amount);

    @Select("<script>"
            + "SELECT * FROM Users WHERE user_id != #{user_id} "
            + "<if test='excludedUserIds != null and !excludedUserIds.isEmpty()'>"
            + "AND user_id NOT IN "
            + "<foreach item='id' collection='excludedUserIds' open='(' separator=',' close=')'>"
            + "#{id}"
            + "</foreach>"
            + "</if>"
            + "ORDER BY RAND() LIMIT 12"
            + "</script>")
    List<User> recommendUser(@Param("user_id") String user_id, @Param("excludedUserIds") List<String> excludedUserIds);

    @Select("<script>"
            + "SELECT * FROM Users WHERE 1=1"
            + "<if test='nbti1 != null'>AND user_nbti LIKE CONCAT('%', #{nbti1}, '%')</if>"
            + "<if test='nbti2 != null'>AND user_nbti LIKE CONCAT('%', #{nbti2}, '%')</if>"
            + "<if test='nbti3 != null'>AND user_nbti LIKE CONCAT('%', #{nbti3}, '%')</if>"
            + "<if test='nbti4 != null'>AND user_nbti LIKE CONCAT('%', #{nbti4}, '%')</if>"
            + "<if test='excludedUserIds != null and !excludedUserIds.isEmpty()'>"
            + "AND user_id NOT IN "
            + "<foreach item='id' collection='excludedUserIds' open='(' separator=',' close=')'>"
            + "#{id}"
            + "</foreach>"
            + "</if>"
            + "ORDER BY RAND() LIMIT 12"
            + "</script>")
    List<User> recommendUserByNbti(@Param("nbti1") String nbti1,
                                   @Param("nbti2") String nbti2,
                                   @Param("nbti3") String nbti3,
                                   @Param("nbti4") String nbti4,
                                   @Param("excludedUserIds") List<String> excludedUserIds);

    @Select("<script>"
            + "SELECT * FROM Users WHERE user_id != #{user_id} "
            + "<if test='excludedUserIds != null and !excludedUserIds.isEmpty()'>"
            + "AND user_id NOT IN "
            + "<foreach item='id' collection='excludedUserIds' open='(' separator=',' close=')'>"
            + "#{id}"
            + "</foreach>"
            + "</if>"
            + "ORDER BY user_fame DESC LIMIT 12"
            + "</script>")
    List<User> recommendUserByFame(@Param("user_id") String user_id, @Param("excludedUserIds") List<String> excludedUserIds);
}
