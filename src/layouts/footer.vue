<!-- 
This is footer component. 
-->
<template>
    <div class="flex flex-col lg:flex-row justify-between w-full items-center p-2 overflow-hidden">
      <!-- Left Section -->
      <div class="flex items-center gap-4">
        <p class="text-sm font-semibold text-center lg:text-left">
          Copyright © 2024, Developed by Ansh Tech Labs
          <span class="pi pi-heart-fill pl-2"></span>
        </p>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-2 mt-4 lg:mt-0">
        <div>
          <p class="text-orange-400 text-sm font-bold text-center lg:text-left">
            Made In India
          </p>
        </div>
        <div>
          <img 
            alt="India" 
            height="26" 
            width="26" 
            class="overflow-hidden rounded-full" 
            src="\src\assets\india-flag.png"
          />
        </div>
      </div>
    </div>

</template>

