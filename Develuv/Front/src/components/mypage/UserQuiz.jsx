import {useParams} from "react-router-dom";
import QuizInsert from "./QuizInsert.jsx";

const UserQuiz = () => {
  const qParams = useParams();
  let page_id = qParams.user_id;
  let usesss = localStorage.getItem("user");
  let idVal;

  if(usesss) {
    const userObject = JSON.parse(usesss);
    idVal = userObject.id;
  }
  console.log("localStorage userId = " + idVal);
  console.log("pathVariable userId = " + page_id);

  return (
    <div className={"UserQuiz"}>
      {(idVal===page_id?<QuizInsert user_id={idVal}/>:<QuizInsert/>)}
    </div>
  )
}

export default UserQuiz