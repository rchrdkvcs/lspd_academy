<script setup lang="ts">
import CaseByCaseController from '#controllers/casebycase/casebycase_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { io } from 'socket.io-client'
import { onMounted, onUnmounted, ref } from 'vue'
import { getRank } from '~/composables/utils'
import Layout from '~/layouts/Layout.vue'

const { officers } = defineProps<{
  officers: InferPageProps<CaseByCaseController, 'render'>['officers']
}>()

const localOfficers = ref(officers)
const socket = io(window.location.origin)

onMounted(() => {
  socket.on('comment:updated', (data) => {
    const { discordId, comment } = data

    const officer = officers.find((o) => o.discordId === discordId)

    if (officer) {
      officer.comment = comment
    }
  })

  socket.on('decision:updated', (data) => {
    const { discordId, decision } = data

    const officer = officers.find((o) => o.discordId === discordId)

    if (officer) {
      officer.decision = decision
    }
  })

  socket.on('decision:unset', (data) => {
    const { discordId } = data
    const officer = officers.find((o) => o.discordId === discordId)
    if (officer) {
      officer.decision = null
    }
  })
})

onUnmounted(() => {
  socket.off('comment:updated')
  socket.off('decision:updated')
  socket.off('decision:unset')
  socket.disconnect()
})

function updateComment(discordId: string, comment: string) {
  const officer = officers.find((o) => o.discordId === discordId)
  if (officer) {
    officer.comment = comment
  }

  socket.emit('comment:update', { discordId, comment })
}

function updateDecision(discordId: string, decision: string) {
  const officer = officers.find((o) => o.discordId === discordId)
  if (officer) {
    // Si la décision actuelle est la même que celle cliquée
    if (officer.decision === decision) {
      officer.decision = null
      // Émet un événement spécifique de désélection
      socket.emit('decision:unset', {
        discordId,
        previousDecision: decision,
      })
    } else {
      officer.decision = decision
      // Émet l'événement normal de mise à jour
      socket.emit('decision:update', {
        discordId,
        decision,
      })
    }
  }
}

function isDecisionActive(officerDecision: string | null, decisionType: string): boolean {
  return officerDecision === decisionType
}
</script>

