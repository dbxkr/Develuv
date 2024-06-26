package kr.bit.mapper;

import kr.bit.entity.Userquiz;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.awt.*;

@Mapper
public interface UserQuizRegiMapper {

    @Insert("insert into userquiz (user_id,q_num, quiz, answer) values (#{user_id},#{q_num},#{quiz},#{answer}) ")
    void insertUserQuiz(Userquiz userquiz);

    @Insert("insert into quiz_choice (q_id, c_num, content) values (#{},#{},#{})")
    void insertChoice(Choice choice);

    @Select("select q_id from userquiz where user_id=#{user_id} and q_num=#{q_num} and answer=#{answer}")
    String getQuizId(Userquiz userquiz);
}
