<template>
  <div class="columns-3 border">
    <p class="w-1/2">Id: {{ value }}</p>
    <Select class="w-80" :options="options" v-model="value" />
    <Button @click="buscar()"> Button </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select, Button } from 'frappe-ui'
import axios from 'axios'

const value = ref('')
let options = ref([{ label: '', value: '' }])

function buscar() {
  axios
    .get('https://rickandmortyapi.com/api/character')
    .then((response) => {
      const data = response.data.results
      if (data) {
        data.forEach((element) => {
          console.log(element)
        })
        options.value = [{ label: data[0].name, value: data[0].id }]
      }
    })
    .catch((error) => {
      console.error('Error al obtener la direccion', error)
    })
}
</script>
