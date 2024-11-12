<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import { computed } from 'vue'
import { useAssignments } from '~/composables/use_assignments'
import { useRookieSelection } from '~/composables/use_rookie_selection'
import { getRank } from '~/composables/utils'
import Layout from '~/layouts/Layout.vue'

interface Props {
  instructeurs: Instructor[]
  rookies: Rookie[]
  allRookies: Rookie[]
  assignments: Record<string, Assignment>
}

const props = defineProps<Props>()

const { localAssignments, hasModifications, updateAssignment, handleSubmit } = useAssignments(
  props.assignments
)

const { getRookieOptions, getSelectedValue } = useRookieSelection(
  props.allRookies,
  localAssignments
)

const handleDiscordUpdate = () => {
  router.post('/update-pto-message')
}

const sortedInstructeurs = computed(() =>
  [...props.instructeurs].sort((a, b) => a.serial - b.serial)
)
</script>

<template>
  <Layout title="Division">
    <div class="flex flex-col gap-8">
      <div class="flex gap-4 w-full justify-end items-center">
        <button
          @click="handleDiscordUpdate"
          class="px-4 py-2 rounded-xl color-white color-op-75 transition-colors duration-200 border border-white border-opacity-10 hover:(bg-neutral-8 color-op-100 border-op-25)"
        >
          Mettre à jour les messages Discord
        </button>
        <button
          v-if="hasModifications"
          @click="handleSubmit"
          class="px-4 py-2 rounded-xl color-green-6 color-op-100 transition-colors duration-200 border border-green-7 border-opacity-100 hover:(bg-green-7 color-white border-op-75)"
        >
          Valider les modifications
        </button>
      </div>

      <section class="w-full flex flex-col gap-4">
        <div
          v-for="instructeur in sortedInstructeurs"
          :key="instructeur.discordId"
          class="px-4 py-2 border border-neutral-8 rounded-xl grid grid-cols-4 gap-4 justify-center items-center"
        >
          <div class="flex gap-4 items-center">
            <p class="text-3xl font-semibold color-white color-op-75 w-32px text-center">
              {{ instructeur.serial }}
            </p>
            <div class="flex flex-col">
              <span class="text-lg font-semibold capitalize">{{ instructeur.fullName }}</span>
              <span class="text-base color-white color-op-75">
                {{ getRank(instructeur.roles) }}
              </span>
            </div>
          </div>

          <template v-for="position in ['rk1', 'rk2', 'rk3'] as const" :key="position">
            <select
              :class="[
                getSelectedValue(instructeur.discordId, position)
                  ? 'bg-neutral-8'
                  : 'bg-neutral-9 border border-neutral-8',
                'px-2 py-3 cursor-pointer h-fit rounded-lg transition-colors duration-200',
              ]"
              @change="
                (e) =>
                  updateAssignment(
                    instructeur.discordId,
                    (e.target as HTMLSelectElement).value,
                    position
                  )
              "
              :value="getSelectedValue(instructeur.discordId, position)"
            >
              <option value=""></option>
              <option
                v-for="rookie in getRookieOptions(instructeur.discordId, position)"
                :key="rookie.discordId"
                :value="rookie.discordId"
              >
                {{ rookie.serial }} - {{ rookie.fullName }}
              </option>
            </select>
          </template>
        </div>
      </section>
    </div>
  </Layout>
</template>
