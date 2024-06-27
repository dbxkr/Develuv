package kr.bit.service;

import kr.bit.dto.quizInsert.ChoiceInsertDTO;
import kr.bit.dto.quizInsert.QuizInsertDTO;
import kr.bit.entity.Quizchoice;
import kr.bit.entity.Userquiz;
import kr.bit.mapper.UserQuizRegiMapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class UserQuizService {
    @Autowired
    UserQuizRegiMapper userQuizRegiMapper;

    public void inserUserQuiz(QuizInsertDTO userquiz) {
        userQuizRegiMapper.insertUserQuiz(userquiz.getUser_id(),userquiz.getQ_num(), userquiz.getQuiz(), userquiz.getAnswer());
    }

    public void insertChoice(ChoiceInsertDTO choice) {
        userQuizRegiMapper.insertChoice(choice.getQ_id(),choice.getC_num(),choice.getContent());
    }

    public int getQuizId(QuizInsertDTO userquiz) {
        return userQuizRegiMapper.getQuizId(userquiz.getUser_id(), userquiz.getQ_num(), userquiz.getQuiz() , userquiz.getAnswer());
    }
}
