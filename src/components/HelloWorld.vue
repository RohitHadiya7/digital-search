<script setup>
import AppSidebar from '../layouts/appSidebar.vue'
import mainHeader from '@/layouts/header.vue'
import mainFooter from '@/layouts/footer.vue'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
</script>

<template>
  <div class="flex flex-col">
    <header class="sticky top-0 z-50 bg-white shadow-lg">
      <mainHeader />
    </header>
    <SidebarProvider>
      <div class="flex flex-1">
        <!-- <AppSidebar /> -->
        <SidebarInset class="flex-1">
          <div class=" mx-4 my-2 h-[calc(100vh-7rem)] overflow-auto border rounded">
            <router-view />
          </div>
          <div class="px-3">
            <mainFooter />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
   
  </div>

</template>
