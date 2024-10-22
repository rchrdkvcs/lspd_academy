<script setup lang="ts">
import OfficersController from '#controllers/officers_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import OfficerSections from '~/components/OfficerSections.vue'
import Layout from '~/layouts/Layout.vue'

const { officers } = defineProps<{
  officers: InferPageProps<OfficersController, 'render'>['officers']
}>()
</script>

<template>
  <Layout title="Registre des officiers">
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
  </Layout>
</template>
