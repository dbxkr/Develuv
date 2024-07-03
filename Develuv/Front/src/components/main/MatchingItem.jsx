import reactimg from "../../assets/react.svg";
import { Link } from "react-router-dom";

const MatchingItem = ({
  user_id,
  user_name,
  user_gender,
  user_nbti,
  user_adress,
  user_profile,
  user_birth,
}) => {
  const blurLevel = [50, 70, 90, 140, 4000];
  function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // 생일이 아직 오지 않은 경우, 나이에서 1을 빼줍니다.
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  return (
    <div className={"MatchingItem"}>
      <div className={"matching_item_profile"}>
        <Link to={`/mypage/${user_id}`}>
          <img
            src={user_profile + 4000 + "&blur=QU2/^23ZzX"}
            style={{
              width: "180px",
              height: "180px",
              filter: `blur(${(4 - 0) * 2}px)`,
            }}
            alt="User Profile"
            onContextMenu={(event) => {
              event.preventDefault();
            }}
          />
        </Link>
      </div>
      <div className={"matching_item_name"}>
        {user_name}, {calculateAge(user_birth)}, {user_gender}
      </div>
      <div className={"matching_item_nbti"}>NBTI: {user_nbti}</div>
      <div className={"matching_item_adr"}>{user_adress}</div>
    </div>
  );
};

export default MatchingItem;
