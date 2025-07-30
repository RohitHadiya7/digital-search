// src/composables/useDropdowns.js
import { ref, onMounted } from 'vue'
import api from '@/services/api.js'

export function useDropdowns() {
  const rawData = ref({
    organizations: [],
    departments: [],
    designations: [],
    states: []
  })

  const loading = ref(false)
  const error = ref(null)

  const fetchDropdowns = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/v1/dropdowns')
      rawData.value = response.data
      console.log(rawData.value)
    } catch (err) {
      error.value = err.response?.data?.message || err.message
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchDropdowns)

  return {
    rawData,
    loading,
    error
  }
}
