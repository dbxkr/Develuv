package kr.bit.mapper;

import kr.bit.dto.FreeQuizDTO;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface FreeQuizMapper {

    @Select("select daily_reward_quiz from token where user_id = #{userId}")
    public int getQuizCount(String userId);

    @Select("select * from codequiz order by rand() limit 2")
    public List<FreeQuizDTO> getQuizes();

    @Select("select * from codequiz_choice where quiz_id = #{quizId}")
    public List<FreeQuizDTO> getChoices(int quizId);

    @Update("update Token set daily_reward_quiz = 1 where user_id = #{userId}")
    public void updateUserCount(String userId);

    @Update("update Token set token = token + #{quizCount} where user_id = #{user_id}")
    public void updateUserReward(FreeQuizDTO freeQuizDTO);
}
