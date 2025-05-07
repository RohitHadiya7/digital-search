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
        <AppSidebar />
        <SidebarInset class="flex-1">
          <div class="p-3 m-3 h-[calc(100vh-10rem)] border">
            <router-view />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
    <mainFooter />
  </div>

</template>
