import authService from '@/services/auth.js'

// Auth guard for protected routes
export function requireAuth(to, from, next) {
  if (authService.isAuthenticated()) {
    next()
  } else {
    next('/login')
  }
}

// Guest guard for login/register routes
export function requireGuest(to, from, next) {
  if (authService.isAuthenticated()) {
    next('/dashboard')
  } else {
    next()
  }
}

// Optional auth guard - allows both authenticated and guest users
export function optionalAuth(to, from, next) {
  next()
} 