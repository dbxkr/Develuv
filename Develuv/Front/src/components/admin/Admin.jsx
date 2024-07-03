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
      console.log(res);
      setUserList(Object.values(res.data));
    });
  }, []);

  useEffect(() => {
    setSelectedUser(userList.find((item) => item.user_id === selectedId));
  }, [selectedId, userList]);

  if (userList.length === 0) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>{console.log(userList)}</div>
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        {userList.map((item) => {
          console.log("item", item.user_id);
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
              defaultValue={
                key == "user_address" ? value + ",도시: " + city : value
              }
              id={key}
              style={{ margin: "0px", paddingTop: "3px", paddingBottom: "3px" }}
            />
            {key == "user_id" ? null : (
              <button style={{ padding: "0px", margin: "0px" }}>반영</button>
            )}
            {key != "user_address" ? null : (
              <DaumPostCode
                formData={formData}
                setFormData={setFormData}
                setCity={setCity}
              >
                반영
              </DaumPostCode>
            )}
          </div>
        ))}
    </div>
  );
}

export default Admin;
