package kr.bit.mapper;

import kr.bit.dto.CoinHistoryDTO;
import kr.bit.dto.TokenDTO;
import org.apache.ibatis.annotations.*;

@Mapper
public interface TokenMapper {

    @Select("SELECT * FROM Token WHERE user_id = #{user_id}")
    TokenDTO findTokenByUserId(String user_id);

    @Insert("INSERT INTO Token (user_id, token, daily_reward_ad, daily_reward_quiz, payment, last_login_date) VALUES (#{user_id}, #{token}, #{daily_reward_ad}, #{daily_reward_quiz}, #{payment}, #{last_login_date})")
    void insertToken(TokenDTO token);

    @Update("UPDATE Token SET token = #{token}, last_login_date = #{last_login_date} WHERE user_id = #{user_id}")
    void updateToken(TokenDTO token);

    @Insert("INSERT INTO CoinHistory (user_id, amount) VALUES (#{user_id}, #{amount})")
    void insertCoinHistory(CoinHistoryDTO coinHistory);
}
