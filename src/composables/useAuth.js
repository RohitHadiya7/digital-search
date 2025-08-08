import { ref, computed, readonly } from 'vue'
import { useRouter } from 'vue-router'
import authService from '@/services/auth.js'

export function useAuth() {
  const router = useRouter()
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => authService.isAuthenticated())
  const isLoggedIn = computed(() => !!user.value && isAuthenticated.value)

  // Send registration OTP
  const sendRegistrationOTP = async (phoneNumber, deviceId) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await authService.sendRegistrationOTP(phoneNumber, deviceId)
      return result
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Verify registration OTP
  const verifyRegistrationOTP = async (otp, deviceID) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await authService.verifyRegistrationOTP(otp, deviceID)
      return result
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Register user
  const register = async (userData) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await authService.registerUser(userData)
      return result
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
//************************************************************** */
//login with phone number and deviceId both.
//************************************************************** */
  // Send login OTP
  const sendLoginOTP = async (phoneNumber, deviceId) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await authService.sendLoginOTP(phoneNumber, deviceId)
      return result
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Verify login OTP and login
  const verifyLoginOTP = async (deviceId, otp) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await authService.verifyLoginOTP(deviceId, otp)
      await loadUser()
      router.push('/dashboard')
      return result
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
//************************************************************** */
//login with phone number only
//************************************************************** */
const sendLoginOTPPhone = async (phoneNumber) => {
  loading.value = true
  error.value = null

  try {
    const result = await authService.sendLoginOTPPhone(phoneNumber)
    return result
  } catch (err) {
    error.value = err.message
    throw err
  } finally {
    loading.value = false
  }
}

const verifyLoginOTPPhone = async (phoneNumber, otp) => {
  loading.value = true
  error.value = null

  try {
    const result = await authService.verifyLoginOTPPhone(phoneNumber, otp)
    localStorage.setItem('phoneNumber',phoneNumber)
    await loadUser()
    router.push('/gallery')
    return result
  } catch (err) {
    error.value = err.message
    throw err
  } finally {
    loading.value = false
  }
}

  // Logout
  const logout = async () => {
    loading.value = true
    error.value = null
    
    try {
      await authService.logout()
      user.value = null
      router.push('/login')
    } catch (err) {
      error.value = err.message
      // Still logout locally even if API fails
      // user.value = null
      // router.push('/login')
    } finally {
      loading.value = false
    }
  }

  // Load current user
  const loadUser = async () => {
    if (!isAuthenticated.value) {
      user.value = null
      return
    }

    loading.value = true
    error.value = null
    
    try {
      const userData = await authService.getCurrentUser()
      user.value = userData
    } catch (err) {
      error.value = err.message
      user.value = null
    } finally {
      loading.value = false
    }
  }

  // Update user
  const updateUser = async (userId, updateData) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await authService.updateUser(userId, updateData)
      await loadUser() // Reload user data
      return result
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Clear error
  const clearError = () => {
    error.value = null
  }

  return {
    // State
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    isAuthenticated,
    isLoggedIn,

    // Actions
    sendRegistrationOTP,
    verifyRegistrationOTP,
    register,
    sendLoginOTP,
    verifyLoginOTP,
    sendLoginOTPPhone,
    verifyLoginOTPPhone,
    logout,
    loadUser,
    updateUser,
    clearError
  }
} 