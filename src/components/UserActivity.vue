<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">User Activity Logs</h2>
    
    <div class="mb-4">
      <Button @click="loadActivityLogs" :disabled="loading">
        {{ loading ? 'Loading...' : 'Load Activity Logs' }}
      </Button>
    </div>

    <div v-if="error" class="text-red-500 mb-4">
      {{ error }}
    </div>

    <div v-if="activityLogs.length > 0" class="space-y-4">
      <div 
        v-for="log in activityLogs" 
        :key="log.id" 
        class="p-4 border rounded-lg"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold">{{ log.action || 'Activity' }}</h3>
            <p class="text-sm text-gray-600">{{ log.description || 'No description' }}</p>
          </div>
          <span class="text-xs text-gray-500">
            {{ new Date(log.timestamp || log.createdAt).toLocaleString() }}
          </span>
        </div>
        <div v-if="log.status" class="mt-2">
          <Badge :variant="log.status === 'success' ? 'default' : 'destructive'">
            {{ log.status }}
          </Badge>
        </div>
      </div>
    </div>

    <div v-else-if="!loading" class="text-gray-500">
      No activity logs found.
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUser } from '@/composables/useUser.js'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const { 
  activityLogs, 
  loading, 
  error, 
  getActivityLogs, 
  clearError 
} = useUser()

const loadActivityLogs = async () => {
  try {
    await getActivityLogs({
      status: 'success',
      page: 1,
      limit: 10
    })
    clearError()
  } catch (err) {
    console.error('Failed to load activity logs:', err)
  }
}

onMounted(() => {
  loadActivityLogs()
})
</script> 