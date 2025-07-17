<template>
  <div class="font-sans mx-auto p-5 text-slate-800 bg-white">
    <!-- Header with close button -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold m-0">Most popular templates</h2>
    </div>

    <!-- Description and category selector -->
    <div class="flex items-center gap-2 mb-6 flex-wrap md:flex-nowrap">
      <p class="m-0 text-slate-800">Get going faster with a template from the Search or</p>
      <div class="relative w-full md:w-auto">
        <button
          class="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-[3px] bg-white cursor-pointer text-slate-800 text-sm min-w-[200px] justify-between hover:bg-slate-100 w-full"
          @click="toggleDropdown"
        >
          {{ selectedCategory || 'choose a category' }}
          <ChevronDownIcon class="w-4 h-4 icon" />
        </button>
        <div
          class="absolute top-full left-0 w-full bg-white border border-slate-300 rounded-[3px] shadow-md z-10 max-h-[300px] overflow-y-auto"
          v-if="dropdownOpen"
        >
          <div
            v-for="category in categories"
            :key="category"
            class="px-3 py-2 cursor-pointer hover:bg-slate-100"
            @click="selectCategory(category)"
          >
            {{ category }}
          </div>
        </div>
      </div>
    </div>

    <!-- Popular templates section -->
    <div class="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mb-4">
      <div
        v-for="template in popularTemplates"
        :key="template.id"
        class="h-[120px] rounded-[3px] bg-cover bg-center relative cursor-pointer overflow-hidden transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg"
        :style="{ backgroundImage: `url(${template.image})` }"
        @mouseenter="hoveredTemplate = template.id"
        @mouseleave="hoveredTemplate = null"
        @click="selectTemplate(template)"
      >
        <div class="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60"></div>
        <div class="absolute top-2 left-2 bg-white/80 px-1.5 py-0.5 rounded-[3px] text-xs font-medium">Template</div>
        <div class="absolute bottom-2 left-2 right-2 text-white font-semibold text-base [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">{{ template.title }}</div>
        <div
          class="absolute inset-0 bg-black/70 text-white p-4 flex flex-col justify-between"
          v-if="hoveredTemplate === template.id"
        >
          <p class="m-0 text-sm">{{ template.description }}</p>
          <button class="bg-blue-600 text-white border-none rounded-[3px] px-3 py-1.5 cursor-pointer font-medium transition-colors duration-200 ease-in-out hover:bg-blue-700 self-start">Use template</button>
        </div>
      </div>
    </div>

    <div class="mb-8">
      <a href="#" @click.prevent="browseGallery" class="text-blue-600 no-underline text-sm hover:underline">Browse the full template gallery</a>
    </div>

    <!-- Recently viewed section -->
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <ClockIcon class="w-4 h-4 icon" />
        <h3 class="text-sm font-semibold text-slate-500 m-0 uppercase tracking-wider">Recently viewed</h3>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        <div
          v-for="board in recentlyViewed"
          :key="board.id"
          class="h-[100px] rounded-[3px] bg-cover bg-center relative cursor-pointer overflow-hidden transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg"
          :style="{ backgroundImage: `url(${board.image})` }"
          @click="openBoard(board)"
        >
          <div class="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60"></div>
          <div class="absolute bottom-2 left-2 right-2 text-white font-semibold text-base [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">{{ board.title }}</div>
          <div class="absolute top-2 right-2 text-white bg-black/40 rounded-[3px] w-6 h-6 flex items-center justify-center">
            <LockIcon v-if="board.private" class="w-4 h-4 icon" />
            <UsersIcon v-else class="w-4 h-4 icon" />
          </div>
        </div>
      </div>
    </div>

    <!-- Your workspaces section -->
    <div class="mb-8">
      <h3 class="text-sm font-semibold text-slate-500 m-0 uppercase tracking-wider mb-2">YOUR WORKSPACES</h3>
      <div class="bg-slate-100 p-4 rounded-[3px] mt-2 max-w-4xl" v-if="!userWorkspaces.length">
        <p class="m-0 text-sm">You aren't a member of any workspaces yet. <a href="#" @click.prevent="createWorkspace" class="text-blue-600 no-underline font-medium hover:underline">Create a workspace</a></p>
      </div>
      <!-- Add v-else for userWorkspaces list here if needed -->
    </div>

    <!-- Guest workspaces section -->
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <h3 class="text-sm font-semibold text-slate-500 m-0 uppercase tracking-wider">GUEST WORKSPACES</h3>
        <InfoIcon class="w-4 h-4 icon text-slate-500 cursor-pointer hover:text-slate-800" />
      </div>
      
      <div v-for="workspace in guestWorkspaces" :key="workspace.id" class="mb-6">
        <div class="flex items-center gap-2 mb-3">
          <UsersIcon class="w-4 h-4 icon" />
          <span class="font-medium text-slate-800">{{ workspace.name }}</span>
        </div>
        
        <div class="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          <div
            v-for="board in workspace.boards"
            :key="board.id"
            class="h-[100px] rounded-[3px] bg-cover bg-center relative cursor-pointer overflow-hidden transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg"
            :style="{ backgroundImage: `url(${board.image})` }"
            @click="openBoard(board)"
          >
            <div class="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60"></div>
            <div class="absolute bottom-2 left-2 right-2 text-white font-semibold text-base [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">{{ board.title }}</div>
            <div class="absolute top-2 right-2 text-white bg-black/40 rounded-[3px] w-6 h-6 flex items-center justify-center">
              <LockIcon v-if="board.private" class="w-4 h-4 icon" />
              <UsersIcon v-else class="w-4 h-4 icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { XIcon, ChevronDownIcon, ClockIcon, LockIcon, UsersIcon, InfoIcon } from 'lucide-vue-next';

