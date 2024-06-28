import React from 'react'

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-container">
      <div className="progress-line">
        {progress != 5 && (
          <div
            className="progress-circle"
            style={{ left: `${(progress - 1) * 23}%` }}
          >
            {progress}
          </div>
        )}
        <div className="progress-circle-fifth" />
      </div>
    </div>
  )
}

export default ProgressBar
