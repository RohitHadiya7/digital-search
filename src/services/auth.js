import api from './api.js'

class AuthService {
  // Send registration OTP
  async sendRegistrationOTP(phoneNumber, deviceId) {
    try {
      const response = await api.post('/v1/verify-phone-number', {
        phoneNumber,
        deviceId
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Verify registration OTP
  async verifyRegistrationOTP(otp, deviceID) {
    try {
      const response = await api.post('/v1/verify-phone-otp', {
        otp,
        deviceID
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Register user
  async registerUser(userData) {
    try {
      const response = await api.post('/v1/signs-up', userData)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Send login OTP
  async sendLoginOTP(phoneNumber, deviceId) {
    console.log('Auth service: sendLoginOTP called with:', { phoneNumber, deviceId })
    try {
      console.log('Making API call to:', '/v1/users/login')
      const response = await api.post('/v1/users/login', {
        phoneNumber,
        deviceId
      })
      console.log('API response:', response.data)
      return response.data
    } catch (error) {
      console.error('Auth service error:', error)
      throw this.handleError(error)
    }
  }

  // Verify login OTP
  async verifyLoginOTP(deviceId, otp) {
    try {
      const response = await api.post('/v1/users/verify-login-otp', {
        deviceId,
        otp
      })
      
      // Store token if login successful
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token)
      }
      
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Logout user
  async logout() {
    try {
      await api.get('/logout-user')
      localStorage.removeItem('authToken')
      return { success: true }
    } catch (error) {
      // Even if API call fails, clear local token
      localStorage.removeItem('authToken')
      throw this.handleError(error)
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const response = await api.get('/api/users/me')
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Update user
  async updateUser(userId, updateData) {
    try {
      const response = await api.patch(`/v1/users/${userId}`, updateData)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Delete user
  async deleteUser(userId) {
    try {
      const response = await api.delete(`/api/users/delete/${userId}`)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('authToken')
  }

  // Get stored token
  getToken() {
    return localStorage.getItem('authToken')
  }

  // Error handler
  handleError(error) {
    const message = error.response?.data?.message || error.message || 'An error occurred'
    return new Error(message)
  }
}

export default new AuthService() 