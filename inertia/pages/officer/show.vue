<script setup lang="ts">
import OfficerController from '#controllers/officer/officer_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { ref, watch } from 'vue'
import OfficerSections from '~/components/OfficerSections.vue'
import Layout from '~/layouts/Layout.vue'

const props = defineProps<{
  officers: InferPageProps<OfficerController, 'render'>['officers']
}>()

const search = ref('')

let officers = props.officers

watch(
  () => search.value,
  (value) => {
    officers = props.officers.filter((officer) => {
      return (
        officer.fullName.toLowerCase().includes(value.toLowerCase()) ||
        officer.username.toLowerCase().includes(value.toLowerCase()) ||
        officer.serial.toLowerCase().includes(value.toLowerCase())
      )
    })
  }
)
</script>

<template>
  <Layout title="Registre des officiers">
    <div
      class="flex gap-2 bg-neutral-8 bg-opacity-75 rounded-xl py-2 px-4 w-1/3 hover:bg-opacity-100 focus:outline-none mx-auto transition-colors duration-200 ease-in-out backdrop-blur-lg border border-white shadow-sm"
      style="border-color: rgba(255, 255, 255, 0.1)"
    >
      <i class="color-white color-op-75">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
          />
        </svg>
      </i>
      <input
        class="outline-none bg-transparent border-none w-full"
        type="text"
        placeholder="Rechercher un officier..."
        v-model="search"
      />
    </div>
    <OfficerSections label="Chief of Police" roleId="1288588180509167626" :officers="officers" />
    <OfficerSections label="Commandant" roleId="965280713932947487" :officers="officers" />
    <OfficerSections label="Commandant Adj." roleId="1291470554921959598" :officers="officers" />
    <OfficerSections label="Capitaine" roleId="965280713932947486" :officers="officers" />
    <OfficerSections label="Lieutenant II" roleId="965280713886797830" :officers="officers" />
    <OfficerSections label="Lieutenant I" roleId="965280713916166214" :officers="officers" />
    <OfficerSections label="Sergent II" roleId="1239562623473942548" :officers="officers" />
    <OfficerSections label="Sergent I" roleId="965280713916166213" :officers="officers" />
    <OfficerSections label="Officier III" roleId="1239562620739129366" :officers="officers" />
    <OfficerSections label="Officier II" roleId="1239562619891744810" :officers="officers" />
    <OfficerSections label="Officier I" roleId="965280713916166212" :officers="officers" />
    <OfficerSections label="Rookie" roleId="965280713916166211" :officers="officers" />
  </Layout>
</template>
