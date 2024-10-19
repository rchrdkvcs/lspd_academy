<script setup lang="ts">
import HomeController from '#controllers/home_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/vue3'
import Navbar from '~/components/navbar.vue'
import OfficerSections from '~/components/OfficerSections.vue'

const { officers } = defineProps<{
  officers: InferPageProps<HomeController, 'index'>['officers']
}>()
</script>

<template>
  <Head title="Dashboard" />

  <Navbar />

  <main
    class="bg-slate-9 w-full h-100vh overflow-auto px-16 pt-96px pb-8 flex flex-col gap-8 color-white"
  >
    <OfficerSections label="Chief of Police" roleId="1288588180509167626" :officers="officers" />
    <OfficerSections label="Commandant" roleId="965280713932947487" :officers="officers" />
    <OfficerSections label="Sous Commandant" roleId="1291470554921959598" :officers="officers" />
    <OfficerSections label="Capitaine" roleId="965280713932947486" :officers="officers" />
    <OfficerSections label="Lieutenant II" roleId="965280713886797830" :officers="officers" />
    <OfficerSections label="Lieutenant I" roleId="965280713916166214" :officers="officers" />
    <OfficerSections label="Sergent II" roleId="1239562623473942548" :officers="officers" />
    <OfficerSections label="Sergent I" roleId="965280713916166213" :officers="officers" />
    <OfficerSections label="Officier III" roleId="1239562620739129366" :officers="officers" />
    <OfficerSections label="Officier II" roleId="1239562619891744810" :officers="officers" />
    <OfficerSections label="Officier I" roleId="965280713916166212" :officers="officers" />
    <OfficerSections label="Rookie" roleId="965280713916166211" :officers="officers" />
  </main>
</template>
