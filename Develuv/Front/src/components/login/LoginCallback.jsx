import React, { useEffect } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthProvider";

const LoginCallback = (props) => {
  const navigate = useNavigate();
  let match = useMatch("/callback/:provider");
  const serverUrl = "http://localhost:8080/user/sns";

  const { naver } = window;
  const { login } = useAuth();

  const naverLogin = new naver.LoginWithNaverId({
    clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
    callbackUrl: "http://localhost:3500/callback/naver",
    isPopup: true,
    loginButton: {
      color: "green",
      type: 1,
      height: 40,
    },
  });
  const prov_kakao = async (code) => {
    const res = axios.post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
        redirect_uri: "http://localhost:3500/callback/kakao",
        code: code,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    return res;
  };
  const access_kakao = async (res) => {
    if (res) {
      const access_token = res.data.access_token;
      const user = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      return { user, access_token };
    }
  };
  const send_user_kakao = async ({ user, access_token }) => {
    console.log(user);
    const data = {
      id: user.data.id,
      nickname: user.data.kakao_account.profile.nickname,
      access_token: access_token,
      provider: "kakao",
    };
    axios
      .post(serverUrl + "/kakao", data)
      .then((res) => {
        console.log(res);
        if (!res.data.kakao.member) {
          if (
            window.confirm(
              "카카오로 회원가입 하지 않았습니다. 카카오 계정으로 회원가입을 진행할까요?"
            )
          ) {
            navigate("/register", {
              state: {
                provider: "kakao",
                user: data,
                access_token: access_token,
              },
            });
          } else {
            navigate("/");
          }
        } else {
          // localStorage.setItem(
          //   "kakao.access_token",
          //   JSON.stringify(access_token)
          // );
          login(res.data.kakao.id, res.data.kakao.nickname);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const prov_google = async (code) => {
    const res = axios.post(
      "https://oauth2.googleapis.com/token",
      {
        grant_type: "authorization_code",
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        client_secret: import.meta.env.VITE_GOOGLE_SECRET_KEY,
        redirect_uri: "http://localhost:3500/callback/google",
        code: code,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    return res;
  };

  const access_google = async (res) => {
    if (res) {
      const access_token = res.data.access_token;
      const user = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
      return { user, access_token };
    }
  };

  const send_user_google = async ({ user, access_token }) => {
    console.log(user);
    const data = {
      id: user.data.id,
      access_token: access_token,
      name: user.data.family_name + " " + user.data.given_name,
      email: user.data.email,
      profile: user.data.picture,
      provider: "google",
    };
    axios
      .post(serverUrl + "/google", data)
      .then((res) => {
        console.log(res);
        if (!res.data.google.member) {
          if (
            window.confirm(
              "구글로 회원가입 하지 않았습니다. 구글 계정으로 회원가입을 진행할까요?"
            )
          ) {
            navigate("/register", {
              state: {
                provider: "google",
                user: data,
                access_token: access_token,
              },
            });
          } else {
            navigate("/");
          }
        } else {
          // localStorage.setItem(
          //   "google.access_token",
          //   JSON.stringify(access_token)
          // );
          login(res.data.google.id, "name");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const prov_naver = async (code) => {
    naverLogin.init();
    await naverLogin.getLoginStatus((status) => {
      console.log(`로그인?: ${status}`);
      if (status) {
        const user = { ...naverLogin.user };
        console.log("user");
        console.log(user);
        console.log(user.name);
        const data = {
          name: user.name,
          email: user.email,
          gender: user.gender,
          id: user.id,
          mobile: user.mobile,
          birthday: user.birthday,
          birthyear: user.birthyear,
          provider: "naver",
          code: code,
        };
        console.log(data);
        axios
          .post(serverUrl + "/naver", data)
          .then((res) => {
            console.log(res);
            if (!res.data.naver.member) {
              const access_token = localStorage.getItem(
                "com.naver.nid.access_token"
              );
              localStorage.removeItem("com.naver.nid.access_token");
              if (
                window.confirm(
                  "네이버로 회원가입 하지 않았습니다. 네이버 계정으로 회원가입을 진행할까요?"
                )
              ) {
                //여기에 회원가입으로 이동하는 코드 작성. 유저 정보를 함께 보내야함
                navigate("/register", {
                  state: {
                    provider: "naver",
                    user: data,
                    access_token: access_token,
                  },
                });
              } else {
                navigate("/");
              }
            } else {
              login(res.data.naver.id, res.data.naver.name);
              navigate("/");
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };
  useEffect(() => {
    // 백엔드로 코드값을 넘겨주는 로직
    let code = new URL(window.location.href).searchParams.get("code");
    console.log("code: " + code);

    if (match.params.provider === "naver") {
      prov_naver(code);
    }
    if (match.params.provider === "kakao") {
      prov_kakao(code)
        .then((res) => {
          access_kakao(res).then((res) => {
            send_user_kakao(res);
          });
        })
        .catch((err) => console.log(err));
    }
    if (match.params.provider === "google") {
      prov_google(code)
        .then((res) => {
          console.log("google res", res);
          access_google(res).then((res) => {
            send_user_google(res);
          });
        })
        .catch((err) => console.log(err));
    }

    // 요청이 성공하면 navigate('/main')
  }, [match]);

  return <div id="naverIdLogin" style={{ display: "none" }}></div>;
};

export default LoginCallback;
