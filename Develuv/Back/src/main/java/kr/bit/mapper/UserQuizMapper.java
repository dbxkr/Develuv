package kr.bit.mapper;

import kr.bit.dto.QuizFormDTO;
import kr.bit.dto.QuizOppoDTO;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface UserQuizMapper {

    @Select("select * from quiz_choice where q_id = #{q_id}")
    public List<QuizFormDTO> getChoies(int q_id);

    @Select("select * from userquiz where user_id = #{user_id}")
    public List<QuizFormDTO> getQuizes(String user_id);

    @Update("update opponent set quiz = 1 where user_id = #{user_id} and oppo_id = #{oppo_id}")
    public void updateQuizCount(QuizOppoDTO quizOppoDTO);

    @Select("select * from opponent where user_id = #{user_id} and oppo_id = #{oppo_id}")
    public QuizOppoDTO getQuizBlurCount(QuizOppoDTO quizOppoDTO);

    @Update("update opponent set blur = blur + 1 " +
            "where user_id = #{user_id} and oppo_id = #{oppo_id}")
    public void updateBlur(QuizOppoDTO quizOppoDTO);

    @Select("select * from userquiz")
}
