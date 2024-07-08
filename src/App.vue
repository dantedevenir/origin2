<template>
  <div class="grid grid-cols-2">
    <div class="col-span-6">
      <Select class="text-center" :options="options" v-model="id_character" />
    </div>
    <div class="col-span-6">
      <Button @click="search" class="cursor-pointer bg-green-500"> Search </Button>
    </div>
    <div class="col-span-12 mt-2">
      <ListView
        :options="{
          onRowClick: onRowClick,
          selectable: state.selectable,
          showTooltip: state.showTooltip,
          resizeColumn: state.resizeColumn
        }"
        :columns="custom_columns"
        :rows="rowsRef"
        row-key="id"
      >
        <ListHeader>
          <ListHeaderItem v-for="column in custom_columns" :key="column.key" :item="column">
          </ListHeaderItem>
        </ListHeader>
        <ListRows>
          <ListRow
            v-for="row in rowsRef"
            :key="row.id"
            v-slot="{ column, item }"
            :row="{
              id: row.id,
              name: row.name,
              user_image: row.user_image,
              species: row.species,
              gender: row.gender,
              status: row.status,
              location: row.location
            }"
          >
            <ListRowItem :item="item" :align="column.align">
              <template #prefix>
                <div
                  v-if="column.key == 'coverage'"
                  class="h-3 w-3 rounded-full"
                  :class="item.bg_color"
                />
              </template>
              <Badge
                v-if="column.key == 'smoke'"
                variant="subtle"
                :theme="item.color"
                size="md"
                :label="item.value"
              />
            </ListRowItem>
          </ListRow>
        </ListRows>
        <ListSelectBanner>
          <template #actions="{ unselectAll, selections }">
            <div class="flex gap-2">
              <Button
                variant="ghost"
                label="Delete"
                @click="() => deleteSelect(selections, unselectAll)"
              />
              <Button variant="ghost" label="Unselect all" @click="unselectAll" />
            </div>
          </template>
        </ListSelectBanner>
      </ListView>
    </div>
  </div>
  <Variant title="With slots" autoPropsDisabled>
    <Dialog v-model="dialog1">
      <template #body-title>
        <div class="grid grid-cols-4">
          <div class="absolute inset-0 bg-white grid grid-cols-1 bg-white z-0" style="height: 25%">
            <p></p>
          </div>
        </div>
      </template>
      <template #body-content>
        <div class="grid grid-cols-4 bg-gray-400 rounded-lg">
          <div class="flex col-span-4 justify-center">
            <img
              :src="imagen"
              alt=""
              class="border-4 border-zinc-500 shadow-2xl shadow-black"
              style="border-radius: 50%; width: 200px; z-index: 10"
            />
          </div>
          <div class="flex justify-center col-span-4 text-2xl mt-6 z-10">
            <h1 class="font-bold">{{ info[0].name }}</h1>
          </div>
          <div class="flex justify-around col-span-4 z-10">
            <p class="font-mono italic font-semibold">{{ info[0].id }}</p>
          </div>
          <div class="flex justify-around col-span-4 mt-4 text-lg z-10">
            <h4 class="text-black-400 font-bold">Location</h4>
            <h4 class="text-black-400 font-bold mr-5">Status</h4>
          </div>
          <div class="flex justify-around col-span-4 z-10">
            <p class="font-mono italic">{{ info[0].location }}</p>
            <p class="font-mono italic mr-10">{{ info[0].status }}</p>
          </div>
          <div class="col-span-4 z-10">
            <p class="col-span-4 p-5 italic">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum repellat optio earum
              nesciunt doloremque, minima delectus qui magni praesentium, repellendus aspernatur
              ratione fugiat non dolor iste totam et? Maxime, ipsum! Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Illo temporibus sint perferendis incidunt qui quis
              itaque labore libero maxime saepe cum quasi, laborum possimus odio voluptate veritatis
              dolores ratione. Delectus.
            </p>
          </div>
          <div class="flex col-span-4 justify-center mb-4">
            <Button class="" variant="solid" @click="confirm">Confirm</Button>
            <Button class="ml-2" @click="dialog1 = false">Close</Button>
          </div>
        </div>
      </template>
    </Dialog>
  </Variant>
