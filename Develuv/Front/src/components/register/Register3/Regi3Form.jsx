import "./Regi3Form.css"
function Regi3Form () {
  return(
    <div className={"container"}>
      <div className={"tt"}>Essential Information</div>
      <div className={"gray_font"}>Please enter the information</div>
      <div className={"sub_title"}> 변경이 불가능하니 정확하게 입력해주세요</div>

      {/* 입력폼 */}
      <form action>
        <div className={"form_label"}>이름</div>
        <input className={"regi3_in"}
               placeholder={"이름 입력"}/>


        <div className={"form_label"}>성별</div>
        <div className={"gbtn_div"}>
          <button className={"gender_btn"} type={"button"}
                  value={"male"}>남자</button>
          <button className={"gender_btn"} type={"button"}
                  value={"female"}>여자</button>
        </div>
        <input className={"regi3_in"}
               type={"hidden"} value={"nonono"}/>

        <hr className={"half_hr"}/>

        <div className={"sub_title"} >
          언제든지 변경이 가능하며 매칭을 위해 필요한 정보입니다.</div>

        {/* select로 바꿀 예정 */}
        <div className={"form_label"}>직업</div>
        <input className={"regi3_in"}
          type={"text"} placeholder={"직업 입력"}/>

        {/* 이후엔 daum 지도 api 사용 */}
        <div className={"form_label"}>주소</div>
        <input className={"regi3_in"}
          type={"text"} placeholder={"주소 입력"}/>

        {/* 이전 다음 페이지로 넘어가기*/}
        <div>
          <button type={"button"} className={"before_btn"}>이전</button>
          <button type={"submit"} className={"after_btn"}>다음</button>
        </div>

      </form>
    </div>
  )
}

export default Regi3Form