import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import './assets/main.css'
import store from "./store";

import 'bootstrap';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

const app = createApp(App)
// axios.defaults.baseURL = "http://localhost:5173";
app.use(router)
app.use(store)


app.mount('#app')


