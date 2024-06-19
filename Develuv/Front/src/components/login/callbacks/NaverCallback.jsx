import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function NaverCallback() {
  const location = useLocation();

  useEffect(() => {
    const getNaverToken = async () => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_NAVER_SECRET_KEY;

      try {
        const response = await axios.get(`https://nid.naver.com/oauth2.0/token`, {
          params: {
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            state: state,
          },
        });
        console.log('Access Token:', response.data.access_token);
        // 여기서 네이버 API를 사용하여 사용자 정보를 가져올 수 있습니다.
      } catch (error) {
        console.error('Error fetching Naver token:', error);
      }
    };

    getNaverToken();
  }, [location]);

  return (
    <div>
      <h2>Naver Login Callback</h2>
      <p>Processing your login...</p>
    </div>
  );
}

export default NaverCallback;
