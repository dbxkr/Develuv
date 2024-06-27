import {useDaumPostcodePopup} from "react-daum-postcode";
import "./DaumPostCode.css"

const DaumPostCode = ({formData,setFormData}) => {
  const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    let localAddress = data.sido + data.sigungu;

    fullAddress = localAddress +fullAddress;

    if (data.addressType === 'R') {
      fullAddress = fullAddress.replace(localAddress, '');
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    fullAddress = fullAddress.replace(/ /g, '');

    setFormData({...formData, user_address: fullAddress}); // setAddress를 호출하여 부모 컴포넌트의 상태를 업데이트
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (<button className={"dpost_btn"} type="button" onClick={handleClick}>주소검색</button>);
}

export default DaumPostCode