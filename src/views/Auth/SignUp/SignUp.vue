<script>

export const description
  = 'A simple login form with email and password. The submit button says \'Sign in\'.'
export const iframeHeight = '600px'
export const containerClass = 'w-full h-screen flex items-center justify-center px-4'

</script>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth.js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import states from '@/assets/states.json'

const router = useRouter()
const { register, loading, error, clearError } = useAuth()

// Form data
const formData = ref({
  fullName: '',
  email: '',
  mobile: '',
  gender: '',
  govtIDNumber: '',
  govtIDPhoto: '',
  photo: '',
  alternatePhoneNumber: '',
  dutyState: '',
  department: '',
  designation: '',
  placeOfDuty: '',
  supervisorName: '',
  applicationType: '',
  organizationID: '',
  deviceID: 'device-123', // Default device ID
  verificationStatus: 'Pending',
  verificationVideo: '',
  oldPhoneNumbers: [],
  oldDevices: [],
  payments: [],
  subscriptions: []
})

const genders = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
]

const handleSignUp = async () => {
  console.log('Sign up clicked!')
  console.log('Form data:', formData.value)
  
  // Validate required fields
  if (!formData.value.fullName || !formData.value.email || !formData.value.mobile) {
    alert('Please fill in all required fields')
    return
  }

  try {
    console.log('Calling register...')
    await register(formData.value)
    console.log('Registration successful!')
    alert('Registration successful! Please login.')
    router.push('/login')
    clearError()
  } catch (err) {
    console.error('Failed to register:', err)
    alert(`Error: ${err.message}`)
  }
}
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
            <Input id="fullname" v-model="formData.fullName" type="text" placeholder="rahul sharma" required />
          </div>

          <!-- Email -->
          <div class="flex flex-col">
            <Label for="email" class="mb-1 font-semibold">Email</Label>
            <Input id="email" v-model="formData.email" type="email" placeholder="m@example.com" required />
          </div>

          <!-- Mobile Number -->
          <div class="flex flex-col">
            <Label for="mobile" class="mb-1 font-semibold">Mobile Number</Label>
            <Input id="mobile" v-model="formData.mobile" type="tel" placeholder="+91 xxxxxxxxx" required />
          </div>

          <!-- Gender -->
          <div class="flex flex-col">
            <Label for="gender" class="mb-1 font-semibold">Gender</Label>
            <Select v-model="formData.gender">
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
            <Input id="govnum" v-model="formData.govtIDNumber" type="text" placeholder="ABC1234567" required />
          </div>

          <!-- Government ID Photo -->
          <div class="flex flex-col">
            <Label for="govpic" class="mb-1 font-semibold">Government ID Photo</Label>
            <Input id="govpic" type="file" @change="(e) => formData.govtIDPhoto = e.target.files[0]" />
          </div>

          <!-- Photo -->
          <div class="flex flex-col">
            <Label for="photo" class="mb-1 font-semibold">Photo</Label>
            <Input id="photo" type="file" @change="(e) => formData.photo = e.target.files[0]" />
          </div>

          <!-- Alternate Number -->
          <div class="flex flex-col">
            <Label for="altnum" class="mb-1 font-semibold">Alternate Number</Label>
            <Input id="altnum" v-model="formData.alternatePhoneNumber" type="tel" placeholder="+91 xxxxxxxxx" required />
          </div>

          <!-- Duty State -->
          <div class="flex flex-col">
            <Label for="duty_state" class="mb-1 font-semibold">Duty State</Label>
            <Select v-model="formData.dutyState">
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
            <Input id="department" v-model="formData.department" type="text" placeholder="Enter Department" required />
          </div>

          <!-- Designation -->
          <div class="flex flex-col">
            <Label for="designation" class="mb-1 font-semibold">Designation</Label>
            <Input id="designation" v-model="formData.designation" type="text" placeholder="Enter Designation" required />
          </div>

          <!-- Place of Duty -->
          <div class="flex flex-col">
            <Label for="place_of_duty" class="mb-1 font-semibold">Place of Duty</Label>
            <Input id="place_of_duty" v-model="formData.placeOfDuty" type="text" placeholder="Enter Place of Duty" required />
          </div>

          <!-- Supervisor Name -->
          <div class="flex flex-col">
            <Label for="supervisor_name" class="mb-1 font-semibold">Supervisor Name</Label>
            <Input id="supervisor_name" v-model="formData.supervisorName" type="text" placeholder="Enter Supervisor Name" required />
          </div>

          <!-- Application Type -->
          <div class="flex flex-col">
            <Label for="application_type" class="mb-1 font-semibold">Application Type</Label>
            <Select v-model="formData.applicationType">
              <SelectTrigger>
                <SelectValue placeholder="Select Application Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Individual">Individual</SelectItem>
                  <SelectItem value="Organization">Organization</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <!-- Organization Code -->
          <div class="flex flex-col">
            <Label for="organization_code" class="mb-1 font-semibold">Organization Code</Label>
            <Input id="organization_code" v-model="formData.organizationID" type="text" placeholder="Enter Organization Code" />
          </div>
        </div>
      </CardContent>

      <CardFooter class="mt-6">
        <Button 
          class="w-full py-3 text-lg" 
          @click="handleSignUp"
          :disabled="loading"
        >
          {{ loading ? 'Loading...' : 'Sign Up' }}
        </Button>
      </CardFooter>
      
      <!-- Error Display -->
      <div v-if="error" class="px-6 pb-4">
        <div class="text-red-500 text-sm">{{ error }}</div>
      </div>
    </Card>


  </div>

</template>
