import { useEffect, useState } from "react";
import QuizInsertItem from "./QuizInsertItem.jsx";
import "./QuizInsert.css";
import axios from "axios";


const QuizInsert = ({ user_id }) => {
  const [qForm, setQForm] = useState(
    Array(5).fill({
      quiz: "",
      answer: 0,
      choices: [{ q_num:0, c_num: 1, content: "" }],
    })
  );
  const [qInPage, setQInPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasQuiz, setHasQuiz] = useState('f');


  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.post("http://localhost:8080/api/user/quiz/getquiz", {
          user_id: user_id
        });
        console.log("Fetched quiz data:", response.data);

        // 받아온 데이터로 qForm 상태 업데이트
        if (response.data && response.data.length > 0) {
          setQForm(response.data);
          if(response.data.length<6){
            let len = 5-response.data.length;
            let arr = Array(len).fill({
              quiz: "",
              answer: 0,
              choices: [{ q_num:0, c_num: 1, content: "" }],
            })
            setQForm(prevQForm => [
              ...prevQForm,
              ...arr
            ]);
          }
          setHasQuiz('t');
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizData();
  }, [user_id]);

  // QuizInsert에서의 formData 업데이트
  function updateQForm(page, qsForm) {
    console.log("quiz formData 업데이트", qForm);
    setQForm((prevState) => {
      const newState = [...prevState];
      newState[page - 1] = { user_id, ...qsForm };
      return newState;
    });
    const returnState = [...qForm];
    returnState[page - 1] = { user_id, ...qsForm };
    console.log("새로운 스테이트 출력~~", returnState);
    return returnState;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    // 각 질문 페이지 Item들 출력
    <div className={"QuizInsert"}>
      {qInPage == 1 && (
        <QuizInsertItem
          page={qInPage}
          qnum={1}
          setQInPage={setQInPage}
          updateQForm={updateQForm}
          qFormData={qForm}
          quizForm={qForm[0].quiz}
          choiceForm={qForm[0].choices}
          hasQuiz={hasQuiz}
          user_id={user_id}
        />
      )}
      {qInPage == 2 && (
        <QuizInsertItem
          page={qInPage}
          qnum={2}
          setQInPage={setQInPage}
          updateQForm={updateQForm}
          qFormData={qForm}
          quizForm={qForm[1].quiz}
          choiceForm={qForm[1].choices}
          hasQuiz={hasQuiz}
          user_id={user_id}
        />
      )}
      {qInPage == 3 && (
        <QuizInsertItem
          page={qInPage}
          qnum={3}
          setQInPage={setQInPage}
          updateQForm={updateQForm}
          qFormData={qForm}
          quizForm={qForm[2].quiz}
          choiceForm={qForm[2].choices}
          hasQuiz={hasQuiz}
          user_id={user_id}
        />
      )}
      {qInPage == 4 && (
        <QuizInsertItem
          page={qInPage}
          qnum={4}
          setQInPage={setQInPage}
          updateQForm={updateQForm}
          qFormData={qForm}
          quizForm={qForm[3].quiz}
          choiceForm={qForm[3].choices}
          hasQuiz={hasQuiz}
          user_id={user_id}
        />
      )}
      {qInPage == 5 && (
        <QuizInsertItem
          page={qInPage}
          qnum={5}
          setQInPage={setQInPage}
          updateQForm={updateQForm}
          qFormData={qForm}
          quizForm={qForm[4].quiz}
          choiceForm={qForm[4].choices}
          hasQuiz={hasQuiz}
          user_id={user_id}
        />
      )}
    </div>
  );
};

export default QuizInsert;
