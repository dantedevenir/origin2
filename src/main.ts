import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { Button, Select, Input, setConfig, frappeRequest, resourcesPlugin } from 'frappe-ui'

const app = createApp(App)

setConfig('resourceFetcher', frappeRequest)

app.use(resourcesPlugin)

// eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
app.component('Button', Button)
// eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
app.component('Card', Select)
// eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
app.component('Input', Input)

app.mount('#app')
