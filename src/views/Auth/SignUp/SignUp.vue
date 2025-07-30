<script>

export const description
  = 'A simple login form with email and password. The submit button says \'Sign in\'.'
export const iframeHeight = '600px'
export const containerClass = 'w-full h-screen flex items-center justify-center px-4'

</script>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth.js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  PinInput,
  PinInputGroup,
  PinInputSlot
} from '@/components/ui/pin-input'
import states from '@/assets/states.json'

// pre defined data for user-registration.
import { useDropdowns } from '@/composables/useDropdowns';
const { rawData, loading: dropdownLoading, error: dropdownError } = useDropdowns()


const selectedOrganizationId = ref('')
const selectedDepartmentId = ref('')
const selectedDesignation = ref('')

const filteredDepartments = computed(() => {
  return rawData.value.departments.filter(
    dept => dept.organizationId === selectedOrganizationId.value
  )
})

const filteredDesignations = computed(() => {
  return rawData.value.designations.filter(
    des => des.departmentId === selectedDepartmentId.value
  )
})

const router = useRouter()
const { sendRegistrationOTP, verifyRegistrationOTP, register, loading, error, clearError } = useAuth()

const step = ref(1)
const phoneNumber = ref('')
const deviceId = ref('')
const otpArray = ref([])
const verifiedPhoneNumber = ref('')


const formData = ref({
  fullName: '',
  email: '',
  phoneNumber: '',
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
  deviceID: '',
  isActive: false
})

const genders = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
]


const handleFileUpload = (event, fieldName) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.value[fieldName] = e.target.result
      console.log(`${fieldName} uploaded as base64`)
    }
    reader.readAsDataURL(file)
  } else {
    formData.value[fieldName] = ''
  }
}

//Send OTP for phone verification
const handleSendOtp = async () => {
  console.log('Send OTP clicked!')
  console.log('Phone:', phoneNumber.value)
  console.log('Device ID:', deviceId.value)

  if (!phoneNumber.value || !deviceId.value) {
    alert('Please fill in phone number and device ID')
    return
  }



  try {
    await sendRegistrationOTP(phoneNumber.value, deviceId.value)
    verifiedPhoneNumber.value = phoneNumber.value
    step.value = 2
    clearError()
  } catch (err) {
    alert(`Error: ${err.message}`)
  }
}

// Verify OTP
const handleVerifyOtp = async () => {
  const fullOtp = otpArray.value.join('')

  if (!fullOtp || !deviceId.value) {
    alert('Please enter OTP and device ID')
    return
  }

  try {
    await verifyRegistrationOTP(fullOtp, deviceId.value)
    step.value = 3
    clearError()
  } catch (err) {
    alert(`Error: ${err.message}`)
  }
}

