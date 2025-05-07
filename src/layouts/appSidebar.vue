<script setup>
import SearchForm from '@/layouts/searchForm.vue'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

import {
  ChevronRight,
  FileText,
  Folder,
  Code2,
  Layers,
  Settings,
  BookOpenText,
  Users,
  User,
} from 'lucide-vue-next'

const props = defineProps()

const data = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
  navMain: [
    { type: 'section', title: 'Objects' },
    {
      title: 'Most Popular',
      icon: Layers,
      items: [
        { title: 'YouTube', url: '#', icon: FileText },
        { title: 'Recently Used', url: '#', icon: Folder },
        { title: '18+', url: '#', icon: Code2 },
      ],
    },
    {
      title: 'Recently used',
      icon: Settings,
      items: [
        { title: 'Routing', url: '#', icon: FileText },
        { title: 'Data Fetching', url: '#', icon: FileText },
        { title: 'Rendering', url: '#', icon: FileText },
      ],
    },
    {
      title: '18+',
      icon: User,
      items: [
        { title: 'Routing', url: '#', icon: FileText },
        { title: 'Data Fetching', url: '#', icon: FileText },
        { title: 'Rendering', url: '#', icon: FileText },
      ],
    },
    {
      title: 'Audio hosting platforms',
      icon: Folder,
      items: [
        { title: 'Routing', url: '#', icon: FileText },
        { title: 'Data Fetching', url: '#', icon: FileText },
        { title: 'Rendering', url: '#', icon: FileText },
      ],
    },
    {
      title: 'Blockchain',
      icon: Folder,
      items: [
        { title: 'Routing', url: '#', icon: FileText },
        { title: 'Data Fetching', url: '#', icon: FileText },
        { title: 'Rendering', url: '#', icon: FileText },
      ],
    },
    {
      title: 'Blogging platforms',
      icon: Folder,
      items: [
        { title: 'Routing', url: '#', icon: FileText },
        { title: 'Data Fetching', url: '#', icon: FileText },
        { title: 'Rendering', url: '#', icon: FileText },
      ],
    },
    {
      title: 'Darknet',
      icon: Folder,
      items: [
        { title: 'Routing', url: '#', icon: FileText },
        { title: 'Data Fetching', url: '#', icon: FileText },
        { title: 'Rendering', url: '#', icon: FileText },
      ],
    },
    {
      title: 'Data leaks',
      icon: Folder,
      items: [
        { title: 'Routing', url: '#', icon: FileText },
        { title: 'Data Fetching', url: '#', icon: FileText },
        { title: 'Rendering', url: '#', icon: FileText },
      ],
    },
    {
      title: 'Dating',
      icon: Folder,
      items: [
        { title: 'Routing', url: '#', icon: FileText },
        { title: 'Data Fetching', url: '#', icon: FileText },
        { title: 'Rendering', url: '#', icon: FileText },
      ],
    },
    {
      title: 'Digital Network',
      icon: Folder,
      items: [
        { title: 'Routing', url: '#', icon: FileText },
        { title: 'Data Fetching', url: '#', icon: FileText },
        { title: 'Rendering', url: '#', icon: FileText },
      ],
    },
    {
      title: 'Email service providers',
      icon: Folder,
      items: [
        { title: 'Routing', url: '#', icon: FileText },
        { title: 'Data Fetching', url: '#', icon: FileText },
        { title: 'Rendering', url: '#', icon: FileText },
      ],
    },
    {
      title: 'File hosting platforms',
      icon: Folder,
      items: [
        { title: 'Routing', url: '#', icon: FileText },
        { title: 'Data Fetching', url: '#', icon: FileText },
        { title: 'Rendering', url: '#', icon: FileText },
      ],
    },
    {
      title: 'General',
      icon: Folder,
      items: [
        { title: 'Routing', url: '#', icon: FileText },
        { title: 'Data Fetching', url: '#', icon: FileText },
        { title: 'Rendering', url: '#', icon: FileText },
      ],
    },
    {
      title: 'Image hosting platforms',
      icon: Folder,
      items: [
        { title: 'Routing', url: '#', icon: FileText },
        { title: 'Data Fetching', url: '#', icon: FileText },
        { title: 'Rendering', url: '#', icon: FileText },
      ],
    },
    { type: 'section', title: 'Connections' },
    {
      title: 'Most popular',
      icon: Folder,
      items: [
        { title: 'Components', url: '#', icon: FileText },
        { title: 'File Conventions', url: '#', icon: FileText },
      ],
    },
    {
      title: 'General',
      icon: Folder,
      items: [
        { title: 'Contribution Guide', url: '#', icon: FileText },
      ],
    },
    {
      title: 'Messengers',
      icon: Folder,
      items: [
        { title: 'Contribution Guide', url: '#', icon: FileText },
      ],
    },
    {
      title: 'Other',
      icon: Folder,
      items: [
        { title: 'Contribution Guide', url: '#', icon: FileText },
      ],
    },
    {
      title: 'Registers',
      icon: Folder,
      items: [
        { title: 'Contribution Guide', url: '#', icon: FileText },
      ],
    },
    {
      title: 'Social networks',
      icon: Folder,
      items: [
        { title: 'Contribution Guide', url: '#', icon: FileText },
      ],
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props" class="pt-20"> 
    <SidebarHeader class="p-0">
      <strong class="ml-2 text-2xl">Elements</strong>
      <SearchForm />
    </SidebarHeader>

    <SidebarContent class="gap-0">
      <template v-for="item in data.navMain" :key="item.title">
        <!-- Section Title -->
        <SidebarGroupLabel
          v-if="item.type === 'section'"
          class="px-4 pt-4 pb-2 text-xs font-medium uppercase text-muted-foreground"
        >
          {{ item.title }}
        </SidebarGroupLabel>

        <!-- Collapsible Group -->
        <Collapsible v-else default-close class="group/collapsible">
          <SidebarGroup class="py-0 pl-4">
            <SidebarGroupLabel as-child
              class="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <CollapsibleTrigger class="flex items-center gap-2">
                <component
                  :is="item.icon"
                  v-if="item.icon"
                  class="w-4 h-4 text-muted-foreground"
                />
                {{ item.title }}
                <ChevronRight
                  class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                />
              </CollapsibleTrigger>
            </SidebarGroupLabel>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem
                    v-for="childItem in item.items"
                    :key="childItem.title"
                  >
                    <SidebarMenuButton
                      as-child
                      :is-active="childItem.isActive"
                      class="flex items-center gap-2"
                    >
                      <a :href="childItem.url" class="flex items-center gap-2 pl-6">
                        <component
                          :is="childItem.icon"
                          class="w-4 h-4 text-muted-foreground"
                          v-if="childItem.icon"
                        />
                        {{ childItem.title }}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </template>
    </SidebarContent>

    <SidebarRail />
  </Sidebar>
</template>
