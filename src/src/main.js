import { createApp } from 'vue'

import 'tdesign-vue-next/es/style/index.css';
import 'remixicon/fonts/remixicon.css'
import './style.css'

import App from './App.vue'
import router from './router'
import TDesign from 'tdesign-vue-next';

createApp(App).use(router).use(TDesign).mount('#app')