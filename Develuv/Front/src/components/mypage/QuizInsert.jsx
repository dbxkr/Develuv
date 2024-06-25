import {useState} from "react";
import QuizInsertItem from "./QuizInsertItem.jsx";
import "./QuizInsert.css";

const QuizInsert = () => {

  const [qForm,setQForm] = useState([]);
  const [qInPage,setQInPage] = useState(1);

  return(
    <div className={"QuizInsert"}>
      {qInPage==1 && <QuizInsertItem page={qInPage} setQInPage={setQInPage}/> }
      {qInPage==2 && <QuizInsertItem page={qInPage} setQInPage={setQInPage}/> }
      {qInPage==3 && <QuizInsertItem page={qInPage} setQInPage={setQInPage}/> }
      {qInPage==4 && <QuizInsertItem page={qInPage} setQInPage={setQInPage}/> }
      {qInPage==5 && <QuizInsertItem page={qInPage} setQInPage={setQInPage}/> }

    </div>
  )
}

export default QuizInsert;