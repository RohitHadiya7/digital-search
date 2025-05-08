<template>
  <div 
    class="bg-white dark:bg-slate-950 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
    :class="{ 'cursor-grabbing': isDragging }"
  >
    <!-- Card labels -->
    <div class="p-2 pb-0 flex flex-wrap gap-1" v-if="card.labels && card.labels.length">
      <div 
        v-for="label in card.labels" 
        :key="label.text"
        class="px-2 py-0.5 text-xs font-medium rounded-full"
        :class="getLabelClass(label.color)"
      >
        {{ label.text }}
      </div>
    </div>
    
    <!-- Card content -->
    <div class="p-3">
      <h4 class="font-medium mb-1">{{ card.title }}</h4>
      <p class="text-sm text-muted-foreground mb-3" v-if="card.description">
        {{ card.description }}
      </p>
      
      <!-- Card footer -->
      <div class="flex items-center justify-between mt-2">
        <div class="flex items-center gap-1" v-if="card.dueDate">
          <CalendarIcon class="w-3.5 h-3.5 text-muted-foreground" />
          <span class="text-xs text-muted-foreground">{{ formatDate(card.dueDate) }}</span>
        </div>
        
        <div class="flex -space-x-2" v-if="card.members && card.members.length">
          <Avatar v-for="member in card.members" :key="member" class="w-6 h-6 border-2 border-white dark:border-slate-950">
            <AvatarImage :src="`https://github.com/${member}.png`" />
            <AvatarFallback class="text-[10px]">{{ member.substring(0, 2).toUpperCase() }}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CalendarIcon } from 'lucide-vue-next'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})

const isDragging = ref(false)

// Format date to display in a more readable format
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Get appropriate class for label color
const getLabelClass = (color) => {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
    green: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300',
    red: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
    orange: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300',
    cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300',
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
  }
  
  return colorMap[color] || colorMap.default
}
</script>