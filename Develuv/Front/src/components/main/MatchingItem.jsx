import reactimg from "../../assets/react.svg";
import { Link } from "react-router-dom";
import ImgMdSwitch from "./detail/ImgMdSwitch";

const MatchingItem = ({
  user_id,
  user_name,
  user_gender,
  user_nbti,
  user_adress,
  user_profile,
}) => {
  const blurLevel = [50, 70, 90, 140, 4000];
  return (
    <div className={"MatchingItem"}>
      <div className={"matching_item_profile"}>
        <Link to={`/mypage/${user_id}`}>
          <img
            src={user_profile + blurLevel[0] + "&blur=QU2/^23ZzX"}
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "15px",
              border: "1px solid black",
            }}
            alt="User Profile"
            onContextMenu={(event) => {
              event.preventDefault();
            }}
          />
          <ImgMdSwitch
            imgRoute={user_profile + blurLevel[0] + "&blur=QU2/^23ZzX"}
            onContextMenu={(event) => {
              event.preventDefault();
            }}
          />
        </Link>
      </div>
      <div className={"matching_item_name"}>
        {user_name}, 나이, {user_gender}
      </div>
      <div className={"matching_item_nbti"}>NBTI: {user_nbti}</div>
      <div className={"matching_item_adr"}>{user_adress}</div>
    </div>
  );
};

export default MatchingItem;
