<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template lang="pug">
div
  NuxtLayout
    .is-container
      h1.text-lg Error
      p Something went wrong.
      DevOnly
        pre.font-mono.border.p-2 {{ error }}
</template>