// State
const dropdownOpen = ref(false);
const selectedCategory = ref('');
const hoveredTemplate = ref(null);

// Data
const categories = ref([
  'Project Management',
  'Marketing',
  'HR & Operations',
  'Engineering',
  'Design',
  'Sales & CRM',
  'Education'
]);

const popularTemplates = ref([
  {
    id: 1,
    title: 'Basic Board',
    description: 'A simple board to get started with Dashboard',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'
  },
  {
    id: 2,
    title: 'Kanban Template',
    description: 'Visualize and optimize your workflow',
    image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhZGllbnQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
  },
  {
    id: 3,
    title: 'Daily Task Management',
    description: 'Organize your daily tasks efficiently',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW5zfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
  },
  {
    id: 4,
    title: 'Remote Team Hub',
    description: 'Coordinate with your remote team effectively',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjdG9yeXxlbnwwfHwwfHw%3D&w=1000&q=80'
  }
]);

const recentlyViewed = ref([
  {
    id: 1,
    title: 'ATL - Web',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW5zfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
    private: false
  },
  {
    id: 2,
    title: 'Strotpragna',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHw%3D&w=1000&q=80',
    private: true
  },
  {
    id: 3,
    title: 'Threat Intel',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHVycGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
    private: true
  }
]);

const userWorkspaces = ref([]);

const guestWorkspaces = ref([
  {
    id: 1,
    name: 'Ansh Tech Labs',
    boards: [
      {
        id: 1,
        title: 'ATL - Web',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW5zfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        private: false
      },
      {
        id: 2,
        title: 'Strotpragna',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHw%3D&w=1000&q=80',
        private: true
      },
      {
        id: 3,
        title: 'Threat Intel',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHVycGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        private: true
      }
    ]
  }
]);

// Methods
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectCategory = (category) => {
  selectedCategory.value = category;
  dropdownOpen.value = false;
  // Add logic to filter templates by category if needed
  console.log('Selected category:', category);
};

const selectTemplate = (template) => {
  console.log('Selected template:', template);
  // Implement template selection logic
};

const browseGallery = () => {
  console.log('Browse gallery clicked');
  // Implement gallery navigation
};

const openBoard = (board) => {
  console.log('Opening board:', board);
  // Implement board opening logic
};

const createWorkspace = () => {
  console.log('Create workspace clicked');
  // Implement workspace creation logic
};

</script>

