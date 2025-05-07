<script setup>
import AppSidebar from '../layouts/appSidebar.vue'
import mainHeader from './header.vue'
import mainFooter from './footer.vue'
// import { Separator } from '@/components/ui/separator'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar'
</script>

<template>
    <div class="">
        <!-- <div class="sticky top-0 z-50 bg-white shadow-lg">
            <mainHeader></mainHeader>
        </div> -->

        <div class="mt-10">
            <SidebarProvider >
                <AppSidebar class="mt-16"/>
                <SidebarInset>
                    <header class="flex sticky top-0 bg-background h-8 shrink-0 items-center px-4">
                        <SidebarTrigger class="ml-1" />
                        <!-- <Separator orientation="vertical" class="mr-2 h-4" /> -->
                    </header>
                </SidebarInset>
            </SidebarProvider>
        </div>
        <!-- <div>
            <mainFooter></mainFooter>
        </div> -->
    </div>
</template>
