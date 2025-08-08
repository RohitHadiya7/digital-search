import api from './api.js'
import sessionService from './session.js'

class AuthService {
  // Send registration OTP - validates unique phone/device
  async sendRegistrationOTP(phoneNumber, deviceID) {
    try {
      const response = await api.post('/v1/verify-phone-number', {
        phoneNumber,
        deviceID
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
//****************************************************************** */
//login with phone number and deviceId both
//****************************************************************** */
  // Send login OTP - for registered users only
  async sendLoginOTP(phoneNumber, deviceID) {
    try {
      const response = await api.post('/v1/users/login', {
        phoneNumber,
        deviceID
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Verify login OTP - returns user data and token
  async verifyLoginOTP(deviceID, otp) {
    try {
      const response = await api.post('/v1/users/verify-login-otp', {
        deviceID,
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

//****************************************************************** */
//login with phone number only
//****************************************************************** */
async sendLoginOTPPhone(phoneNumber) {
  try {
    const response = await api.post('/v1/users/login-phoneNumber', {
      phoneNumber
    })
    return response.data
  } catch (error) {
    throw this.handleError(error)
  }
}

async verifyLoginOTPPhone(phoneNumber, otp) {
  try {
    const response = await api.post('/v1/users/verify-login-phoneNumber', {
      phoneNumber,
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
      await api.post('/v1/logOut');
      localStorage.removeItem('authToken')
      localStorage.removeItem('phoneNumber')
      return { success: true }
    } catch (error) {
      // localStorage.removeItem('authToken')
      throw this.handleError(error)
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const response = await api.get('/v1/users/me')
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