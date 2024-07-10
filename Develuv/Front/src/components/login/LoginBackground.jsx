import { useState, useEffect } from 'react'
function Cell({ value, color, onMouseOver }) {
  const style = { color: color, userSelect: 'none' }
  return (
    <div style={style} onMouseOver={onMouseOver} className="background">
      {value}
    </div>
  )
}

function LoginBackground({ windowSize }) {
  const cellSize = 8 * 2 // 셀의 크기 (px)

  const rows = Math.floor(windowSize.height / cellSize) * 1.1
  const cols = Math.floor(windowSize.width / cellSize) * 0.7
  const n = Math.min(rows, cols) / 2 // 웹 페이지의 크기에 따라 변하는 값

  const center = { x: Math.floor(cols / 2), y: Math.floor(rows / 2) }
  const nn = Math.floor(n / 8)
  const initialData = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      value: Math.random() < 0.5 ? 0 : 1,
      color: 'lightgray',
      active: false,
    }))
  )
  const [gridData, setGridData] = useState(initialData)

  useEffect(() => {
    const newData = [...gridData]
    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j <= cols; j++) {
        const x = j - center.x
        const y = i - center.y
        if (x * x + Math.abs(x) * y + y * y < (n * n) / (1.5 * 1.5)) {
          newData[i][j].active = true // 방정식을 만족하는 셀 표시
        }
      }
    }
    setGridData(newData)
  }, []) // 빈 의존성 배열을 전달하여 컴포넌트가 마운트될 때만 이 효과를 실행합니다.

  const changeColor = (i, j) => {
    if (
      gridData[i] &&
      gridData[i][j] &&
      gridData[i][j].active == true &&
      gridData[i][j].color == 'lightgray'
    ) {
      const newData = [...gridData]
      newData[i][j] = { ...newData[i][j], color: 'red' } // 색상 변경
      setGridData(newData)
    }
  }

  const handleMouseOver = (i, j) => {
    for (let ii = i - nn; ii < i + nn; ii++) {
      for (let jj = j - nn; jj < j + nn; jj++) {
        changeColor(ii, jj)
      }
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {gridData.map((row, i) => (
        <div key={i} style={{ display: 'flex', gap: '8px' }}>
          {row.map((cell, j) => (
            <Cell
              key={j}
              value={cell.value}
              color={cell.color}
              onMouseOver={() => handleMouseOver(i, j)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default LoginBackground
