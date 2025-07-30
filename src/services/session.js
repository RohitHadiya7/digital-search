class SessionService {
  constructor() {
    this.timeout = 20 * 60 * 1000 
    this.setupSessionTimeout()
  }

  // Setup session timeout
  setupSessionTimeout() {
    // Reset timeout on user activity
    const resetTimeout = () => {
      this.clearSessionTimeout()
      this.sessionTimer = setTimeout(() => {
        this.logout()
      }, this.timeout)
    }

    // Listen for user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    events.forEach(event => {
      document.addEventListener(event, resetTimeout, true)
    })

    // Initial timeout setup
    resetTimeout()
  }

  // Clear session timeout
  clearSessionTimeout() {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer)
    }
  }

  // Logout user due to inactivity
  logout() {
    localStorage.removeItem('authToken')
    // Only redirect if not already on login page
    if (window.location.pathname !== '/login') {
      window.location.href = '/login'
    }
  }

  // Reset session (called on successful login)
  resetSession() {
    this.clearSessionTimeout()
    this.setupSessionTimeout()
  }

  // Cleanup on logout
  cleanup() {
    this.clearSessionTimeout()
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    events.forEach(event => {
      document.removeEventListener(event, this.resetTimeout, true)
    })
  }
}

export default new SessionService() 