import api from './api.js'

class UserService {
  // Get dropdowns data
  async getDropdowns() {
    try {
      const response = await api.get('/v1/dropdowns')
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Get single user by ID - requires auth token
  async getUserById(userId) {
    try {
      const response = await api.get(`/v1/users/${userId}`)
      return response.data
    } catch (error) { 
      throw this.handleError(error)
    }
  }

  // Get user activity logs
  async getUserActivityLogs(params = {}) {
    try {
      const {
        userId = '',
        status = 'success',
        page = 1,
        limit = 5
      } = params

      const response = await api.get('/v1/userLogs', {
        params: {
          userId,
          status,
          page,
          limit
        }
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  
  handleError(error) {
    const message = error.response?.data?.message || error.message || 'An error occurred'
    return new Error(message)
  }
}

export default new UserService() 