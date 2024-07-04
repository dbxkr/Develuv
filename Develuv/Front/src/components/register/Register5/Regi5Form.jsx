import "./Regi5Form.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//유저정보 추가를 위해 이전 페이지에서 사용자 id 정보 가져오기
function Regi5Form({
  formData,
  setFormData,
  progress,
  setProgress,
  image,
  city,
}) {
  const navigate = useNavigate();
  console.log("formData", formData);

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
    { type: "university", title: "대학교" },
    { type: "Graduate school", title: "대학원" },
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
  const client_id = import.meta.env.VITE_GOOGLE_DRIVE_CLIENT_ID;
  const secret_key = import.meta.env.VITE_GOOGLE_DRIVE_SECRET_KEY;

  const [accessToken, setAccessToken] = useState(
    import.meta.env.VITE_GOOGLE_DRIVE_API_KEY
  );
  const refreshToken = import.meta.env.VITE_GOOGLE_DRIVE_REFRESH_TOKEN;

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post("https://oauth2.googleapis.com/token", {
        client_id,
        client_secret: secret_key,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      });
      setAccessToken(response.data.access_token);
    } catch (error) {
      console.error("Error refreshing access token", error);
    }
  };

  // 선택시 state 변환

  const plClicked = (type) => {
    setSelPL(type);
    setFormData({ ...formData, user_pro_lang: type });
  };
  const alClicked = (type) => {
    setSelAlchol(type);
    setFormData({ ...formData, user_drink: type });
  };
  const smClicked = (type) => {
    setSelSmoke(type);
    setFormData({ ...formData, user_smoke: type });
  };
  const dsClicked = (type) => {
    setSelDateStyle(type);
  };
  const jongClicked = (type) => {
    setSelJong(type);
    setFormData({ ...formData, user_religion: type });
  };
  const eduClicked = (type) => {
    setSelEdu(type);
    setFormData({ ...formData, user_edu: type });
  };
  const navigateToPrevious = () => {
    setProgress(progress - 1);
  };

  //토큰 새로 발행
  useEffect(() => {
    refreshAccessToken();
    document.body.style.alignItems = "unset";
    document.body.style.marginTop = "130px";

    // 컴포넌트가 마운트될 때 실행되는 부분

    return () => {
      // 컴포넌트가 언마운트될 때 실행되는 부분
      document.body.style.alignItems = "center";
      document.body.style.marginTop = "0px";
    };
  }, []);

  // 제출
  const signupUrl = "http://localhost:8080/user/signup"; // 회원가입 url
  const folderId = "1MTa41ozlOhsVe5ID--NZ8Br_xii27knL"; // 업로드하려는 폴더의 ID
  const submitAO = () => {
    const imgData = new FormData(); // FormData 객체 생성
    imgData.append(
      "metadata",
      new Blob(
        [
          JSON.stringify({
            name: image.name, // 파일 이름과 확장자
            mimeType: image.type, // 파일 MIME 타입
            parents: [folderId], // 업로드하려는 폴더의 ID
          }),
        ],
        { type: "application/json" }
      )
    );
    imgData.append("file", image); // 파일 데이터 추가

    console.log(accessToken);
    console.log(image.type);
    axios
      .post(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        imgData,
        {
          headers: {
            "Content-Type": "multipart/related",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("File uploaded successfully");
        const fileId = response.data.id;
        const imgUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=s`;
        const signUpData = { ...formData, user_profile: imgUrl };
        console.log("imgUrl", imgUrl);
        console.log("after set imgUrl", signUpData);
        axios
          .post(signupUrl, signUpData)
          .then(async (res) => {
            await submitCity();
            await alert(res.data); // 서버에서 반환된 메시지를 알림으로 표시
            await navigate("/");
          })
          .catch((error) => {
            console.error("Error signing up:", error);
            alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
          });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        alert(
          "서버에 이미지를 업로드 중 오류가 발생했습니다. 다시 시도해주세요."
        );
      });
  };

  async function submitCity() {
    const cityData = {
      user_address: formData.user_address,
      city: city,
      user_id: formData.user_id,
    };
    console.log(cityData);
    axios
      .post("http://localhost:8080/api/register/latlon", cityData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("insert latlon err", err);
      });
  }

  return (
    <div className={"Regi5Form"}>
      <div className={"up_opt"}>
        <div className={"pro_bar_container"}>
          <div className={"pro_bar"}></div>
          <div className={"circle5"}>5</div>
        </div>
      </div>

      <div className={"up_form"}>
        <div className={"gray_font"}>Please enter the information</div>
        <div className={"gray_font2"}>추가 정보는 다른 사람도 볼 수 있어요</div>
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
        <div className="divider"></div> {/* 구분선 추가 */}
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
        <div className="divider"></div> {/* 구분선 추가 */}
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
        <div className="divider"></div> {/* 구분선 추가 */}
        {/* 데이팅 스타일 */}
        <div className={"form_label"}>데이팅 스타일</div>
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
        <div className="divider"></div> {/* 구분선 추가 */}
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
        <div className="divider"></div> {/* 구분선 추가 */}
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
        {/*<button type={"button"} onClick={submitCity} className={"after_btn"}>테스트 주소 넣기</button>*/}
      </div>
    </div>
  );
}

export default Regi5Form;
