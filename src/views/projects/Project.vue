<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
    <!-- Header -->
    <!-- <header
      class="sticky top-0 z-10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div class="container flex items-center justify-between h-14 px-4">
        <div class="flex items-center gap-2">
          <div class="flex items-center justify-center w-8 h-8 rounded bg-primary text-primary-foreground">
            <LayoutGridIcon class="w-5 h-5" />
          </div>
          <h1 class="text-xl font-semibold">Project Dashboard</h1>
        </div>
        <div class="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Add Project">
            <PlusIcon class="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <BellIcon class="w-5 h-5" />
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header> -->

    <!-- Board -->
    <main class="container p-4">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-2">
          <h2 class="text-2xl font-bold">Marketing Campaign</h2>
          <Badge variant="outline" class="ml-2">Active</Badge>
        </div>
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FilterIcon class="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <UsersIcon class="w-4 h-4 mr-2" />
            Team
          </Button>
        </div>
      </div>

      <!-- Board columns -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-x-auto pb-8">
        <div v-for="column in columns" :key="column.id"
          class="min-w-[300px] bg-slate-50 dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col">
          <div class="p-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
            <div class="flex items-center gap-2">
              <h3 class="font-medium">{{ column.title }}</h3>
              <Badge>{{ getColumnCards(column.id).length }}</Badge>
            </div>
            <Button variant="ghost" size="icon" class="h-8 w-8" aria-label="Column Options">
              <MoreHorizontalIcon class="w-4 h-4" />
            </Button>
          </div>

          <VueDraggableNext
            :list="getColumnCards(column.id)"
            group="columns"
            item-key="id"
            class="p-3 space-y-3 flex-grow min-h-[100px]"
            ghost-class="ghost-card"
            drag-class="dragging-card"
            @change="(eventData) => handleCardChange(eventData, column.id)"
          >
            <template #item="{ element }">
              <Card :card="element" class="cursor-grab active:cursor-grabbing mb-3" /> <!-- Added mb-3 for spacing if not handled by space-y-3 effectively -->
            </template>
          </VueDraggableNext>

          <div class="p-3 border-t border-slate-200 dark:border-slate-800 mt-auto">
            <Button variant="ghost" class="w-full justify-start text-muted-foreground">
              <PlusIcon class="w-4 h-4 mr-2" />
              Add a card
            </Button>
          </div>
        </div>

        <div class="min-w-[300px]">
          <Button variant="outline" class="w-full justify-start h-12 border-dashed">
            <PlusIcon class="w-4 h-4 mr-2" />
            Add another list
          </Button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next';

import {
  BellIcon,
  FilterIcon,
  LayoutGridIcon,
  MoreHorizontalIcon,
  PlusIcon,
  UsersIcon
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Card from '@/components/Card.vue'

const columns = ref([
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' }
])

const cards = ref([
  {
    id: 'card-1',
    columnId: 'todo',
    title: 'Research competitor strategies',
    description: 'Analyze top 5 competitors and their marketing approaches',
    labels: [{ text: 'Research', color: 'bg-blue-500' }],
    dueDate: '2023-05-20',
    members: ['user1']
  },
  {
    id: 'card-2',
    columnId: 'todo',
    title: 'Create social media calendar',
    description: 'Plan content for next month across all platforms',
    labels: [{ text: 'Planning', color: 'bg-green-500' }],
    dueDate: '2023-05-22',
    members: ['user2', 'user3']
  },
  {
    id: 'card-3',
    columnId: 'inprogress',
    title: 'Design new landing page',
    description: 'Create mockups for the product launch page',
    labels: [{ text: 'Design', color: 'bg-purple-500' }, { text: 'High Priority', color: 'bg-red-500' }],
    dueDate: '2023-05-18',
    members: ['user1', 'user4']
  },
  {
    id: 'card-4',
    columnId: 'inprogress',
    title: 'Write email campaign copy',
    description: 'Draft copy for the 5-email nurture sequence',
    labels: [{ text: 'Content', color: 'bg-yellow-500' }],
    dueDate: '2023-05-19',
    members: ['user2']
  },
  {
    id: 'card-5',
    columnId: 'review',
    title: 'Review ad performance',
    description: 'Analyze metrics from last month\'s campaign',
    labels: [{ text: 'Analytics', color: 'bg-orange-500' }],
    dueDate: '2023-05-15',
    members: ['user3', 'user4']
  },
  {
    id: 'card-6',
    columnId: 'done',
    title: 'Update brand guidelines',
    description: 'Finalize the new brand voice document',
    labels: [{ text: 'Branding', color: 'bg-cyan-500' }],
    dueDate: '2023-05-10',
    members: ['user1', 'user2']
  }
])

const getColumnCards = (columnId) => {
  return cards.value.filter(card => card.columnId === columnId);
}

const handleCardChange = (eventData, targetColumnId) => {
  console.log('handleCardChange triggered:', eventData, 'targetColumnId:', targetColumnId); // For debugging

  if (eventData.added) {
    const addedCardProxy = eventData.added.element;
    const cardInMainArray = cards.value.find(c => c.id === addedCardProxy.id);

    if (cardInMainArray) {
      if (cardInMainArray.columnId !== targetColumnId) {
        cardInMainArray.columnId = targetColumnId;
        console.log(`Card '${cardInMainArray.title}' (ID: ${cardInMainArray.id}) columnId updated to '${targetColumnId}'`);
      }
    } else {
      console.warn("Could not find added card in main cards array. Card ID:", addedCardProxy.id);
    }
  } else if (eventData.moved) {
    // Handle reordering within the same list if necessary
    // For now, we are primarily concerned with changing columnId when moved to a new list
    console.log('Card moved within the same list:', eventData.moved.element.title);
  } else if (eventData.removed) {
    console.log('Card removed from a list:', eventData.removed.element.title);
  }
}
</script>

<style scoped>
.ghost-card {
  @reference opacity-50 bg-slate-300 dark:bg-slate-700 rounded-lg;
}
.dragging-card {
  @reference shadow-2xl opacity-100 scale-105;
}

.space-y-3:empty::after {
  content: 'Drag cards here';
  @reference block text-center text-sm text-slate-400 dark:text-slate-600 py-4;
}

/* Ensure cards have some margin if space-y-3 isn't sufficient or overridden */
/* .mb-3 on Card component in template is an alternative */
/* :deep(.card-item-class) { */
  /* margin-bottom: 0.75rem;  */
/* } */

</style>