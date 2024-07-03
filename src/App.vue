<template>
  <div class="p-2">
    <p>Id: {{ value }}</p>
    <Select class="espacio" :options="options" v-model="value" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select } from 'frappe-ui'

const value = ref('')
const options = [
  { label: 'Seleccionar', value: null },
  { label: 'Santiago', value: 0 },
  { label: 'Jorge', value: 1 },
  { label: 'Alguien', value: 2 },
  { label: 'Alguien 2', value: 3 },
  { label: 'Alguien 3', value: 4 }
]
</script>

<style>
.espacio {
  padding: 4px;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: gainsboro;
  border: none;
  text-align: end;
}
.p-2 {
  width: 180px;
  height: 75px;
}
</style>
