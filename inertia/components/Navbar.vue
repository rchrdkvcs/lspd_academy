<script lang="ts" setup>
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <header
    class="w-full h-64px backdrop-blur-2xl bg-dark-9 bg-opacity-50 border-b border-dark-5 flex justify-between items-center px-16 fixed top-0 left-0 z-50"
  >
    <Link
      class="color-white text-xl font-semibold color-op-80 hover:color-white transition-all ease-in-out duration-300"
      href="/"
      >Training Divison</Link
    >

    <nav class="flex gap-4">
      <Link
        class="color-white color-op-80 hover:color-white transition-all ease-in-out duration-300"
        href="/"
        >Registre</Link
      >
      <!-- <Link
        class="color-white color-op-80 hover:color-white transition-all ease-in-out duration-300"
        href="/officers-list"
        >Registre</Link
      > -->
    </nav>

    <Link
      class="color-white color-op-80 font-medium hover:color-red-6 transition-all ease-in-out duration-300"
      href="/logout"
      >Déconnexion</Link
    >
  </header>
</template>

<style lang="scss"></style>
