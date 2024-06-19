import axios from 'axios'

const API_URL = 'http://localhost:8080/api/left'

// 사용자 코인 확인 API 호출
export const getUserCoins = async (user_id) => {
  try {
    const response = await axios.get(`${API_URL}/coins`, {
      params: { user_id },
    })
    return response.data.coins
  } catch (error) {
    console.error('Failed to fetch user coins:', error)
    throw error
  }
}

// 사용자 코인을 차감하는 API 호출
export const deductCoins = async (user_id, amount) => {
  try {
    const response = await axios.post(`${API_URL}/coin/use`, {
      user_id,
      amount,
    })
    return response.data.remainingCoins
  } catch (error) {
    console.error('Failed to use coins:', error)
    throw error
  }
}

// 관리용 코인 추가 API 호출
export const addCoins = async (user_id, amount) => {
  try {
    const response = await axios.post(`${API_URL}/admin/add-coins`, {
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
export const recommendUser = async (user_id) => {
  try {
    const response = await axios.get(`${API_URL}/recommend`, {
      params: { user_id },
    })
    return response.data
  } catch (error) {
    console.error('Failed to recommend user:', error)
    throw error
  }
}

// NBTI 필터링된 유저를 추천받는 API 호출
export const recommendUserByNbti = async (user_id, nbti) => {
  try {
    const response = await axios.get(`${API_URL}/recommend/nbti`, {
      params: {
        user_id,
        nbti1: nbti.nbti1,
        nbti2: nbti.nbti2,
        nbti3: nbti.nbti3,
        nbti4: nbti.nbti4,
      },
    })
    return response.data
  } catch (error) {
    console.error('Failed to recommend user by NBTI:', error)
    throw error
  }
}

// NBTI 필터링된 유저 리스트를 추천받는 API 호출
export const recommendUsersByNbti = async (
  user_id,
  nbti1,
  nbti2,
  nbti3,
  nbti4
) => {
  try {
    const response = await axios.get(`${API_URL}/recommend/nbti`, {
      params: {
        user_id,
        nbti1,
        nbti2,
        nbti3,
        nbti4,
      },
    })
    return response.data
  } catch (error) {
    console.error('Failed to recommend users by NBTI:', error)
    throw error
  }
}
