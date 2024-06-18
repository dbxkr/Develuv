import "./Regi5Form.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//유저정보 추가를 위해 이전 페이지에서 사용자 id 정보 가져오기
function Regi5Form({ formData, setFormData, progress, setProgress }) {
  const navigate = useNavigate();

  // 리스트에 들어갈 문자열들
  const proLangs = [
    { lang: "java", title: "Java" },
    { lang: "python", title: "Python" },
    { lang: "c", title: "C언어" },
    { lang: "c++", title: "C++" },
    { lang: "C#", title: "C#" },
  ];
  const alchols = [
    { type: "never", title: "전혀" },
    { type: "somtimes", title: "가끔" },
    { type: "often", title: "자주" },
    { type: "etc", title: "기타" },
  ];
  const smokes = [
    { type: "nonSmoke", title: "비흡연" },
    { type: "smoke", title: "흡연" },
  ];
  const datingStyles = [
    { type: "activity", title: "액티비티" },
    { type: "display", title: "전시" },
    { type: "home", title: "집" },
    { type: "gourme", title: "맛집탐방" },
    { type: "coding", title: "코딩" },
    { type: "etc", title: "기타" },
  ];
  const jongs = [
    { type: "none", title: "무교" },
    { type: "christan", title: "기독교" },
    { type: "catholic", title: "가톨릭" },
    { type: "buddism", title: "불교" },
    { type: "etc", title: "기타" },
  ];
  const educations = [
    { type: "highschool", title: "고등학교" },
    { type: "bachelor", title: "대학교" },
    { type: "master", title: "대학원" },
    { type: "doctor", title: "박사" },
    { type: "etc", title: "기타" },
  ];

  // useState들
  const [selPL, setSelPL] = useState("");
  const [selAlchol, setSelAlchol] = useState("");
  const [selSmoke, setSelSmoke] = useState("");
  const [selDateStyle, setSelDateStyle] = useState("");
  const [selJong, setSelJong] = useState("");
  const [selEdu, setSelEdu] = useState("");

  // 선택시 state 변환

  const plClicked = (lang) => {
    setSelPL(lang);
  };
  const alClicked = (type) => {
    setSelAlchol(type);
  };
  const smClicked = (type) => {
    setSelSmoke(type);
  };
  const dsClicked = (type) => {
    setSelDateStyle(type);
  };
  const jongClicked = (type) => {
    setSelJong(type);
  };
  const eduClicked = (type) => {
    setSelEdu(type);
  };
  const navigateToPrevious = () => {
    setProgress(progress - 1);
  };
  // 제출
  const url = "http://localhost:8080/register/additional";
  const submitAO = () => {
    console.log(formData);
  };

  return (
    <div
    // className={"container"}
    >
      <div className={"tt"}>Additional Options</div>
      <div className={"gray_font"}>Please enter the information</div>
      <div className={"sub_title"}>
        선택 정보로 다른 사람의 정보도 볼 수 있어요
      </div>

      <div className="option-container">
        {/* 선호 프로그램 언어*/}
        <div className={"form_label"}>선호하는 프로그래밍 언어</div>
        <div className={"btn_div"}>
          {proLangs.map((pl, index) => (
            <button
              type={"button"}
              key={index}
              onClick={() => plClicked(pl.lang)}
              className={"regi5_btn" + `${selPL === pl.lang ? "_selBtn" : ""}`}
            >
              {pl.title}
            </button>
          ))}
        </div>

        {/* 음주 즐기는 정도 */}
        <div className={"form_label"}>음주</div>
        <div className={"btn_div"}>
          {alchols.map((alchol, index) => (
            <button
              type={"button"}
              key={index}
              onClick={() => alClicked(alchol.type)}
              className={
                "regi5_btn" + `${selAlchol === alchol.type ? "_selBtn" : ""}`
              }
            >
              {alchol.title}
            </button>
          ))}
        </div>

        {/* 흡연 여부 */}
        <div className={"form_label"}>흡연</div>
        <div className={"btn_div"}>
          {smokes.map((smoke, index) => (
            <button
              type={"button"}
              key={index}
              onClick={() => smClicked(smoke.type)}
              className={
                "regi5_btn" + `${selSmoke === smoke.type ? "_selBtn" : ""}`
              }
            >
              {smoke.title}
            </button>
          ))}
        </div>

        {/* 데이팅 스타일 */}
        <div className={"form_label"}>데이팅 스타일(중복가능)</div>
        <div className={"btn_div"}>
          {datingStyles.map((ds, index) => (
            <button
              type={"button"}
              key={index}
              onClick={() => dsClicked(ds.type)}
              className={
                "regi5_btn" + `${selDateStyle === ds.type ? "_selBtn" : ""}`
              }
            >
              {ds.title}
            </button>
          ))}
        </div>

        {/* 종교 여부 */}
        <div className={"form_label"}>종교</div>
        <div className={"btn_div"}>
          {jongs.map((jong, index) => (
            <button
              type={"button"}
              key={index}
              onClick={() => jongClicked(jong.type)}
              className={
                "regi5_btn" + `${selJong === jong.type ? "_selBtn" : ""}`
              }
            >
              {jong.title}
            </button>
          ))}
        </div>

        {/* 학력 */}
        <div className={"form_label"}>학력</div>
        <div className={"btn_div"}>
          {educations.map((edu, index) => (
            <button
              type={"button"}
              key={index}
              onClick={() => eduClicked(edu.type)}
              className={
                "regi5_btn" + `${selEdu === edu.type ? "_selBtn" : ""}`
              }
            >
              {edu.title}
            </button>
          ))}
        </div>
      </div>
      {/* 이전 다음 페이지로 넘어가기*/}
      <div>
        <button
          type={"button"}
          onClick={navigateToPrevious}
          className={"before_btn"}
        >
          이전
        </button>
        <button type={"button"} onClick={submitAO} className={"after_btn"}>
          제출
        </button>
      </div>
    </div>
  );
}

export default Regi5Form;
