<script>

export const description
  = 'A simple login form with email and password. The submit button says \'Sign in\'.'
export const iframeHeight = '600px'
export const containerClass = 'w-full h-screen flex items-center justify-center px-4'

</script>

<script setup>

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'vue-router'
import states from '@/assets/states.json'


const router = useRouter()

const handleSignUp = () => {
  router.push('/login')
}

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]


</script>

<template>

  <div class="min-h-screen flex justify-center items-center">

    <Card class="w-full max-w-xl max-h-[90vh] overflow-y-auto p-8">
      <CardHeader>
        <CardTitle class="text-3xl mb-2">Sign Up</CardTitle>
        <CardDescription class="mb-6">
          Sign up by providing your details
        </CardDescription>
      </CardHeader>

      <CardContent>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <!-- Full Name -->
          <div class="flex flex-col">
            <Label for="fullname" class="mb-1 font-semibold">Full Name</Label>
            <Input id="fullname" type="text" placeholder="rahul sharma" required />
          </div>

          <!-- Email -->
          <div class="flex flex-col">
            <Label for="email" class="mb-1 font-semibold">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>

          <!-- Gender -->
          <div class="flex flex-col">
            <Label for="gender" class="mb-1 font-semibold">Gender</Label>
            <Select>
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="gender in genders" :key="gender.value" :value="gender.value">
                    {{ gender.label }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <!-- Government ID Number -->
          <div class="flex flex-col">
            <Label for="govnum" class="mb-1 font-semibold">Government ID Number</Label>
            <Input id="govnum" type="number" placeholder="+91 xxxxxxxxx" required />
          </div>

          <!-- Government ID Photo -->
          <div class="flex flex-col">
            <Label for="govpic" class="mb-1 font-semibold">Government ID Photo</Label>
            <Input id="govpic" type="file" />
          </div>

          <!-- Photo -->
          <div class="flex flex-col">
            <Label for="photo" class="mb-1 font-semibold">Photo</Label>
            <Input id="photo" type="file" />
          </div>

          <!-- Alternate Number -->
          <div class="flex flex-col">
            <Label for="altnum" class="mb-1 font-semibold">Alternate Number</Label>
            <Input id="altnum" type="number" placeholder="+91 xxxxxxxxx" required />
          </div>

          <!-- Duty State -->
          <div class="flex flex-col">
            <Label for="duty_state" class="mb-1 font-semibold">Duty State</Label>
            <Select>
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a State" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="state in states" :key="state.value" :value="state.value">
                    {{ state.label }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <!-- Department -->
          <div class="flex flex-col">
            <Label for="department" class="mb-1 font-semibold">Department</Label>
            <Input id="department" type="text" placeholder="Enter Department" required />
          </div>

          <!-- Designation -->
          <div class="flex flex-col">
            <Label for="designation" class="mb-1 font-semibold">Designation</Label>
            <Input id="designation" type="text" placeholder="Enter Designation" required />
          </div>

          <!-- Place of Duty -->
          <div class="flex flex-col">
            <Label for="place_of_duty" class="mb-1 font-semibold">Place of Duty</Label>
            <Input id="place_of_duty" type="text" placeholder="Enter Place of Duty" required />
          </div>

          <!-- Supervisor Name -->
          <div class="flex flex-col">
            <Label for="supervisor_name" class="mb-1 font-semibold">Supervisor Name</Label>
            <Input id="supervisor_name" type="text" placeholder="Enter Supervisor Name" required />
          </div>

          <!-- Application Type -->
          <div class="flex flex-col">
            <Label for="application_type" class="mb-1 font-semibold">Application Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Application Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <!-- Organization Code -->
          <div class="flex flex-col">
            <Label for="organization_code" class="mb-1 font-semibold">Organization Code</Label>
            <Input id="organization_code" type="text" placeholder="Enter Organization Code" />
          </div>
        </div>
      </CardContent>

      <CardFooter class="mt-6">
        <Button class="w-full py-3 text-lg" @click="handleSignUp">Sign in</Button>
      </CardFooter>
    </Card>


  </div>

</template>
