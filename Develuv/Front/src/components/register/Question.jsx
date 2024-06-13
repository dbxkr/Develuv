import React from 'react'
//주어진 선택지를 보여주고 각 선택지에 대한 라디오 버튼 랜더링
const Question = ({
  question,
  options,
  selectedOption,
  handleOptionChange,
}) => {
  return (
    <div>
      <h2>{question}</h2>
      {options.map((option, index) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  )
}

export default Question
