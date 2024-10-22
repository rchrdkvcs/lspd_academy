<script lang="ts" setup>
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <aside
    class="flex flex-col items-center justify-between h-full p-4 border-r border-white w-15% min-w-15% border-op-10"
  >
    <div class="flex flex-col items-start justify-start w-full gap-4">
      <Link
        class="text-xl font-semibold transition-all duration-300 ease-in-out color-white color-op-80 hover:color-white"
        href="/"
        >LSPD | Training Divison</Link
      >

      <nav class="flex flex-col w-full gap-2">
        <Link
          class="w-full px-4 py-2 transition-all duration-300 ease-in-out rounded-lg color-white color-op-75 hover:color-white hover:bg-coolgray-8"
          href="/"
          >Dashboard</Link
        >
        <Link
          class="w-full px-4 py-2 transition-all duration-300 ease-in-out rounded-lg color-white color-op-75 hover:color-white hover:bg-coolgray-8"
          href="/officers"
          >Officiers</Link
        >
      </nav>
    </div>

    <Link
      class="w-full px-4 py-2 transition-all duration-300 ease-in-out rounded-lg color-white color-op-75 hover:color-white hover:bg-red-6 text-center"
      href="/logout"
      >Déconnexion</Link
    >
  </aside>
</template>

<style lang="scss"></style>
