import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function GoogleCallback() {
  const history = useHistory();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const googleClientId = import.meta.env.REACT_APP_GOOGLE_CLIENT_ID;
        const googleClientSecret = import.meta.env.REACT_APP_GOOGLE_SECRET_KEY;
        if (code) {
          // Exchange authorization code for access token
          const tokenResponse = await axios.post(
            "https://oauth2.googleapis.com/token",
            {
              code: code,
              client_id: googleClientId,
              client_secret: googleClientSecret,
              redirect_uri: "http://localhost:8080/Callback",
              grant_type: "authorization_code",
            }
          );

          console.log("Access Token :", tokenResponse.data.access_token);

          // Use the access token to fetch user information from Google API
          const userInfoResponse = await axios.get(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            {
              headers: {
                Authorization: `Bearer ${tokenResponse.data.access_token}`,
              },
            }
          );

          const userInfo = userInfoResponse.data;
          console.log("User Info:", userInfo);
        } else {
          console.error("No authorization code received.");
        }
      } catch (error) {
        console.error("Error fetching Google token:", error);
      }
    }

    handleGoogleCallback();
  }, [history]);

  return (
    <div>
      <h2>Google Login Callback</h2>
      <p>Processing your login...</p>
    </div>
  )
}

export default GoogleCallback
