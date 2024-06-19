import "./HeadBar.css"
import menuImg from "../../assets/menubar_white.svg";
import chatBtn from "../../assets/messenger_white.svg"
import reactLogo from "../../assets/react.svg"

const HeadBar = ({user_id}) => {
  return (
    <div className={"HeadBar"}>
      <div className={"menu_bar"}><img src={menuImg}/></div>
      <div className={"logo"}>DEVELUV</div>

      <div className={"chat_btn"}><img src={chatBtn}/></div>
      <div className={"profile_img_div"}><img className={"profile_img"} src={reactLogo} height="40px"/></div>
    </div>
  )
}

export default HeadBar