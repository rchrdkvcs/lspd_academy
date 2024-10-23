<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import Sidenav from '~/components/Sidenav.vue'

const props = defineProps<{
  title: string
}>()
</script>

<template>
  <Head :title="props.title" />

  <main class="flex bg-coolgray-9 h-100vh color-white">
    <Sidenav />

    <section class="flex flex-col w-full gap-8 p-8 overflow-auto relative">
      <slot />
    </section>
  </main>
</template>
