import { ref, readonly } from 'vue'
import userService from '@/services/user.js'

export function useUser() {
  const dropdowns = ref(null)
  const activityLogs = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Get dropdowns data
  const getDropdowns = async () => {
    loading.value = true
    error.value = null
    
    try {
      const result = await userService.getDropdowns()
      dropdowns.value = result
      return result
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Get user by ID
  const getUserById = async (userId) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await userService.getUserById(userId)
      return result
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Get user activity logs
  const getActivityLogs = async (params = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await userService.getUserActivityLogs(params)
      activityLogs.value = result.data || result
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
    dropdowns: readonly(dropdowns),
    activityLogs: readonly(activityLogs),
    loading: readonly(loading),
    error: readonly(error),

    // Actions
    getDropdowns,
    getUserById,
    getActivityLogs,
    clearError
  }
} 