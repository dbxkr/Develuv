import axios from 'axios'

const API_URL = 'http://localhost:8080/api/tokens'

// 사용자 코인 확인 API 호출
export const getUserCoins = async (user_id) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: { user_id },
    })
    console.log('token', response)
    return response.data.token
  } catch (error) {
    console.error('Failed to fetch user coins:', error)
    throw error
  }
}

// 사용자 코인을 차감하는 API 호출
export const deductCoins = async (user_id, amount) => {
  try {
    const response = await axios.post(`${API_URL}/deduct`, {
      user_id,
      amount,
    })
    console.log('Remaining Coins:', response.data.token) // API 응답 확인
    // API로부터 받은 남은 토큰 잔액 반환
    return response.data.token
  } catch (error) {
    console.error('Failed to use coins:', error)
    throw error
  }
}

// 관리용 코인 추가 API 호출
export const addCoins = async (user_id, amount) => {
  try {
    const response = await axios.post(`${API_URL}/admin/add`, {
      user_id,
      amount,
    })
    return response.data.updatedCoins
  } catch (error) {
    console.error('Failed to add coins:', error)
    throw error
  }
}

// 유저를 추천받는 API 호출
export const recommendUser = async (user_id, excludedUserIds = []) => {
  try {
    const response = await axios.get(`${API_URL}/recommend`, {
      params: {
        user_id,
        excludedUserIds: excludedUserIds.join(','),
      },
    })
    return response.data
  } catch (error) {
    console.error('Failed to recommend user:', error)
    throw error
  }
}

// NBTI 필터링된 유저를 추천받는 API 호출
// 클라이언트 측에서 NBTI 정보를 하나의 문자열로 합쳐서 서버에 전송
export const recommendUserByNbti = async (
  userId,
  nbti,
  excludedUserIds = []
) => {
  try {
    const nbtiString = `${nbti.nbti1}${nbti.nbti2}${nbti.nbti3}${nbti.nbti4}` // NBTI를 문자열로 합침
    const response = await axios.get(`${API_URL}/recommend/nbti`, {
      params: {
        user_id: userId,
        user_nbti: nbtiString, // 수정된 부분
        excludedUserIds: excludedUserIds.join(','),
      },
    })
    return response.data
  } catch (error) {
    console.error('Failed to recommend user by NBTI:', error)
    throw error
  }
}
// 유명한 유저를 추천받는 API 호출
export const recommendUserByFame = async (user_id, excludedUserIds = []) => {
  try {
    const response = await axios.get(`${API_URL}/recommend/fame`, {
      params: {
        user_id,
        excludedUserIds: excludedUserIds.join(','),
      },
    })
    return response.data
  } catch (error) {
    console.error('Failed to recommend user by fame:', error)
    throw error
  }
}

// "다시 검색" API 호출
export const recommendUserAgain = async (user_id, excludedUserIds = []) => {
  try {
    const response = await axios.get(`${API_URL}/recommend/again`, {
      params: {
        user_id,
        excludedUserIds: excludedUserIds.join(','),
      },
    })
    return response.data
  } catch (error) {
    console.error('Failed to recommend user again:', error)
    throw error
  }
}
