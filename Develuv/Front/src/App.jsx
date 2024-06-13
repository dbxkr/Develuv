//퀴즈 완료 여부에 따라
//퀴즈 컴포넌트 or 회원가입 2단계 컴포넌트 렌더링
import React, { useState } from 'react'
import './App.css'
import Quiz from './components/Quiz'
import SignupStep2 from './components/SignupStep2'

function App() {
  const [quizCompleted, setQuizCompleted] = useState(false) // 퀴즈 완료 상태 변수

  return (
    <div className="App">
      {quizCompleted ? (
        // 퀴즈가 완료된 경우 회원가입 2단계 컴포넌트를 렌더링 (SignupStep2)
        <SignupStep2 />
      ) : (
        // 퀴즈가 완료되지 않은 경우 퀴즈 컴포넌트를 렌더링
        <Quiz onSuccess={() => setQuizCompleted(true)} />
      )}
    </div>
  )
}

export default App
