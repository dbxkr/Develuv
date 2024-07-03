import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DaumPostCode from "../register/Register3/DaumPostCode";

function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [formData, setFormData] = useState({});
  const [city, setCity] = useState();

  useEffect(() => {
    if (user.user_id !== "admin") {
      navigate("/nahhh");
    }
    axios.post("http://localhost:8080/user/getAll").then((res) => {
      // console.log(res);
      setUserList(Object.values(res.data));
    });
  }, []);

  useEffect(() => {
    setSelectedUser(userList.find((item) => item.user_id === selectedId));
  }, [selectedId, userList]);

  if (userList.length === 0) {
    return <div>loading...</div>;
  }

  const submit = async (t) => {
    let newFormData;
    if (t == "user_address") {
      newFormData = {
        value: formData.user_address,
        type: t,
        user_id: selectedId,
      };
      const cityData = {
        user_address: formData.user_address,
        city: city,
        user_id: selectedId,
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
    } else {
      newFormData = {
        type: t,
        user_id: selectedId,
        value: document.querySelector(`#${t}`).value,
      };
    }
    setFormData(newFormData);
    // 이제 newFormData를 사용하여 필요한 작업을 수행할 수 있습니다.
    axios
      .post("http://localhost:8080/user/updateOneProfile", newFormData)
      .then((res) => {
        console.log("submit", res);
      });

    console.log("newFormData", newFormData);
  };

  return (
    <div>
      {/* <div>{console.log(userList)}</div> */}
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        {userList.map((item) => {
          // console.log("item", item.user_id);
          return (
            <option key={item.user_id} value={item.user_id}>
              {item.user_id}
            </option>
          );
        })}
      </select>
      {selectedId &&
        Object.entries(
          userList.find((item) => item.user_id === selectedId)
        ).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              marginTop: "5px",
            }}
          >
            {key}:
            <input
              key={`${selectedId}-${key}-${city}`}
              type="text"
              defaultValue={key == "user_address" ? city : value}
              id={key}
              style={{ margin: "0px", paddingTop: "3px", paddingBottom: "3px" }}
            />
            {key == "user_address" || key === "user_profile" ? (
              <button
                onClick={() => {
                  submit(key);
                }}
                style={{ padding: "0px", margin: "0px" }}
              >
                반영
              </button>
            ) : null}
            {key != "user_address" ? null : (
              <DaumPostCode
                formData={formData}
                setFormData={setFormData}
                setCity={setCity}
              />
            )}
          </div>
        ))}
    </div>
  );
}

export default Admin;
