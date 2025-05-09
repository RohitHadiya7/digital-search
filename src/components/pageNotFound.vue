<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <div>
        <h1 class="text-9xl font-extrabold text-gray-900">404</h1>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">Page Not Found</h2>
        <p class="mt-2 text-base text-gray-500">
          Sorry, we couldn't find the page you're looking for.
        </p>
      </div>
      <div class="mt-8">
        <router-link 
          to="/dashboard" 
          class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Go back home
        </router-link>
      </div>
    </div>
  </div>
</template>