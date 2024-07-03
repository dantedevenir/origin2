<template>
  <div class="p-2">
    <Select
      class="espacio"
      :options="[
        {
          label: 'Santiago',
          value: 0
        },
        {
          label: 'Jorge',
          value: 1
        },
        {
          label: 'Pepito',
          value: 2
        },
        {
          label: 'Juanito',
          value: 3
        },
        {
          label: 'Messi',
          value: 4
        }
      ]"
      v-model="value"
    />
    <p>Id: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select } from 'frappe-ui'

const value = ref('')
</script>

<style>
.espacio {
  padding: 4px;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: gainsboro;
  border: none;
  text-align: center;
}
.p-2 {
  width: 180px;
  height: 75px;
}
</style>
