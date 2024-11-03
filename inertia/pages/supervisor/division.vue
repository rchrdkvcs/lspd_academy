<script lang="ts" setup>
import DivisionController from '#controllers/divison_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { router, useForm } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import Layout from '~/layouts/Layout.vue'
import { getRank } from '~/utils/utils'

const props = defineProps<{
  instructeurs: InferPageProps<DivisionController, 'render'>['instructeurs']
  rookies: InferPageProps<DivisionController, 'render'>['rookies']
  allRookies: InferPageProps<DivisionController, 'render'>['allRookies']
  assignments: Record<string, { rk1: string | null; rk2: string | null; rk3: string | null }>
}>()

// État local pour les modifications en cours
const localAssignments = ref({ ...props.assignments })

// État pour suivre les instructeurs modifiés
const modifiedInstructors = ref(new Set<string>())

const form = useForm({
  assignments: {} as Record<
    string,
    { toDiscordId: string; rk1: string | null; rk2: string | null; rk3: string | null }
  >,
})

const updateAssignment = (
  instructeurId: string,
  rookieId: string | null,
  position: 'rk1' | 'rk2' | 'rk3'
) => {
  if (!localAssignments.value[instructeurId]) {
    localAssignments.value[instructeurId] = { rk1: null, rk2: null, rk3: null }
  }
  localAssignments.value[instructeurId][position] = rookieId === '' ? null : rookieId
  modifiedInstructors.value.add(instructeurId)
}

const handleSubmit = () => {
  // Préparer les données pour l'envoi
  const formData = {}
  modifiedInstructors.value.forEach((instructeurId) => {
    formData[instructeurId] = {
      toDiscordId: instructeurId,
      ...localAssignments.value[instructeurId],
    }
  })

  // Utiliser le form Inertia pour l'envoi
  form.assignments = formData
  form.post('/create-pto', {
    preserveScroll: true,
    onSuccess: () => {
      modifiedInstructors.value.clear()
    },
  })
}

const getRookieOptions = (instructeurId: string, position: 'rk1' | 'rk2' | 'rk3') => {
  const currentAssignments = localAssignments.value[instructeurId] || {
    rk1: null,
    rk2: null,
    rk3: null,
  }

  // Obtenir tous les rookies déjà assignés (sauf celui de la position actuelle)
  const assignedRookies = new Set()
  Object.values(localAssignments.value).forEach((assignment) => {
    if (assignment.rk1 && assignment.rk1 !== currentAssignments[position])
      assignedRookies.add(assignment.rk1)
    if (assignment.rk2 && assignment.rk2 !== currentAssignments[position])
      assignedRookies.add(assignment.rk2)
    if (assignment.rk3 && assignment.rk3 !== currentAssignments[position])
      assignedRookies.add(assignment.rk3)
  })

  // Filtrer les rookies disponibles
  const availableRookies = props.allRookies.filter(
    (rookie) =>
      !assignedRookies.has(rookie.discordId) || rookie.discordId === currentAssignments[position]
  )

  return availableRookies.sort((a, b) => a.serial - b.serial)
}

const getSelectedValue = (instructeurId: string, position: 'rk1' | 'rk2' | 'rk3') => {
  return localAssignments.value[instructeurId]?.[position] || ''
}

// Vérifier si des modifications ont été apportées
const hasModifications = computed(() => modifiedInstructors.value.size > 0)

// Mettre à jour le message Discord
const handleDiscordUpdate = () => {
  console.log('Updating Discord message')
  router.post('/update-pto-message')
}
</script>

<template>
  <Layout title="Division">
    <div class="flex flex-col gap-4">
      <div class="flex gap-2 w-full justify-end items-center">
        <!-- Bouton Mise a jour message discord -->
        <button
          @click="handleDiscordUpdate"
          class="bg-slate-8 hover:bg-slate-7 px-4 py-2 rounded-xl text-white font-medium transition-all duration-200"
        >
          Mettre à jour les messages Discord
        </button>
        <!-- Bouton de validation -->
        <button
          v-if="hasModifications"
          @click="handleSubmit"
          class="bg-green-7 hover:bg-green-6 px-4 py-2 rounded-xl text-white font-medium transition-all duration-200"
        >
          Valider les modifications
        </button>
      </div>

      <!-- Liste des instructeurs -->
      <div
        v-for="instructeur in props.instructeurs.sort((a, b) => a.serial - b.serial)"
        class="px-4 py-2 border border-slate-8 rounded-xl grid grid-cols-4 gap-4 justify-center items-center"
        :key="instructeur.discordId"
      >
        <div class="flex gap-4 items-center">
          <p class="text-3xl font-semibold color-white color-op-75 w-32px text-center">
            {{ instructeur.serial }}
          </p>
          <div class="flex flex-col">
            <span class="text-lg font-semibold capitalize">{{ instructeur.fullName }}</span>
            <span class="text-base color-white color-op-75">{{ getRank(instructeur.roles) }}</span>
          </div>
        </div>
        <select
          class="px-2 py-3 cursor-pointer h-fit rounded-lg transition-colors duration-200"
          :class="[
            getSelectedValue(instructeur.discordId, 'rk1')
              ? 'bg-slate-8'
              : 'bg-coolgray-9 border border-slate-8',
          ]"
          @change="
            (e) =>
              updateAssignment(instructeur.discordId, (e.target as HTMLSelectElement).value, 'rk1')
          "
          :value="getSelectedValue(instructeur.discordId, 'rk1')"
        >
          <option value=""></option>
          <option
            v-for="rookie in getRookieOptions(instructeur.discordId, 'rk1')"
            :key="rookie.discordId"
            :value="rookie.discordId"
          >
            {{ rookie.serial }} - {{ rookie.fullName }}
          </option>
        </select>
        <select
          class="px-2 py-3 cursor-pointer h-fit rounded-lg transition-colors duration-200"
          :class="[
            getSelectedValue(instructeur.discordId, 'rk2')
              ? 'bg-slate-8'
              : 'bg-coolgray-9 border border-slate-8',
          ]"
          @change="
            (e) =>
              updateAssignment(instructeur.discordId, (e.target as HTMLSelectElement).value, 'rk2')
          "
          :value="getSelectedValue(instructeur.discordId, 'rk2')"
        >
          <option value=""></option>
          <option
            v-for="rookie in getRookieOptions(instructeur.discordId, 'rk2')"
            :key="rookie.discordId"
            :value="rookie.discordId"
          >
            {{ rookie.serial }} - {{ rookie.fullName }}
          </option>
        </select>
        <select
          class="px-2 py-3 cursor-pointer h-fit rounded-lg transition-colors duration-200"
          :class="[
            getSelectedValue(instructeur.discordId, 'rk3')
              ? 'bg-slate-8'
              : 'bg-coolgray-9 border border-slate-8',
          ]"
          @change="
            (e) =>
              updateAssignment(instructeur.discordId, (e.target as HTMLSelectElement).value, 'rk3')
          "
          :value="getSelectedValue(instructeur.discordId, 'rk3')"
        >
          <option value=""></option>
          <option
            v-for="rookie in getRookieOptions(instructeur.discordId, 'rk3')"
            :key="rookie.discordId"
            :value="rookie.discordId"
          >
            {{ rookie.serial }} - {{ rookie.fullName }}
          </option>
        </select>
      </div>
    </div>
  </Layout>
</template>
