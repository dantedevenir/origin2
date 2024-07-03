<template>
  <div class="p-2">
    <Select
      :options="[
        {
          label: 'Santiago',
          value: 0
        },
        {
          label: 'Jorge',
          value: 1
        }
      ]"
      v-model="value"
    />
    <p>{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select } from 'frappe-ui'

const value = ref('')
</script>

<style></style>