</template>

<script setup lang="ts">
data()
import { reactive, ref, type Ref } from 'vue'
import {
  Select,
  Button,
  Badge,
  ListHeader,
  ListHeaderItem,
  ListRow,
  ListRowItem,
  ListRows,
  ListSelectBanner,
  ListView,
  Dialog
} from 'frappe-ui'
import axios from 'axios'

const dialog1 = ref(false)
let imagen = ref()
let id_character = ref()
let info: Ref<Array<{ id: string; name: string; location: string; status: string }>> = ref([])
let options = ref([{ label: '', value: '' }])
let rowsRef: Ref<
  Array<{
    id: string
    name: string
    user_image: string
    species: string
    gender: string
    status: string
    location: string
  }>
> = ref([])

const state = reactive({
  selectable: true,
  showTooltip: false,
  resizeColumn: false
})

const custom_columns = reactive([
  {
    label: 'ID',
    key: 'id',
    width: '40px'
  },
  {
    label: 'Name',
    key: 'name',
    width: '150px'
  },
  {
    label: 'Specie',
    key: 'species',
    width: '100px'
  },
  {
    label: 'Gender',
    key: 'gender',
    width: '100px'
  },
  {
    label: 'Status',
    key: 'status',
    width: '100px'
  },
  {
    label: 'Location',
    key: 'location',
    width: '200px'
  }
])

function onRowClick(rowSelect: any) {
  info.value = []
  dialog1.value = true
  console.log(rowSelect)
  const id = rowSelect.id
  const name = rowSelect.name
  const location = rowSelect.location
  const status = rowSelect.status
  imagen.value = `https://rickandmortyapi.com/api/character/avatar/${rowSelect.id}.jpeg`
  info.value.push({ id: id, name: name, location: location, status: status })
  console.log(info)
}
function data() {
  axios
    .get('https://rickandmortyapi.com/api/character')
    .then((response) => {
      const json_result = response.data
      const api_result = json_result.results
      if (api_result) {
        api_result.forEach((data: any) => {
          const id = data.id
          const name = data.name
          options.value.push({ label: name, value: id })
        })
      }
    })
    .catch((error) => {
      console.error('Error in get address', error)
    })
}

async function search() {
  await axios
    .get(`https://rickandmortyapi.com/api/character/${id_character.value}`)
    .then((response) => {
      const json_result = response.data
      if (json_result) {
        const id = json_result.id
        const name = json_result.name
        const species = json_result.species
        const gender = json_result.gender
        const status = json_result.status
        const location = json_result.location.name
        const idExists = rowsRef.value.some((row) => row.id === id)
        if (idExists) {
          console.log('Ya ingresado')
        } else {
          console.log(id)
          rowsRef.value.push({
            id: id,
            name: name,
            user_image: `https://rickandmortyapi.com/api/character/avatar/${id_character.value}.jpeg`,
            species: species,
            gender: gender,
            status: status,
            location: location
          })
        }
      }
    })
    .catch((error) => {
      console.error('Error in get address', error)
    })
}

function deleteSelect(selections: any, unselectAll: any) {
  const selectionsArray = [...selections]
  const rows = rowsRef.value
  for (const selection of selectionsArray) {
    const indexToRemove = rows.findIndex((row) => row.id === selection)
    if (indexToRemove !== -1) {
      rows.splice(indexToRemove, 1)
    }
  }
  unselectAll()
}

function confirm() {
  alert('Confirmacion exitosa')
  dialog1.value = false
}
</script>

<style>
#headlessui-portal-root > div > div > div > div > div > div {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
