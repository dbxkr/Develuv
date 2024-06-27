import "./Regi3Form.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import DaumPostCode from "./DaumPostCode.jsx";


function Regi3Form({
  progress,
  setProgress,
  formData,
  setFormData,
  imgPreview,
  setImgPreview,
  setImage,
  state,
}) {
  const navigate = useNavigate();

  const genders = [
    {type: "male", title: "남자"},
    {type: "female", title: "여자"},
  ];

  const [selGen, setSelGen] = useState("");
  const onChangeName = (e) => {
    setFormData({...formData, user_name: e.target.value});
  };

  const onChangeJob = (e) => {
    setFormData({...formData, user_job: e.target.value});
  };
  const onChangeAddr = (e) => {
    setFormData({...formData, user_address: e.target.value});
  };

  const genClicked = (type) => {
    setSelGen(type);
    setFormData({...formData, user_gender: type});
  };

  const regi3Submit = () => {
    setProgress(progress + 1);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setImgPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className={"Regi3Form"} style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
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
        // onKeyDown={onEnter}
        value={formData.user_name}
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

      <hr className={"half_hr"}/>

      <div className={"sub_title"}>
        언제든지 변경이 가능하며 매칭을 위해 필요한 정보입니다.
      </div>

      {/* 직업 select로 바꿀 예정 */}
      <div className={"regi3_form"}>
        <div className={"form_label"}>직업</div>
        <input
          className={"regi3_in"}
          onChange={onChangeJob}
          // onKeyDown={onEnter}
          value={formData.user_job}
          type={"text"}
          placeholder={"직업 입력"}
        />

        {/* 주소 이후엔 daum 지도 api 사용 */}

      </div>
      <div className={"regi3_form"}>
        <div className={"form_label"}>주소</div>
        <div className={"regi3_address_div"}>
          <input
            className={"addr_in"}
            onChange={onChangeAddr}
            // onKeyDown={onEnter}
            value={formData.user_address}
            type={"text"}
            placeholder={"주소 입력"}
          />
          <DaumPostCode formData={formData} setFormData={setFormData}/>
        </div>
      </div>

      <div className={"img_div"}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {imgPreview && (
          <img
            src={imgPreview}
            alt="Preview"
            style={{width: "300px", height: "300px"}}
          />
        )}

        <input className={"regi3_img_in"} type="file" onChange={handleImageUpload}/>
        {formData.user_profile.includes("googleusercontent") && (
          <img
            src={formData.user_profile}
            alt="Preview"
            style={{ width: "300px", height: "auto" }}
          />
        )}
        {/*<input type="file" onChange={handleImageUpload} />*/}
      </div>
      <div className={"pre_next_div"}>
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
