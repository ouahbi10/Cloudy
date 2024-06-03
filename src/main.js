import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mitt from "mitt";
// import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

//emitter Config
const emitter = mitt();
//app Config

const VueApp = createApp(App);

VueApp.provide("emitter", emitter).use(router).mount("#app");

document.title = "Cloudy";
