package kr.bit.mapper;

import kr.bit.dto.QuizFormDTO;
import kr.bit.dto.QuizOppoDTO;
import kr.bit.dto.UserDto;
import kr.bit.model.User;
import org.apache.ibatis.annotations.Param;
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

    @Select("SELECT * FROM users " +
            "WHERE user_nbti IN (#{nbti1}, #{nbti2}, #{nbti3}, #{nbti4}) " +
            "AND user_id NOT IN (#{excludedUserIds})")
    List<User> findUsersByNbti(@Param("nbti1") String nbti1,
                               @Param("nbti2") String nbti2,
                               @Param("nbti3") String nbti3,
                               @Param("nbti4") String nbti4,
                               @Param("excludedUserIds") String excludedUserIds);
}
