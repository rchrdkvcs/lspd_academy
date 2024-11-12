<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import Topbar from '~/components/Topbar.vue'

const props = defineProps<{
  title: string
}>()
</script>

<template>
  <Head :title="props.title" />

  <main class="flex flex-col bg-neutral-9 h-100vh color-white">
    <!-- <Sidenav /> -->
    <Topbar />

    <section class="flex flex-col w-full gap-8 p-8 pt-96px overflow-auto relative">
      <slot />
    </section>
  </main>
</template>
