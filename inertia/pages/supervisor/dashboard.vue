<script lang="ts" setup>
import DashboardController from '#controllers/dashboard_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import Layout from '~/layouts/Layout.vue'

const props = defineProps<{
  fullName: InferPageProps<DashboardController, 'render'>['fullName']
}>()
</script>

<template>
  <Layout title="Dashboard">
    <div class="w-full h-full flex flex-col justify-center items-center">
      <h1 class="flex flex-col gap-2 text-center text-2xl">
        Bonjour
        <span class="3xl font-600">
          {{ props.fullName }}
        </span>
      </h1>
      <p class="color-white color-op-75 absolute bottom-32px">
        Le dashboard est en cours de creation ;)
      </p>
    </div>
  </Layout>
</template>
