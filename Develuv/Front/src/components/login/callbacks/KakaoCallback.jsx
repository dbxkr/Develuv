import React, { useEffect } from 'react';
import axios from 'axios';

function KakaoCallback() {
    useEffect(() => {
        // 콜백 URL에서 받은 인증 코드를 사용하여 액세스 토큰을 교환하는 작업을 수행합니다.
        const handleKakaoCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            const kakao_id=import.meta.env.VITE_KAKAO_CLIENT_ID;
            if (code) {
                try {
                    // 인증 코드를 사용하여 액세스 토큰을 요청합니다.
                    const response = await axios.post('https://kauth.kakao.com/oauth/token', {
                        grant_type: 'authorization_code',
                        client_id: kakao_id, // 여기에 자신의 카카오 클라이언트 ID를 넣어주세요.
                        redirect_uri: 'http://localhost:8080/Callback', // 설정한 리다이렉트 URI와 일치해야 합니다.
                        code: code,
                    });
                    console.log('Access Token:', response.data.access_token);

                    // 액세스 토큰을 사용하여 카카오 API에서 사용자 정보를 가져옵니다.
                    const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
                        headers: {
                            Authorization: `Bearer ${response.data.access_token}`,
                        },
                    });
                    console.log('User Info:', userInfoResponse.data);
                } catch (error) {
                    console.error('Error fetching Kakao token:', error);
                }
            }
        };

        handleKakaoCallback();
    }, []);

    return (
        <div>
            <h2>Kakao Login Callback</h2>
            <p>Processing your login...</p>
        </div>
    );
}

export default KakaoCallback;
