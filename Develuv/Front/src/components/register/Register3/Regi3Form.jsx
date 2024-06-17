import "./Regi3Form.css";
import { useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
import UploadImg from "./UploadImg.jsx";
import {useNavigate} from "react-router-dom";
>>>>>>> c7a20d1 (add matchingList item tinMypage)

function Regi3Form({ progress, setProgress, formData, setFormData }) {
  let url = "http://localhost:8080/";
<<<<<<< HEAD
  const navigate = useNavigate();
=======
  const navi = useNavigate();
>>>>>>> c7a20d1 (add matchingList item tinMypage)

  const genders = [
    { type: "male", title: "남자" },
    { type: "female", title: "여자" },
  ];

  const [name, setName] = useState("");
  const [selGen, setSelGen] = useState("");
  const [job, setJob] = useState("");
  const [addr, setAddr] = useState("");

  const onChangeName = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  const onChangeJob = (e) => {
    setJob(e.target.value);
  };
  const onChangeAddr = (e) => {
    setAddr(e.target.value);
  };

  const onEnter = (e) => {
    if (e.code === "Enter") {
      alert(
        "이름 입력은 : " +
          name +
          " 성별은 : " +
          selGen +
          " 직업은 : " +
          job +
          " 주소는 : " +
          addr
      );
    }
  };

  const genClicked = (type) => {
    setSelGen(type);
  };

  const regi3Submit = () => {
    alert(
      "이름 입력은 : " +
        name +
        " 성별은 : " +
        selGen +
        " 직업은 : " +
        job +
        " 주소는 : " +
        addr
    );

    const params = {
      id: "user01",
      name: name,
      gender: selGen,
      job: job,
      addr: addr,
    };
    setProgress(progress + 1);
    // GET 요청 보내기
<<<<<<< HEAD
    // axios
    //   .get(url + "regi3submit", { params })
    //   .then((response) => {
    //     // 성공적으로 응답을 받은 경우 처리
    //     console.log(response.data);
    //     navigate("/register/4");
    //   })
    //   .catch((error) => {
    //     // 오류가 발생한 경우 처리
    //     console.error("There was an error!", error);
    //   });
=======
    axios
      .get(url + "regi3submit", { params })
      .then((response) => {
        // 성공적으로 응답을 받은 경우 처리
        console.log(response.data);
        navi("/register/4")
      })
      .catch((error) => {
        // 오류가 발생한 경우 처리
        console.error("There was an error!", error);
      });
>>>>>>> c7a20d1 (add matchingList item tinMypage)
  };

  return (
    <div>
      <div className={"tt"}>Essential Information</div>
      <div className={"gray_font"}>Please enter the information</div>
      <div className={"sub_title"}>
        {" "}
        변경이 불가능하니 정확하게 입력해주세요
      </div>

      {/* 이름 */}
      <div className={"form_label"}>이름</div>
      <input
        className={"regi3_in"}
        onChange={onChangeName}
        onKeyDown={onEnter}
        value={name}
        placeholder={"이름 입력"}
      />

      {/* 성별 */}
      <div className={"form_label"}>성별</div>
      <div className={"gbtn_div"}>
        {genders.map((gender, index) => (
          <button
            type={"button"}
            key={index}
            onClick={() => genClicked(gender.type)}
            className={"gender_btn" + `${selGen === gender.type ? "_sel" : ""}`}
          >
            {gender.title}
          </button>
        ))}
      </div>

      <hr className={"half_hr"} />

      <div className={"sub_title"}>
        언제든지 변경이 가능하며 매칭을 위해 필요한 정보입니다.
      </div>

      {/* 직업 select로 바꿀 예정 */}
      <div className={"form_label"}>직업</div>
      <input
        className={"regi3_in"}
        onChange={onChangeJob}
        onKeyDown={onEnter}
        value={job}
        type={"text"}
        placeholder={"직업 입력"}
      />

      {/* 주소 이후엔 daum 지도 api 사용 */}
      <div className={"form_label"}>주소</div>
      <input
        className={"regi3_in"}
        onChange={onChangeAddr}
        onKeyDown={onEnter}
        value={addr}
        type={"text"}
        placeholder={"주소 입력"}
      />

      {/* 여기에 이미지 던지기*/}
      {/*<UploadImg/>*/}

      {/* 이전 다음 페이지로 넘어가기*/}
      <div>
        <button
          type={"button"}
          onClick={() => {
            setProgress(progress - 1);
          }}
          className={"before_btn"}
        >
          이전
        </button>
        <button type={"button"} onClick={regi3Submit} className={"after_btn"}>
          다음
        </button>
      </div>
    </div>
  );
}

export default Regi3Form;
