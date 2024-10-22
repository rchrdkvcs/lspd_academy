<script lang="ts" setup>
import { usePage } from '@inertiajs/vue3'
import Layout from '~/layouts/Layout.vue'

const page = usePage().props

console.log(page)
</script>

<template>
  <Layout title="Dashboard">
    <div class="w-full h-full flex justify-center items-center">
      <h1>Bonjour {{}}</h1>
    </div>
  </Layout>
</template>

<style lang="scss"></style>
