import {useEffect, useState} from "react";
import QuizInsertItem from "./QuizInsertItem.jsx";
import "./QuizInsert.css";

const QuizInsert = ({user_id}) => {

  const [qForm, setQForm] = useState(
    Array(5).fill({
        quiz:'',
        answer:1,
        choices:[{c_num:1,content:''}]
    }));
  const [qInPage,setQInPage] = useState(1);


  function updateQForm(page,qsForm) {
    setQForm(prevState => {
      const newState = [...prevState];
      newState[page-1] = {user_id,...qsForm};
      return newState;
    });
    console.log(qForm);
    console.log(qForm[page-1]);
  }

  return (

    <div className={"QuizInsert"}>
      {qInPage==1 && <QuizInsertItem page={qInPage}
                                     qnum={1}
                                     setQInPage={setQInPage}
                                     updateQForm={updateQForm}
                                     qFormData={qForm}
                                     quizForm={qForm[0].quiz}
                                     choiceForm={qForm[0].choices}/> }
      {qInPage==2 && <QuizInsertItem page={qInPage}
                                     qnum={2}
                                     setQInPage={setQInPage}
                                     updateQForm={updateQForm}
                                     qFormData={qForm}
                                     quizForm={qForm[1].quiz}
                                     choiceForm={qForm[1].choices}/> }
      {qInPage==3 && <QuizInsertItem page={qInPage}
                                     qnum={3}
                                     setQInPage={setQInPage}
                                     updateQForm={updateQForm}
                                     qFormData={qForm}
                                     quizForm={qForm[2].quiz}
                                     choiceForm={qForm[2].choices}/> }
      {qInPage==4 && <QuizInsertItem page={qInPage}
                                     qnum={4}
                                     setQInPage={setQInPage}
                                     updateQForm={updateQForm}
                                     qFormData={qForm}
                                     quizForm={qForm[3].quiz}
                                     choiceForm={qForm[3].choices}/> }
      {qInPage==5 && <QuizInsertItem page={qInPage}
                                     qnum={5}
                                     setQInPage={setQInPage}
                                     updateQForm={updateQForm}
                                     qFormData={qForm}
                                     quizForm={qForm[4].quiz}
                                     choiceForm={qForm[4].choices}/> }
    </div>
  )
}

export default QuizInsert;