<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  PinInput,
  PinInputGroup,
  PinInputSlot
} from '@/components/ui/pin-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'

const router = useRouter()
const step = ref(1)
const phoneNumber = ref('')
const deviceId = ref('')
const otpArray = ref([])

const handleSendOtp = () => {
  step.value = 2
}

const handleVerifyOtp = () => {
  const fullOtp = otpArray.value.join('')
  console.log('OTP:', fullOtp, 'Device ID:', deviceId.value)
  router.push('/project')
}
</script>

<template>
  <div class="min-h-screen flex justify-center items-center px-4">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>
          <span v-if="step === 1">Enter your phone number to receive OTP.</span>
          <span v-else>Enter the OTP sent to your number.</span>
        </CardDescription>
      </CardHeader>

      <CardContent class="grid gap-4">
        <!-- Step 1 -->
        <template v-if="step === 1">
          <div class="grid gap-2">
            <Label for="phone">Phone Number</Label>
            <Input id="phone" v-model="phoneNumber" placeholder="+91 xxxxxxxx" type="tel" required />
          </div>
          <div class="grid gap-2">
            <Label for="device">Device ID</Label>
            <Input id="device" v-model="deviceId" placeholder="Device ID" type="text" required />
          </div>
        </template>

        <!-- Step 2 -->
        <template v-else>
          <div class="grid gap-2">
            <Label for="otp">OTP</Label>
            <PinInput
              id="otp"
              v-model="otpArray"
              placeholder="○"
              @complete="handleVerifyOtp"
              class="w-full"
            >
              <PinInputGroup class="w-full">
                <PinInputSlot
                  v-for="(_, index) in 5"
                  :key="index"
                  :index="index"
                  class="w-full"
                />
              </PinInputGroup>
            </PinInput>
          </div>
          <div class="grid gap-2">
            <Label for="device">Device ID</Label>
            <Input id="device" v-model="deviceId" placeholder="Device ID" type="text" required />
          </div>
        </template>
      </CardContent>

      <CardFooter>
        <Button class="w-full" @click="step === 1 ? handleSendOtp() : handleVerifyOtp()">
          {{ step === 1 ? 'Send OTP' : 'Verify OTP' }}
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
