<script lang="ts" setup>
import HomeController from '#controllers/home_controller'
import { InferPageProps } from '@adonisjs/inertia/types'

const props = defineProps<{
  label: string
  roleId: string
  officers: InferPageProps<HomeController, 'index'>['officers']
}>()

function filterOfficersByRoleId(roleId: string) {
  return props.officers.filter((officer) =>
    officer.roles.some((role: { id: string; name: string }) => role.id === roleId)
  )
}

function hasRole(roles: any[], roleId: string) {
  return roles.some((role) => role.id === roleId)
}
</script>

<template>
  <section class="flex flex-col gap-2">
    <div class="flex justify-between items-center w-full">
      <h2 class="font-bold text-xl">{{ props.label }}</h2>
      <p class="color-white color-op-75 bg-slate-8 rounded-full px-4">
        {{ filterOfficersByRoleId(props.roleId).length }}
      </p>
    </div>
    <ul class="w-full flex flex-col gap-2">
      <li
        class="flex w-full p-2 rounded-lg gap-4 items-center justify-between hover:bg-slate-8 transition-colors duration-200"
        v-for="officer in filterOfficersByRoleId(props.roleId).sort((a, b) => a.serial - b.serial)"
        :key="officer.discordId"
      >
        <div class="flex gap-4 items-center">
          <p class="text-3xl font-semibold color-white color-op-75">{{ officer.serial }}</p>
          <div class="flex flex-col">
            <span class="text-lg font-medium capitalize">{{ officer.fullName }}</span>
            <span class="text-base color-white color-op-75">@{{ officer.username }}</span>
          </div>
        </div>
        <div class="flex gap-2">
          <!-- Directeur de division -->
          <p class="text-2xl" v-if="hasRole(officer.roles, '1295162211681177630')">🔰</p>
          <!-- Avertissement 1 -->
          <p class="text-2xl" v-if="hasRole(officer.roles, '1262538843517751336')">⚠️</p>
          <!-- Avertissement 2 -->
          <p class="text-2xl" v-if="hasRole(officer.roles, '1284212867779793108')">⚠️⚠️</p>
          <!-- Avertissement 3 -->
          <p class="text-2xl" v-if="hasRole(officer.roles, '1284824568871260182')">⚠️⚠️⚠️</p>
          <!-- First Lincoln -->
          <p class="text-2xl" v-if="hasRole(officer.roles, '1290784278405185538')">✅</p>
          <!-- Formation Initiale -->
          <p class="text-2xl" v-if="hasRole(officer.roles, '1295815813558964326')">🗒️</p>
          <!-- Formation Securisation -->
          <p class="text-2xl" v-if="hasRole(officer.roles, '1295163319430414336')">⛓️‍💥</p>
          <!-- Formation Poursuite -->
          <p class="text-2xl" v-if="hasRole(officer.roles, '1290784209115414641')">🚓</p>
          <!-- Formation Negociation -->
          <p class="text-2xl" v-if="hasRole(officer.roles, '1257040893526151208')">📢</p>
          <!-- Formation PPA -->
          <p class="text-2xl" v-if="hasRole(officer.roles, '1290783991456075798')">🔫</p>
          <!-- Formation Cat 3 -->
          <p class="text-2xl" v-if="hasRole(officer.roles, '1275099198869733501')">🔫</p>
        </div>
      </li>
    </ul>
  </section>
</template>
