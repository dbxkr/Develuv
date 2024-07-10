package kr.bit.mapper;

import kr.bit.dto.quizInsert.ChoiceInsertDTO;
import kr.bit.dto.quizInsert.ChoiceInsertVO;
import kr.bit.dto.quizInsert.QuizInsertDTO;
import kr.bit.dto.quizInsert.QuizInsertVO;
import kr.bit.entity.Quizchoice;
import kr.bit.entity.Userquiz;
import org.apache.ibatis.annotations.*;

import java.util.List;


@Mapper
public interface UserQuizRegiMapper {

    @Insert("insert into userquiz (user_id,q_num, quiz, answer) values (#{user_id},#{q_num},#{quiz},#{answer}) ")
    void insertUserQuiz(@Param("user_id") String user_id, @Param("q_num") int q_num, @Param("quiz") String quiz, @Param("answer") int answer);

    @Insert("insert into quiz_choice (q_id, c_num, content) values (#{q_id},#{c_num},#{content})")
    void insertChoice(@Param("q_id")int q_id, @Param("c_num")int c_num, @Param("content")String content);

    @Select("select q_id from userquiz where user_id=#{user_id} and q_num=#{q_num} ")
    int getQuizId(@Param("user_id") String user_id, @Param("q_num") int q_num, @Param("quiz") String quiz, @Param("answer") int answer);


    @Select("SELECT q.q_id, q.user_id, q.q_num, q.answer, q.quiz " +
            "FROM userquiz q " +
            "WHERE q.user_id = #{userId}")
    @Results({
            @Result(property = "q_id", column = "q_id"),
            @Result(property = "user_id", column = "user_id"),
            @Result(property = "q_num", column = "q_num"),
            @Result(property = "answer", column = "answer"),
            @Result(property = "quiz", column = "quiz"),
            @Result(property = "choices", column = "q_id",
                    javaType = List.class,
                    many = @Many(select = "getChoices"))
    })
    List<QuizInsertVO> getQuizzesByUserId(String userId);

    @Select("SELECT c.c_id, c.q_id, c.c_num, c.content " +
            "FROM quiz_choice c " +
            "WHERE c.q_id = #{qId}")
    List<ChoiceInsertVO> getChoices(int qId);

    @Update("update userquiz set quiz=#{quiz}, answer=#{answer} where q_id=#{q_id}")
    void updateUserQuiz(QuizInsertVO quizInsertVO);

    @Update("update quiz_choice set content=#{content} where c_id=#{c_id}")
    void updateQuizChoice(ChoiceInsertVO choiceInsertVO);

    @Delete("delete from quiz_choice where q_id=#{q_id}")
    void deleteQuizChoice(@Param("q_id") int q_id);

    @Select("select * from userquiz where q_num=#{q_num} and user_id=#{user_id}")
    List<QuizInsertVO> getUserQuiz(@Param("q_num") int q_num, @Param("user_id") String user_id);
}
