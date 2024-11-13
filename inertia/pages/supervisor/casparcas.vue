<script setup lang="ts">
import OfficersController from '#controllers/officers_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { onMounted } from 'vue'
import Layout from '~/layouts/Layout.vue'
import { transmit } from '~/utils/transmit_client'
import { getRank } from '~/utils/utils'

const { officers } = defineProps<{
  officers: InferPageProps<OfficersController, 'render'>['officers']
}>()

// TODO: Debug why broadcast is not working
onMounted(() => {
  const subscription = transmit.subscription('test/1')
  void subscription.create()

  subscription.onMessage((data) => {
    console.log('hello', data)
  })
})
</script>

<template>
  <Layout title="Cas par Cas">
    <div class="grid grid-cols-4 justify-center items-center gap-2">
      <p
        class="text-lg font-medium text-center bg-slate-8 rounded-xl px-4 py-2 bg-opacity-70 backdrop-blur-lg border border-white border-op-05 shadow-sm"
        style="border-color: rgba(255, 255, 255, 0.1)"
      >
        Promotion <br />
        <span class="text-xl color-white color-op-75">0</span>
      </p>
      <p
        class="text-lg font-medium text-center bg-slate-8 rounded-xl px-4 py-2 bg-opacity-70 backdrop-blur-lg border border-white border-op-05 shadow-sm"
        style="border-color: rgba(255, 255, 255, 0.1)"
      >
        Licenciement <br />
        <span class="text-xl color-white color-op-75">0</span>
      </p>
      <p
        class="text-lg font-medium text-center bg-slate-8 rounded-xl px-4 py-2 bg-opacity-70 backdrop-blur-lg border border-white border-op-05 shadow-sm"
        style="border-color: rgba(255, 255, 255, 0.1)"
      >
        Avertissement <br />
        <span class="text-xl color-white color-op-75">0</span>
      </p>
      <p
        class="text-lg font-medium text-center bg-slate-8 rounded-xl px-4 py-2 bg-opacity-70 backdrop-blur-lg border border-white border-op-05 shadow-sm"
        style="border-color: rgba(255, 255, 255, 0.1)"
      >
        Absence justifiee <br />
        <span class="text-xl color-white color-op-75">0</span>
      </p>
    </div>

    <div
      class="grid grid-cols-5 gap-2 bg-slate-8 rounded-xl p-2 font-semibold sticky top-0 z-10 bg-opacity-70 backdrop-blur-lg border border-white border-op-05 shadow-sm"
      style="border-color: rgba(255, 255, 255, 0.1)"
    >
      <p class="grid-col-span-1">Agent</p>
      <p class="grid-col-span-3">Commentaire</p>
      <p class="grid-col-span-1">Decision</p>
    </div>

    <div class="flex flex-col gap-2 w-full h-fit">
      <div
        v-for="officer in officers.sort((a, b) => a.serial - b.serial)"
        class="grid grid-cols-5 rounded-xl p-2 border border-slate-8 transition-colors duration-200 gap-2"
      >
        <div class="grid-col-span-1 flex flex-col gap-1">
          <p
            class="text-xs bg-slate-8 rounded-full px-3 font-semibold flex items-center justify-center h-fit w-fit py-1"
          >
            {{ getRank(officer.roles) }}
          </p>
          <p class="text-lg font-semibold">{{ officer.fullName }} ({{ officer.serial }})</p>
          <p class="text-base color-white color-op-75">@{{ officer.username }}</p>
        </div>
        <textarea
          class="grid-col-span-3 outline-none border-none text-base font-normal resize-none bg-transparent hover:bg-slate-8 rounded-xl p-2 transition-200 ease-in-out"
          :id="'comment:' + officer.discordId"
          rows="3"
          :value="officer.comment"
        ></textarea>
        <div class="grid-col-span-1 gap-2 grid grid-cols-2">
          <div>
            <input type="checkbox" :id="'promote:' + officer.discordId" class="hidden peer" />
            <label
              :for="'promote:' + officer.discordId"
              class="bg-slate-8 rounded-xl px-4 py-2 font-semibold text-sm transition-colors duration-200 ease-in-out w-full h-fit cursor-pointer flex items-center justify-center peer-checked:bg-green-6"
              >Promotion
            </label>
          </div>
          <div>
            <input type="checkbox" :id="'fire:' + officer.discordId" class="hidden peer" />
            <label
              :for="'fire:' + officer.discordId"
              class="bg-slate-8 rounded-xl px-4 py-2 font-semibold text-sm transition-colors duration-200 ease-in-out w-full h-fit cursor-pointer flex items-center justify-center peer-checked:bg-red-6"
              >Licenciement
            </label>
          </div>
          <div>
            <input type="checkbox" :id="'advertise:' + officer.discordId" class="hidden peer" />
            <label
              :for="'advertise:' + officer.discordId"
              class="bg-slate-8 rounded-xl px-4 py-2 font-semibold text-sm transition-colors duration-200 ease-in-out w-full h-fit cursor-pointer flex items-center justify-center peer-checked:bg-orange-6"
              >Avertissement
            </label>
          </div>
          <div>
            <input type="checkbox" :id="'missing:' + officer.discordId" class="hidden peer" />
            <label
              :for="'missing:' + officer.discordId"
              class="bg-slate-8 rounded-xl px-4 py-2 font-semibold text-sm transition-colors duration-200 ease-in-out w-full h-fit cursor-pointer flex items-center justify-center peer-checked:bg-blue-6"
              >Absence
            </label>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
