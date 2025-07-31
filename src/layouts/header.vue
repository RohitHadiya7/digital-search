<script setup>
import {
     Cctv , CircleUser, ChartNetwork,
     Grid2x2,MapPin,Undo2,Redo2,ZoomIn,
     Bookmark,Link,Group,SquareDashedMousePointer,
     Scan,Waypoints,Settings,SquareArrowOutUpRight,Trash2, 
     LogOut
    } from 'lucide-vue-next';

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'

//logout
import { useAuth } from '@/composables/useAuth'
const { logout } = useAuth()

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode()
</script>
<template>
    <div class="w-full text-white flex  items-center justify-between bg-gray-700 px-2 pt-1">
        <div class="flex gap-2"><span><Cctv style="stroke-width: 2px;"/></span>Crime Wall</div>
        <div>
            <Tabs default-value="Graph" class="w-[350px]">
                <TabsList class="grid w-full grid-cols-3 bg-gray-900">
                  <TabsTrigger value="Graph" class="hover: cursor-pointer text-gray-400">
                    <span><ChartNetwork /></span>Graph
                  </TabsTrigger>
                  <TabsTrigger value="Table" class="hover: cursor-pointer text-gray-400">
                    <span><Grid2x2 /></span>Table
                  </TabsTrigger>
                  <TabsTrigger value="Map" class="hover: cursor-pointer text-gray-400">
                    <span><MapPin /></span>Map
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="Graph">
                </TabsContent>
                <TabsContent value="Table">
                </TabsContent>
                <TabsContent value="Map">
                </TabsContent>
            </Tabs>
        </div>
        <div class="flex gap-2">
            <!-- theme dropdown -->
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="outline" class="rounded-full bg-transperant hover: cursor-pointer">
                    <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span class="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem @click="mode = 'light'">
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="mode = 'dark'">
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="mode = 'auto'">
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <!-- User profile -->
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline" class="rounded-full bg-transperant hover: cursor-pointer">
                      <CircleUser />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem @click="">
                    User Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="">
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="logout">
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
    <div class="w-full flex  items-center justify-center py-4 bg-black">
        <!-- icon buttons -->
        <div class="flex justify-center items-center">
        <div class="flex h-5 items-center space-x-4 text-sm">
            <div class="flex gap-2">
                <Button class="hover: cursor-pointer">
                    <Undo2 />
                </Button>
                <Button class=" hover: cursor-pointer p-0">
                    <Redo2 />
                </Button>
            </div>
            <Separator orientation="vertical" />
            <div class="flex gap-2">
                <Button class="hover: cursor-pointer p-0">
                    <ZoomIn />
                </Button>
                <Button class="hover: cursor-pointer p-0">
                    <Bookmark />
                </Button>
                <Button class="hover: cursor-pointer p-0">
                    <Link />
                </Button>
                <Button class="hover: cursor-pointer p-0">
                    <Group />
                </Button>
            </div>
            <Separator orientation="vertical" />
            <div class="flex gap-2">
                <Button class="hover: cursor-pointer p-0">
                    <SquareDashedMousePointer />
                </Button>
                <Button class="hover: cursor-pointer p-0">
                    <Scan />
                </Button>
                <Button class="hover: cursor-pointer p-0">
                    <Waypoints />
                </Button>
                <Button class="hover: cursor-pointer p-0">
                    <Settings />
                </Button>
            </div>
            <Separator orientation="vertical" />
            <div>
              <Button class="hover: cursor-pointer p-0">
                  <SquareArrowOutUpRight />
              </Button>
            </div>
            <Separator orientation="vertical" />
            <div>
              <Button class="hover: cursor-pointer p-0">
                  <Trash2 />
              </Button>
            </div>
        </div>
        </div>
    </div>
</template>