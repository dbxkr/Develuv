import React, { useState } from 'react'
import Modal from './Modal'
import './Left.css'
import icon from '../../assets/money.png' // PNG 이미지 파일 import
import icon2 from '../../assets/money.svg' // SVG 이미지 파일 import
import { useAuth } from '../../AuthProvider'
//버튼 클릭시 모달 창 오픈

const Left = ({
  setMatchType,
  // setMatchList,
  setExcludedUserIds,
  setUserNbti,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const { user } = useAuth()
  // 모달 열기
  const openModal = (type) => {
    setModalType(type)
    setIsModalOpen(true)
  }
  // 모달 닫기
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
        <Modal
          type={modalType}
          closeModal={closeModal}
          userId={user.user_id}
          setMatchType={setMatchType}
          // setMatchList={setMatchList} // 매칭 리스트 설정 함수 추가
          setExcludedUserIds={setExcludedUserIds}
          setUserNbti={setUserNbti} // nbti 설정 함수 추가
        />
      )}
    </div>
  )
}
export default Left
