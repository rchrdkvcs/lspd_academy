<script lang="ts" setup>
import OfficersController from '#controllers/officers_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { filterOfficersByRoleId, hasRole } from '~/utils/utils'

const props = defineProps<{
  label: string
  roleId: string
  officers: InferPageProps<OfficersController, 'render'>['officers']
}>()
</script>

<template>
  <section
    class="flex flex-col gap-2"
    v-if="filterOfficersByRoleId(props.roleId, props.officers).length > 0"
  >
    <div class="flex gap-2 items-center w-full">
      <h2 class="font-semibold text-xl color-white color-op-90">{{ props.label }}</h2>
      <p class="color-white color-op-75 font-medium text-lg">
        ({{ filterOfficersByRoleId(props.roleId, props.officers).length }})
      </p>
    </div>
    <ul class="w-full flex flex-col gap-2">
      <li
        class="flex w-full p-2 rounded-xl gap-4 items-center justify-between transition-colors duration-200 border border-slate-8"
        v-for="officer in filterOfficersByRoleId(props.roleId, props.officers).sort(
          (a, b) => a.serial - b.serial
        )"
        :key="officer.discordId"
      >
        <div class="flex gap-4 items-center">
          <p class="text-3xl font-semibold color-white color-op-75 w-32px text-center">
            {{ officer.serial }}
          </p>
          <div class="flex flex-col">
            <span class="text-lg font-semibold capitalize">{{ officer.fullName }}</span>
            <span class="text-base color-white color-op-75">@{{ officer.username }}</span>
          </div>
        </div>
        <div class="flex gap-2">
          <!-- Directeur de division -->
          <p
            class="text-xs bg-blue-8 rounded-full px-3 font-semibold flex items-center justify-center h-fit py-1"
            v-if="hasRole(officer.roles, '1295162211681177630')"
          >
            Directeur
          </p>
          <!-- Avertissement 1 -->
          <p
            class="text-xs bg-yellow-6 rounded-full px-3 font-semibold flex items-center justify-center h-fit py-1"
            v-if="hasRole(officer.roles, '1262538843517751336')"
          >
            Avertissement N1
          </p>
          <!-- Avertissement 2 -->
          <p
            class="text-xs bg-orange-6 rounded-full px-3 font-semibold flex items-center justify-center h-fit py-1"
            v-if="hasRole(officer.roles, '1284212867779793108')"
          >
            Avertissement N2
          </p>
          <!-- Avertissement 3 -->
          <p
            class="text-xs bg-red-6 rounded-full px-3 font-semibold flex items-center justify-center h-fit py-1"
            v-if="hasRole(officer.roles, '1284824568871260182')"
          >
            Avertissement N3
          </p>
          <!-- First Lincoln -->
          <p
            class="text-xs bg-slate-8 rounded-full px-3 font-semibold flex items-center justify-center h-fit py-1"
            v-if="hasRole(officer.roles, '1290784278405185538')"
          >
            F. Lincoln
          </p>
          <!-- Formation Initiale -->
          <p
            class="text-xs bg-slate-8 rounded-full px-3 font-semibold flex items-center justify-center h-fit py-1"
            v-if="hasRole(officer.roles, '1295815813558964326')"
          >
            F. Initiale
          </p>
          <!-- Formation Securisation -->
          <p
            class="text-xs bg-slate-8 rounded-full px-3 font-semibold flex items-center justify-center h-fit py-1"
            v-if="hasRole(officer.roles, '1295163319430414336')"
          >
            F. Securisation
          </p>
          <!-- Formation Poursuite -->
          <p
            class="text-xs bg-slate-8 rounded-full px-3 font-semibold flex items-center justify-center h-fit py-1"
            v-if="hasRole(officer.roles, '1290784209115414641')"
          >
            F. Poursuite
          </p>
          <!-- Formation Negociation -->
          <p
            class="text-xs bg-slate-8 rounded-full px-3 font-semibold flex items-center justify-center h-fit py-1"
            v-if="hasRole(officer.roles, '1257040893526151208')"
          >
            F. Negociation
          </p>
          <!-- Formation PPA -->
          <p
            class="text-xs bg-slate-8 rounded-full px-3 font-semibold flex items-center justify-center h-fit py-1"
            v-if="hasRole(officer.roles, '1290783991456075798')"
          >
            F. PPA
          </p>
          <!-- Formation Cat 3 -->
          <p
            class="text-xs bg-slate-8 rounded-full px-3 font-semibold flex items-center justify-center h-fit py-1"
            v-if="hasRole(officer.roles, '1275099198869733501')"
          >
            F. Cat 3
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>
