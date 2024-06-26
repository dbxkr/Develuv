package kr.bit.mapper;

import kr.bit.dto.quizInsert.ChoiceInsertDTO;
import kr.bit.dto.quizInsert.QuizInsertDTO;
import kr.bit.entity.Quizchoice;
import kr.bit.entity.Userquiz;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;


@Mapper
public interface UserQuizRegiMapper {

    @Insert("insert into userquiz (user_id,q_num, quiz, answer) values (#{user_id},#{q_num},#{quiz},#{answer}) ")
    void insertUserQuiz(@Param("user_id") String user_id, @Param("q_num") int q_num, @Param("quiz") String quiz, @Param("answer") int answer);

    @Insert("insert into quiz_choice (q_id, c_num, content) values (#{q_id},#{c_num},#{content})")
    void insertChoice(@Param("q_id")int q_id, @Param("c_num")int c_num, @Param("content")String content);

    @Select("select q_id from userquiz where user_id=#{user_id} and q_num=#{q_num} and quiz=#{quiz} and answer=#{answer}")
    int getQuizId(@Param("user_id") String user_id, @Param("q_num") int q_num, @Param("quiz") String quiz, @Param("answer") int answer);
}