// Complete registration
const handleRegister = async () => {
  formData.value.phoneNumber = verifiedPhoneNumber.value
  formData.value.deviceID = deviceId.value

  formData.value.organizationID = selectedOrganizationId.value
  formData.value.department = rawData.value.departments.find(d => d._id === selectedDepartmentId.value)?.name || ''
  formData.value.designation = selectedDesignation.value
  
  if (!formData.value.fullName || !formData.value.email || !formData.value.phoneNumber) {
    alert('Please fill in all required fields')
    return
  }

  if (formData.value.phoneNumber !== verifiedPhoneNumber.value || formData.value.deviceID !== deviceId.value) {
    alert('Phone number and device ID must match the verified OTP')
    return
  }

  try {

    const cleanData = { ...formData.value }

    if (!cleanData.govtIDPhoto || cleanData.govtIDPhoto === '') {
      cleanData.govtIDPhoto = 'pending'
    }
    if (!cleanData.photo || cleanData.photo === '') {
      cleanData.photo = 'pending'
    }

    const optionalFields = ['organizationID']
    Object.keys(cleanData).forEach(key => {
      if (cleanData[key] === '' && optionalFields.includes(key)) {
        delete cleanData[key]
      }
    })
    console.log('subbmitting data',cleanData);

    await register(cleanData)
    alert('Registration successful! Please login.')
    router.push('/login')
    clearError()
  } catch (err) {
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
          <span v-if="step === 1">Enter your phone number and device ID to receive OTP.</span>
          <span v-else-if="step === 2">Enter the OTP sent to your number.</span>
          <span v-else>Complete your registration details.</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <!-- Step 1: Phone Number & Device ID -->
        <template v-if="step === 1">
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="phone">Phone Number</Label>
              <Input id="phone" v-model="phoneNumber" placeholder="+91 xxxxxxxx" type="tel" required />
            </div>
            <div class="grid gap-2">
              <Label for="device">Device ID</Label>
              <Input id="device" v-model="deviceId" placeholder="Device ID" type="text" required />
            </div>
          </div>
        </template>

        <!-- Step 2: OTP Verification -->
        <template v-else-if="step === 2">
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="otp">OTP</Label>
              <PinInput id="otp" v-model="otpArray" placeholder="○" @complete="handleVerifyOtp" class="w-full">
                <PinInputGroup class="w-full">
                  <PinInputSlot v-for="(_, index) in 6" :key="index" :index="index" class="w-full" />
                </PinInputGroup>
              </PinInput>
            </div>
            <div class="grid gap-2">
              <Label for="device">Device ID</Label>
              <Input id="device" v-model="deviceId" placeholder="Device ID" type="text" required />
            </div>
          </div>
        </template>

        <!-- Step 3: Registration Form -->
        <template v-else>
          <!-- Verified Info Display -->
          <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 class="text-sm font-semibold text-green-800 mb-2">✓ Verified Information</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="font-medium text-gray-600">Phone Number:</span>
                <span class="ml-2 text-green-700">{{ phoneNumber }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-600">Device ID:</span>
                <span class="ml-2 text-green-700">{{ deviceId }}</span>
              </div>
            </div>
          </div>

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

            <!-- Mobile Number (Verified - Read Only) -->
            <div class="flex flex-col">
              <Label for="mobile" class="mb-1 font-semibold">Mobile Number (Verified)</Label>
              <Input id="mobile" :value="verifiedPhoneNumber" type="tel" disabled class="bg-gray-100" />
              <small class="text-gray-500 text-xs mt-1">This phone number was verified via OTP</small>
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
              <Input id="govpic" type="file" accept="image/*" @change="handleFileUpload($event, 'govtIDPhoto')" />
            </div>

            <!-- Photo -->
            <div class="flex flex-col">
              <Label for="photo" class="mb-1 font-semibold">Photo</Label>
              <Input id="photo" type="file" accept="image/*" @change="handleFileUpload($event, 'photo')" />
            </div>

            <!-- Alternate Number -->
            <div class="flex flex-col">
              <Label for="altnum" class="mb-1 font-semibold">Alternate Number</Label>
              <Input id="altnum" v-model="formData.alternatePhoneNumber" type="tel" placeholder="+91 xxxxxxxxx"
                required />
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
                    <SelectItem v-for="state in rawData.states" :key="state._id" :value="state.name">
                      {{ state.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <!-- Organization -->
            <div class="flex flex-col">
              <Label for="organization" class="mb-1 font-semibold">Organization</Label>
              <Select v-model="selectedOrganizationId">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select Organization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="org in rawData.organizations" :key="org._id" :value="org._id">
                      {{ org.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <!-- Department -->
            <div class="flex flex-col">
              <Label for="department" class="mb-1 font-semibold">Department</Label>
              <Select v-model="selectedDepartmentId" :disabled="!selectedOrganizationId">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="dept in filteredDepartments" :key="dept._id" :value="dept._id">
                      {{ dept.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <!-- Designation -->
            <div class="flex flex-col">
              <Label for="designation" class="mb-1 font-semibold">Designation</Label>
              <Select v-model="selectedDesignation" :disabled="!selectedDepartmentId">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select Designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="des in filteredDesignations" :key="des._id" :value="des.name">
                      {{ des.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <!-- Place of Duty -->
            <div class="flex flex-col">
              <Label for="place_of_duty" class="mb-1 font-semibold">Place of Duty</Label>
              <Input id="place_of_duty" v-model="formData.placeOfDuty" type="text" placeholder="Enter Place of Duty"
                required />
            </div>

            <!-- Supervisor Name -->
            <div class="flex flex-col">
              <Label for="supervisor_name" class="mb-1 font-semibold">Supervisor Name</Label>
              <Input id="supervisor_name" v-model="formData.supervisorName" type="text"
                placeholder="Enter Supervisor Name" required />
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
            <!-- <div class="flex flex-col">
            <Label for="organization_code" class="mb-1 font-semibold">Organization Code</Label>
            <Input id="organization_code" v-model="formData.organizationID" type="text" placeholder="Enter Organization Code" />
          </div> -->
          </div>
        </template>
      </CardContent>

      <CardFooter class="mt-6">
        <Button class="w-full py-3 text-lg"
          @click="step === 1 ? handleSendOtp() : step === 2 ? handleVerifyOtp() : handleRegister()" :disabled="loading">
          {{ loading ? 'Loading...' : (step === 1 ? 'Send OTP' : step === 2 ? 'Verify OTP' : 'Complete Registration') }}
        </Button>
      </CardFooter>

      <!-- Error Display -->
      <div v-if="error" class="px-6 pb-4">
        <div class="text-red-500 text-sm">{{ error }}</div>
      </div>
    </Card>


  </div>

</template>
