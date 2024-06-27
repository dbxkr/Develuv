package kr.bit.mapper;

import kr.bit.dto.QuizFormDTO;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface UserQuizMapper {

    @Select("select * from quiz_choice where q_id = #{q_id}")
    public List<QuizFormDTO> getChoies(int q_id);

    @Select("select * from userquiz where user_id = #{user_id}")
    public List<QuizFormDTO> getQuizes(String user_id);
}
