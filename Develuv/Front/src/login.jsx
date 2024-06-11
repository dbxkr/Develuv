import React, { useState } from 'react';
import google from './img/google.png'
import kakao from './img/kakao.png'
import naver from './img/naver.png'


function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    
    const handleSubmit = (event) => {
        event.preventDefault();
        // 여기에 로그인 로직을 추가합니다
        console.log('ID:', id);
        console.log('Password:', password);
    };

    const handleNaverLogin = () => {
        const clientId = 'OeXmWy5TKjs0PsWs63Xr'; // 네이버에서 발급받은 클라이언트 ID
        const redirectUri = encodeURI('http://localhost/8080/Callback'); // 콜백 URL
        const state = Math.random().toString(36).substr(2, 11); // 상태 코드 (CSRF 방지를 위해 사용)
        const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
    
        window.location.href = naverAuthUrl; // 네이버 로그인 페이지로 리다이렉션
      };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <p>Please enter your ID and Password.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                        placeholder='ID'
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='Password'
                    />
                </div>
                <div>
                    <button type="submit" className="login-button">Login</button>
                </div>
            </form>
            <div className="link-container">
                <a href="#" className="link">아이디 찾기</a> |
                <a href="#" className="link">비밀번호 찾기</a> |
                <a href="#" className="link">회원가입</a>
            </div>
            <div className="divider">
                <span>or continue with</span>
            </div>
            <br></br>
            <div className="image-container">
                <img className="google" src={google} alt="Google" />
                <img className="naver" src={naver} alt="Naver" onClick={handleNaverLogin}/>
                <img className="kakao" src={kakao} alt="Kakao" />
            </div>
            <br></br><br></br><br></br><br></br><br></br>
            <p>By loggin in,<br></br>you agree to our Terms of Service and Privacy Policy</p>
        </div>
    );
}

export default Login;
