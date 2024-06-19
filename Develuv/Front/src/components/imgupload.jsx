import React, { useState, useEffect } from "react";
import axios from "axios";

function ImageUpload() {
  const client_id = import.meta.env.VITE_GOOGLE_DRIVE_CLIENT_ID;
  const secret_key = import.meta.env.VITE_GOOGLE_DRIVE_SECRET_KEY;
  const redirect_url = import.meta.env.VITE_GOOGLE_DRIVE_REDIRECT_URL;

  const [imgUrl, setImgUrl] = useState("");
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

  useEffect(() => {
    refreshAccessToken();
  }, []);

  const uploadFile = () => {
    const fileInput = document.getElementById("img");
    const file = fileInput.files[0]; // input에서 선택된 파일 가져오기
    const folderId = "1MTa41ozlOhsVe5ID--NZ8Br_xii27knL"; // 업로드하려는 폴더의 ID

    const formData = new FormData(); // FormData 객체 생성
    formData.append(
      "metadata",
      new Blob(
        [
          JSON.stringify({
            name: file.name, // 파일 이름과 확장자
            mimeType: file.type, // 파일 MIME 타입
            parents: [folderId], // 업로드하려는 폴더의 ID
          }),
        ],
        { type: "application/json" }
      )
    );
    formData.append("file", file); // 파일 데이터 추가

    console.log(accessToken);
    console.log(file.type);
    axios
      .post(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        formData,
        {
          headers: {
            "Content-Type": "multipart/related",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("File uploaded successfully");
        // 파일 ID를 사용하여 파일의 메타데이터를 가져옵니다.
        const fileId = response.data.id;
        // setImgUrl(`https://lh3.googleusercontent.com/d/${fileId}?authuser=0`);
        setImgUrl(`https://drive.google.com/thumbnail?id=${fileId}&sz=s4000`);
        //   axios
        //     .get(
        //       `https://www.googleapis.com/drive/v3/files/${fileId}?fields=webViewLink,thumbnailLink`,
        //       {
        //         headers: {
        //           Authorization: `Bearer ${accessToken}`,
        //         },
        //       }
        //     )
        //     .then((response) => {
        //       console.log("File metadata: ", response.data);
        //       setImgUrl(response.data.thumbnailLink);
        //     })
        //     .catch((error) => {
        //       console.error(
        //         "There was an error getting the file metadata: ",
        //         error
        //       );
        //     });
        // })
        // .catch((error) => {
        //   console.error("There was an error uploading the file: ", error);
      });
  };

  return (
    <div>
      <input type="file" id="img" />
      <button onClick={uploadFile}>업로드</button>
      <hr />
      <img src={imgUrl} alt="" style={{ width: "100%", height: "auto" }} />
    </div>
  );
}

export default ImageUpload;
