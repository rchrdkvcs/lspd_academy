<script lang="ts" setup>
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <aside
    class="flex flex-col items-center justify-between h-full p-4 border-r border-white w-292px min-w-292px"
    style="border-color: rgba(255, 255, 255, 0.1)"
  >
    <div class="flex flex-col items-start justify-start w-full gap-4">
      <Link
        class="text-xl font-semibold transition-all duration-300 ease-in-out color-white color-op-80 hover:color-white"
        href="/"
        >LSPD | Training Divison</Link
      >

      <nav class="flex flex-col w-full gap-2">
        <Link
          class="flex gap-2 items-center w-full px-4 py-2 transition-all duration-300 ease-in-out rounded-lg color-white color-op-75 hover:color-white hover:bg-coolgray-8"
          href="/"
        >
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="none">
                <path
                  d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                />
                <path
                  fill="currentColor"
                  d="M12 2c5.523 0 10 4.477 10 10a9.97 9.97 0 0 1-2.938 7.08c-.4.4-1.05.392-1.44-.013l-.842-.873a1 1 0 1 1 1.44-1.388l.098.102a8 8 0 1 0-12.636 0l.098-.102a1 1 0 1 1 1.44 1.388l-.842.873a1.01 1.01 0 0 1-1.44.013A9.97 9.97 0 0 1 2 12C2 6.477 6.477 2 12 2m0 4a1 1 0 0 1 1 1v5.268A2 2 0 0 1 12 16a2 2 0 0 1-1-3.732V7a1 1 0 0 1 1-1"
                />
              </g>
            </svg>
          </i>
          <span> Tableau de bord </span>
        </Link>

        <Link
          class="flex gap-2 items-center w-full px-4 py-2 transition-all duration-300 ease-in-out rounded-lg color-white color-op-75 hover:color-white hover:bg-coolgray-8"
          href="/officers"
        >
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
              <path
                fill="currentColor"
                d="M243.6 148.8a6 6 0 0 1-8.4-1.2A53.58 53.58 0 0 0 192 126a6 6 0 0 1 0-12a26 26 0 1 0-25.18-32.5a6 6 0 0 1-11.62-3a38 38 0 1 1 59.91 39.63a65.7 65.7 0 0 1 29.69 22.27a6 6 0 0 1-1.2 8.4M189.19 213a6 6 0 0 1-2.19 8.2a5.9 5.9 0 0 1-3 .81a6 6 0 0 1-5.2-3a59 59 0 0 0-101.62 0a6 6 0 1 1-10.38-6a70.1 70.1 0 0 1 36.2-30.46a46 46 0 1 1 50.1 0A70.1 70.1 0 0 1 189.19 213M128 178a34 34 0 1 0-34-34a34 34 0 0 0 34 34m-58-58a6 6 0 0 0-6-6a26 26 0 1 1 25.18-32.51a6 6 0 1 0 11.62-3a38 38 0 1 0-59.91 39.63A65.7 65.7 0 0 0 11.2 140.4a6 6 0 1 0 9.6 7.2A53.58 53.58 0 0 1 64 126a6 6 0 0 0 6-6"
              />
            </svg>
          </i>
          <span>Effectifs</span>
        </Link>

        <Link
          class="flex gap-2 items-center w-full px-4 py-2 transition-all duration-300 ease-in-out rounded-lg color-white color-op-75 hover:color-white hover:bg-coolgray-8"
          href="/casparcas"
        >
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zM6 20V4h7v5h5v11z"
              />
            </svg>
          </i>
          <span>Cas Par Cas</span>
        </Link>

        <Link
          class="flex gap-2 items-center w-full px-4 py-2 transition-all duration-300 ease-in-out rounded-lg color-white color-op-75 hover:color-white hover:bg-coolgray-8"
          href="/training"
        >
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22m0-2.1q2.6-.825 4.3-3.3t1.7-5.5V6.375l-6-2.25l-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3m0-7.9"
              />
            </svg>
          </i>
          <span>Instructeurs</span>
        </Link>
      </nav>
    </div>

    <Link
      class="w-full px-4 py-2 transition-all duration-300 ease-in-out rounded-lg color-white color-op-75 hover:color-white hover:bg-red-6 text-center"
      href="/logout"
      >Déconnexion</Link
    >
  </aside>
</template>

<style lang="scss"></style>
