package kr.bit.service;

import kr.bit.dto.quizInsert.ChoiceInsertDTO;
import kr.bit.dto.quizInsert.QuizInsertDTO;
import kr.bit.dto.quizInsert.QuizInsertVO;
import kr.bit.entity.Quizchoice;
import kr.bit.entity.Userquiz;
import kr.bit.mapper.UserQuizRegiMapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserQuizService {
    @Autowired
    UserQuizRegiMapper userQuizRegiMapper;

    public void inserUserQuiz(QuizInsertDTO userquiz) {
        userQuizRegiMapper.insertUserQuiz(userquiz.getUser_id(), userquiz.getQ_num(), userquiz.getQuiz(), userquiz.getAnswer());
    }

    public void insertChoice(ChoiceInsertDTO choice) {
        userQuizRegiMapper.insertChoice(choice.getQ_id(), choice.getC_num(), choice.getContent());
    }

    public int getQuizId(QuizInsertDTO userquiz) {
        return userQuizRegiMapper.getQuizId(userquiz.getUser_id(), userquiz.getQ_num(), userquiz.getQuiz(), userquiz.getAnswer());
    }

    public List<QuizInsertVO> getQuizzesByUserId(String userId) {
        return userQuizRegiMapper.getQuizzesByUserId(userId);
    }

    public void updateUserQuiz(List<QuizInsertDTO> quizzes) {
        for (QuizInsertDTO quiz : quizzes) {
            if(quiz.getUser_id()==null){
                continue;
            }
            List<QuizInsertVO> getUserQuiz = userQuizRegiMapper.getUserQuiz(quiz.getQ_num(), quiz.getUser_id());
            System.out.println("퀴즈 내용 : " + quiz);

            if (getUserQuiz != null && !getUserQuiz.isEmpty()) {

                int quiz_id = getQuizId(quiz);
                System.out.println(quiz_id);

                QuizInsertVO quizVO = new QuizInsertVO();
                quizVO.setQ_id(quiz_id);
                quizVO.setQuiz(quiz.getQuiz());
                quizVO.setAnswer(quiz.getAnswer());
                userQuizRegiMapper.updateUserQuiz(quizVO);
                userQuizRegiMapper.deleteQuizChoice(quiz_id);
                for (ChoiceInsertDTO choice : quiz.getChoices()) {
                    choice.setContent(choice.getContent().replaceAll("\n", "<br/>"));
                    userQuizRegiMapper.insertChoice(quiz_id, choice.getC_num(), choice.getContent());
                }
            } else {

                userQuizRegiMapper.insertUserQuiz(quiz.getUser_id(), quiz.getQ_num(), quiz.getQuiz(), quiz.getAnswer());
                int quiz_id = getQuizId(quiz);
                System.out.println("quiz_id: " + quiz_id);

                for (ChoiceInsertDTO choice : quiz.getChoices()) {
                    choice.setContent(choice.getContent().replaceAll("\n", "<br/>"));
                    userQuizRegiMapper.insertChoice(quiz_id, choice.getC_num(), choice.getContent());
                }
            }


        }
    }
}
