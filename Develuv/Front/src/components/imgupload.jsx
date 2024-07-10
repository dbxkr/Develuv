import React, { useState, useEffect } from "react";
import axios from "axios";

function ImageUpload({ image, setImgUrl }) {
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

  useEffect(() => {
    refreshAccessToken();
  }, []);

  const uploadFile = () => {
    const folderId = "1MTa41ozlOhsVe5ID--NZ8Br_xii27knL"; // 업로드하려는 폴더의 ID

    const formData = new FormData(); // FormData 객체 생성
    formData.append(
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
    formData.append("file", image); // 파일 데이터 추가

    console.log(accessToken);
    console.log(image.type);
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
        const fileId = response.data.id;
        setImgUrl(`https://drive.google.com/thumbnail?id=${fileId}&sz=s4000`);
      });
  };

  uploadFile;
  return null;
}

export default ImageUpload;
