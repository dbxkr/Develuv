import React, { useState } from 'react'
import Modal from './Modal'
import './Left.css'
import icon from '../../assets/money.png' // PNG 이미지 파일 import
import icon2 from '../../assets/money.svg' // SVG 이미지 파일 import

const Left = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [userId] = useState('user01') // 실제로는 로그인한 사용자의 ID를 사용
  // 일단 db에 user01한테 3000비트 넣어놓음(임시)

  const openModal = (type) => {
    setModalType(type)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="matching-container">
      <img src={icon} alt="Icon" className="matching-icon" />
      <button className="check-button" onClick={() => openModal('onceMore')}>
        한번 더 소개 받기
        <img src={icon2} alt="Icon2" className="button-icon" />
      </button>
      <button className="check-button" onClick={() => openModal('nbti')}>
        NBTI로 소개 받기
        <img src={icon2} alt="Icon2" className="button-icon" />
      </button>
      <button className="check-button" onClick={() => openModal('topUser')}>
        상위 유저 소개 받기
        <img src={icon2} alt="Icon2" className="button-icon" />
      </button>
      {isModalOpen && (
        <Modal type={modalType} closeModal={closeModal} userId={userId} />
      )}
    </div>
  )
}

export default Left
