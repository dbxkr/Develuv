import React, { useState, useEffect } from 'react'
import './Modal.css'
import {
  getUserCoins,
  deductCoins,
  recommendUser,
  recommendUserByNbti,
} from './api'
import icon from '../../assets/money.png'

const Modal = ({ type, closeModal, userId }) => {
  const [isNbtiSelection, setIsNbtiSelection] = useState(false)
  const [nbti, setNbti] = useState({
    nbti1: '',
    nbti2: '',
    nbti3: '',
    nbti4: '',
  })
  const [recommendedUser, setRecommendedUser] = useState(null)
  const [coins, setCoins] = useState(0)
  const [noUserFound, setNoUserFound] = useState(false)

  useEffect(() => {
    const fetchUserCoins = async () => {
      try {
        const userCoins = await getUserCoins(userId)
        setCoins(userCoins)
      } catch (error) {
        console.error('Error fetching user coins:', error)
      }
    }

    fetchUserCoins()
  }, [userId])

  const handleCoinUse = async () => {
    try {
      const remainingCoins = await deductCoins(userId, 1000)
      setCoins(remainingCoins)
      if (type === 'nbti') {
        setIsNbtiSelection(true)
      } else {
        const user = await recommendUser(userId)
        setRecommendedUser(user)
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === 'Insufficient coins'
      ) {
        alert('코인이 부족합니다.')
      } else {
        console.error('Failed to use coins:', error)
      }
    }
  }

  const handleNbtiChange = (e) => {
    const { name, value } = e.target
    setNbti((prevNbti) => ({
      ...prevNbti,
      [name]: value,
    }))
  }

  const handleNbtiSubmit = async () => {
    try {
      const user = await recommendUserByNbti(userId, nbti)
      if (user) {
        setRecommendedUser(user)
        setNoUserFound(false)
      } else {
        setNoUserFound(true)
      }
      setIsNbtiSelection(false)
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === 'Insufficient coins'
      ) {
        alert('코인이 부족합니다.')
      } else {
        console.error('Failed to use coins:', error)
      }
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        {!isNbtiSelection ? (
          <>
            <img
              src={icon}
              alt="Icon"
              style={{ width: '50px', height: '50px' }}
            />
            <p className="modal-text">1000 BIT로 한번 더 소개받기</p>
            <p>현재 코인: {coins}</p>
            <button className="modal-button" onClick={handleCoinUse}>
              1000 BIT 결제
            </button>
            <button className="modal-button" onClick={closeModal}>
              뒤로가기
            </button>
            {recommendedUser && (
              <div>
                <h4>추천된 유저:</h4>
                <p>{recommendedUser.user_name}</p>
                <p>{recommendedUser.user_nbti}</p>
              </div>
            )}
            {noUserFound && (
              <div>
                <p>해당 NBTI에 맞는 유저를 찾지 못했습니다.</p>
              </div>
            )}
          </>
        ) : (
          <>
            <h3>NBTI</h3>
            <h4>선호하는 NBTI를 골라주세요.</h4>
            <div className="nbti-container">
              <ul>
                <li>
                  <input
                    type="radio"
                    id="front"
                    name="nbti1"
                    value="F"
                    onChange={handleNbtiChange}
                  />
                  <label htmlFor="front">Front</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="inside"
                    name="nbti2"
                    value="I"
                    onChange={handleNbtiChange}
                  />
                  <label htmlFor="inside">Inside</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="window"
                    name="nbti3"
                    value="W"
                    onChange={handleNbtiChange}
                  />
                  <label htmlFor="window">Window</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="daytime"
                    name="nbti4"
                    value="D"
                    onChange={handleNbtiChange}
                  />
                  <label htmlFor="daytime">Daytime</label>
                </li>
              </ul>
              <ul className="vs">
                <li>
                  <h3>vs</h3>
                </li>
              </ul>
              <ul>
                <li>
                  <input
                    type="radio"
                    id="back"
                    name="nbti1"
                    value="B"
                    onChange={handleNbtiChange}
                  />
                  <label htmlFor="back">Back</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="outside"
                    name="nbti2"
                    value="O"
                    onChange={handleNbtiChange}
                  />
                  <label htmlFor="outside">Outside</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="mac"
                    name="nbti3"
                    value="M"
                    onChange={handleNbtiChange}
                  />
                  <label htmlFor="mac">Mac</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="night"
                    name="nbti4"
                    value="N"
                    onChange={handleNbtiChange}
                  />
                  <label htmlFor="night">Night</label>
                </li>
              </ul>
            </div>
            <button className="submit-button" onClick={handleNbtiSubmit}>
              제출
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Modal
