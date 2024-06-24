import React, { useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function GoogleCallback() {
  const history = useHistory()

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const google_id = import.meta.env.VITE_GOOGLE_CLIENT_ID
      const google_key = import.meta.env.VITE_GOOGLE_SECRET_KEY
      const code = urlParams.get('code')
      if (code) {
        try {
          // Exchange authorization code for access token
          const response = await axios.post(
            'https://oauth2.googleapis.com/token',
            {
              code: code,
              client_id: google_id,
              client_secret: google_key,
              redirect_uri: 'http://localhost:8080/login/oauth2/code/google', // Must match the configured redirect URI
              grant_type: 'authorization_code',
            }
          )
          console.log('Access Token:', response.data.access_token)

          // Use the access token to fetch user information from Google API
          const userInfoResponse = await axios.get(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            {
              headers: {
                Authorization: `Bearer ${response.data.access_token}`,
              },
            }
          )
          console.log('User Info:', userInfoResponse.data)

          // Redirect to mainPage after successful login
          history.push('/MainPage')
        } catch (error) {
          console.error('Error fetching Google token:', error)
        }
      }
    }

    handleGoogleCallback()
  }, [history])

  return (
    <div>
      <h2>Google Login Callback</h2>
      <p>Processing your login...</p>
    </div>
  )
}

export default GoogleCallback
