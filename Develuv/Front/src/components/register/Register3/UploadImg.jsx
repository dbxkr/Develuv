import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const UploadImg = () => {
  const navi = new useNavigate();

  const [selectedFile, setSelectedFile] = useState();
  const [uploadStatus, setUploadStatus] = useState('');

  const formData = new FormData();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    formData.append("file",event.target.files[0]);
    console.log(formData);
    console.log("file : " + event.target.files[0])
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        alert('파일을 선택해주세요.');
        return;
      }

      console.log(formData);

      const response = await axios.post(
        'http://localhost:8080/upload',
          formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,  // 필요에 따라 설정 (서버가 credentials을 요구할 경우)
        }
      );

      setUploadStatus(`파일 업로드 성공! 이미지 경로: ${response.data}`);
      navi("/register/4")
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      setUploadStatus('파일 업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h2>이미지 업로드</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>업로드</button>
      <p>{uploadStatus}</p>
    </div>
  );
}

export default UploadImg