<template>
  <Layout title="Cas par Cas">
    <div class="grid grid-cols-4 justify-center items-center gap-2">
      <p
        class="text-lg font-medium text-center rounded-xl px-4 py-2 bg-opacity-70 backdrop-blur-lg border border-white border-op-05"
        style="border-color: rgba(255, 255, 255, 0.1)"
      >
        Promotion <br />
        <span class="text-xl color-white color-op-75">0</span>
      </p>
      <p
        class="text-lg font-medium text-center rounded-xl px-4 py-2 bg-opacity-70 backdrop-blur-lg border border-white border-op-05"
        style="border-color: rgba(255, 255, 255, 0.1)"
      >
        Licenciement <br />
        <span class="text-xl color-white color-op-75">0</span>
      </p>
      <p
        class="text-lg font-medium text-center rounded-xl px-4 py-2 bg-opacity-70 backdrop-blur-lg border border-white border-op-05"
        style="border-color: rgba(255, 255, 255, 0.1)"
      >
        Avertissement <br />
        <span class="text-xl color-white color-op-75">0</span>
      </p>
      <p
        class="text-lg font-medium text-center rounded-xl px-4 py-2 bg-opacity-70 backdrop-blur-lg border border-white border-op-05"
        style="border-color: rgba(255, 255, 255, 0.1)"
      >
        Absence justifiee <br />
        <span class="text-xl color-white color-op-75">0</span>
      </p>
    </div>

    <div
      class="grid grid-cols-5 gap-2 bg-neutral-8 rounded-xl p-2 font-semibold sticky -top-16px z-10 bg-opacity-70 backdrop-blur-lg border border-white border-op-05"
      style="border-color: rgba(255, 255, 255, 0.1)"
    >
      <p class="grid-col-span-1">Agent</p>
      <p class="grid-col-span-3">Commentaire</p>
      <p class="grid-col-span-1">Decision</p>
    </div>

    <div class="flex flex-col gap-2 w-full h-fit">
      <div
        v-for="officer in localOfficers.sort((a, b) => a.serial - b.serial)"
        class="grid grid-cols-5 rounded-xl py-2 px-3 border border-neutral-8 transition-colors duration-200 gap-2"
      >
        <div class="grid-col-span-1 flex gap-4 justify-start items-center">
          <p class="text-3xl font-semibold color-white color-op-75 w-32px text-center">
            {{ officer.serial }}
          </p>
          <div class="flex flex-col gap-1">
            <p class="text-base font-medium color-white color-op-90">
              {{ getRank(officer.roles) }}
            </p>
            <p class="text-lg font-semibold">{{ officer.fullName }}</p>
            <p class="text-base color-white color-op-75">@{{ officer.username }}</p>
          </div>
        </div>
        <textarea
          class="grid-col-span-3 outline-none border-none text-base font-normal resize-none bg-transparent hover:bg-neutral-8 rounded-xl p-2 transition-200 ease-in-out focus:bg-neutral-8"
          :id="'comment:' + officer.discordId"
          rows="2"
          :value="officer.comment"
          @input="updateComment(officer.discordId, ($event.target as HTMLTextAreaElement).value)"
        ></textarea>
        <div class="grid-col-span-1 gap-2 grid grid-cols-2">
          <div>
            <input
              type="checkbox"
              :id="'promote:' + officer.discordId"
              :checked="isDecisionActive(officer.decision, 'promote')"
              @change="updateDecision(officer.discordId, 'promote')"
              class="hidden peer"
            />
            <label
              :for="'promote:' + officer.discordId"
              class="rounded-xl px-4 py-2 text-sm transition-colors duration-200 ease-in-out w-full h-fit cursor-pointer flex items-center justify-center peer-checked:bg-green-6 color-white color-op-75 border border-white border-opacity-10 hover:(bg-neutral-8 color-op-100 border-op-25)"
              >Promotion
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              :id="'fire:' + officer.discordId"
              :checked="isDecisionActive(officer.decision, 'fire')"
              @change="updateDecision(officer.discordId, 'fire')"
              class="hidden peer"
            />
            <label
              :for="'fire:' + officer.discordId"
              class="rounded-xl px-4 py-2 text-sm transition-colors duration-200 ease-in-out w-full h-fit cursor-pointer flex items-center justify-center peer-checked:bg-red-6 color-white color-op-75 border border-white border-opacity-10 hover:(bg-neutral-8 color-op-100 border-op-25)"
              >Licenciement
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              :id="'advertise:' + officer.discordId"
              :checked="isDecisionActive(officer.decision, 'advertise')"
              @change="updateDecision(officer.discordId, 'advertise')"
              class="hidden peer"
            />
            <label
              :for="'advertise:' + officer.discordId"
              class="rounded-xl px-4 py-2 text-sm transition-colors duration-200 ease-in-out w-full h-fit cursor-pointer flex items-center justify-center peer-checked:bg-orange-6 color-white color-op-75 border border-white border-opacity-10 hover:(bg-neutral-8 color-op-100 border-op-25)"
              >Avertissement
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              :id="'missing:' + officer.discordId"
              :checked="isDecisionActive(officer.decision, 'missing')"
              @change="updateDecision(officer.discordId, 'missing')"
              class="hidden peer"
            />
            <label
              :for="'missing:' + officer.discordId"
              class="rounded-xl px-4 py-2 text-sm transition-colors duration-200 ease-in-out w-full h-fit cursor-pointer flex items-center justify-center peer-checked:bg-blue-6 color-white color-op-75 border border-white border-opacity-10 hover:(bg-neutral-8 color-op-100 border-op-25)"
              >Absence
            </label>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
