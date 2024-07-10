import "./mapapi.css"
import {useRef} from "react";

const {kakao} = window

function getDistance(lat1,lng1,lat2,lng2) {
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lng2-lng1);
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}



const KakaoMapApi = ({sample_address1, sample_address2}) => {

  const mapapi = new kakao.maps.services.Geocoder();

  const x1 = useRef();
  const x2 = useRef();
  const y1 = useRef();
  const y2 = useRef();

  mapapi.addressSearch(sample_address1, function (result, status) {
    if(status === kakao.maps.services.Status.OK) {
      x1.current = result[0].x;
      y1.current = result[0].y;
      console.log("addr1 position" + x1.current + " : " + y1.current);
    }
  });
  mapapi.addressSearch(sample_address2, function (result, status) {
    if(status === kakao.maps.services.Status.OK) {
      x2.current = result[0].x;
      y2.current = result[0].y;
      console.log("addr2 position" + x2.current + " : " + y2.current);
    }
    console.log(getDistance(x1.current,y1.current,x2.current,y2.current)*1000+"m");
  });

  return getDistance(x1.current,y1.current,x2.current,y2.current);
}

export default KakaoMapApi