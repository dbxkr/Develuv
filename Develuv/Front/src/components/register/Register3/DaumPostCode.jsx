import { useDaumPostcodePopup } from 'react-daum-postcode'
import './DaumPostCode.css'

const DaumPostCode = ({ formData, setFormData, setCity }) => {
  const postcodeScriptUrl =
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  const open = useDaumPostcodePopup(postcodeScriptUrl)

  const handleComplete = (data) => {

    let fullAddress = data.address;
    let extraAddress = '';
    let city= "";

    let arr = fullAddress.split(' ')
    // console.log(arr)
    arr[0]='';



    if (
      data.sido === '서울' ||
      data.sido === '대구' ||
      data.sido === '부산' ||
      data.sido === '울산' ||
      data.sido === '인천' ||
      data.sido === '대전' ||
      data.sido === '광주'
    ) {
      city = data.sido + '시'
    } else if (data.sido === '세종특별자치시') {
      city = data.sido
    } else {
      city = data.sigungu.split(' ')[0]
      arr[1]='';
    }
    let localAddress = city + data.sigungu;
    let ll = ''

    arr.forEach(item => ll+=item);
    // console.log(ll)

    fullAddress = localAddress + fullAddress

    if (data.addressType === 'R') {
      fullAddress = fullAddress.replace(localAddress, '')
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }

    fullAddress = fullAddress.replace(/ /g, '')
    fullAddress = city + ll;

    console.log(fullAddress)

    setFormData({ ...formData, user_address: fullAddress }) // setAddress를 호출하여 부모 컴포넌트의 상태를 업데이트
    setCity(city)
  }

  const handleClick = () => {
    open({ onComplete: handleComplete })
  }

  return (<button className={"dpost_btn"} type="button"
                  style={{borderRadius:"0 5px 5px 0", marginLeft:"0px"}}
                  onClick={handleClick}>주소검색</button>);

}

export default DaumPostCode
