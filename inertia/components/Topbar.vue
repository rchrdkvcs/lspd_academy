<script lang="ts" setup>
import { usePage } from '@inertiajs/vue3'
import { ref } from 'vue'
import { useCurrentUser } from '~/composables/use_current_user'

const currentUser = useCurrentUser()
const currentPage = usePage().url
const navHover = ref(false)
</script>

<template>
  <header
    class="grid grid-cols-3 w-full py-2 px-8 items-center border-b border-neutral-8 absolute top-0 left-0 w-full z-50 bg-neutral-9 bg-opacity-50 backdrop-blur-lg"
  >
    <div class="flex flex-justify-start items-center gap-2">
      <img src="/public/lspd.png" alt="Logo LSPD" class="h-48px w-48px" />
    </div>

    <nav
      v-on:mouseenter="navHover = true"
      v-on:mouseleave="navHover = false"
      class="flex justify-center items-center color-white font-medium text-base transition-150 ease-in-out hover:(color-op-50)"
    >
      <ul class="flex gap-4">
        <li class="relative">
          <a href="/officers" class="hover:(color-white color-op-100) transition-300 ease-in-out"
            >Registre</a
          >
          <iframe
            v-if="currentPage === '/officers'"
            :class="{ 'opacity-50': navHover, 'opacity-100': !navHover }"
            class="absolute h-6px w-6px -bottom-8px left-1/2 -translate-x-1/2 bg-white rounded-full transition-opacity duration-300 ease-in-out"
          ></iframe>
        </li>

        <li class="relative">
          <a href="/instructor" class="hover:(color-white color-op-100) transition-300 ease-in-out"
            >Instructeur</a
          >
          <iframe
            v-if="currentPage === '/instructor'"
            :class="{ 'opacity-50': navHover, 'opacity-100': !navHover }"
            class="absolute h-6px w-6px -bottom-8px left-1/2 -translate-x-1/2 bg-white rounded-full transition-all duration-300 ease-in-out"
          ></iframe>
        </li>

        <li class="relative">
          <a href="/casparcas" class="hover:(color-white color-op-100) transition-300 ease-in-out"
            >Cas par cas</a
          >
          <iframe
            v-if="currentPage === '/casparcas'"
            :class="{ 'opacity-50': navHover, 'opacity-100': !navHover }"
            class="absolute h-6px w-6px -bottom-8px left-1/2 -translate-x-1/2 bg-white rounded-full transition-all duration-300 ease-in-out"
          ></iframe>
        </li>
      </ul>
    </nav>

    <div class="flex items-center justify-end gap-2">
      <p class="font-medium text-lg opacity-75">{{ currentUser.username }}</p>
      <img
        :src="currentUser.avatarUrl"
        alt="Photo de profil de l'utilisateur"
        class="h-48px w-48px rounded-full"
      />
    </div>
  </header>
</template>
