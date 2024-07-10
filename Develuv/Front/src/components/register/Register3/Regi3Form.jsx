import "./Regi3Form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DaumPostCode from "./DaumPostCode.jsx";

function Regi3Form({
  progress,
  setProgress,
  formData,
  setFormData,
  imgPreview,
  setImgPreview,
  setImage,
  setCity,
}) {
  const navigate = useNavigate();

  const genders = [
    { type: "male", title: "남자" },
    { type: "female", title: "여자" },
  ];

  const [selGen, setSelGen] = useState("");

  const onChangeName = (e) => {
    setFormData({ ...formData, user_name: e.target.value });
  };

  const onChangeJob = (e) => {
    setFormData({ ...formData, user_job: e.target.value });
  };

  const onChangeAddr = (e) => {
    setFormData({ ...formData, user_address: e.target.value });
  };

  const genClicked = (type) => {
    setSelGen(type);
    setFormData({ ...formData, user_gender: type });
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
    <div className="Register3Form">
      <div className="progress-container3">
        <div className="progress-line3">
          <div className="progress-circle3 third"></div>
          <div className="progress-circle3 fifth"></div>
        </div>
      </div>
      <div className="title3">
        <div className="tt">Essential Information</div>
        <div className="gray_font">Please enter the information</div>
      </div>

      <div className="container">
        <div className="gbtn_div">
          {genders.map((gender, index) => (
            <button
              key={index}
              onClick={() => genClicked(gender.type)}
              className={"gender_btn" + (selGen === gender.type ? "_sel" : "")}
            >
              {gender.title}
            </button>
          ))}
        </div>

        <hr className="half_hr" />

        <div className="sub_title">
          언제든지 변경이 가능하며 매칭을 위해 필요한 정보입니다.
        </div>

        <input
          className="regi3_in"
          onChange={onChangeJob}
          value={formData.user_job}
          type="text"
          placeholder="직업을 입력해주세요"
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            className="regi3_in2"
            onChange={onChangeAddr}
            value={formData.user_address}
            type="text"
            placeholder="주소를 입력해주세요"
            style={{
              marginBottom: "0px",
              borderRadius: "5px 0 0 5px",
            }}
            readOnly="true"
          />
          <DaumPostCode
            formData={formData}
            setFormData={setFormData}
            setCity={setCity}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px" /* 상단 여백 */,
            marginBottom: "20px" /* 하단 여백 */,
          }}
        >
          <input type="file" onChange={handleImageUpload} />
          {imgPreview && (
            <img
              src={imgPreview}
              alt="Preview"
              style={{
                width: "95px",
                height: "40px",
                marginLeft: "15px",
              }}
            />
          )}
        </div>
      </div>
      <div className="reg3_ba_btn">
        <button
          type="button"
          onClick={() => setProgress(progress - 1)}
          className="before_btn"
        >
          이전
        </button>
        <button type="button" onClick={regi3Submit} className="after_btn">
          다음
        </button>
      </div>
    </div>
  );
}

export default Regi3Form;
