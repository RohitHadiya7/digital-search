import api from './api.js'
import sessionService from './session.js'

class AuthService {
  // Send registration OTP - validates unique phone/device
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
        deviceId: deviceID 
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

  // Send login OTP - for registered users only
  async sendLoginOTP(phoneNumber, deviceId) {
    try {
      const response = await api.post('/v1/users/login', {
        phoneNumber,
        deviceId
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Verify login OTP - returns user data and token
  async verifyLoginOTP(deviceId, otp) {
    try {
      const response = await api.post('/v1/users/verify-login-otp', {
        deviceId,
        otp
      })
      
      // Store token if login successful
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token)
        // Reset session timeout
        if (sessionService) {
          sessionService.resetSession()
        }
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

  // Update user - requires auth token
  async updateUser(userId, updateData) {
    try {
      const response = await api.patch(`/v1/users/${userId}`, updateData)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Delete user - requires auth token
  async deleteUser(userId) {
    try {
      const response = await api.delete(`/v1/users/${userId}`)
      return response.data
    } catch (error) {
      console.error('Auth service error:', error)
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