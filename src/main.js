import './assets/main.css'
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Firebase
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'

const app = createApp(App)

//Firebase
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
})

app.use(router)
app.use(plugin, defaultConfig(config))

app.mount('#app')
