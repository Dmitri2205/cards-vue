import Vue from 'vue';
import App from './components/App.vue';
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from "./store/store";
import VueRouter from 'vue-router';
import router from './routes/router';


Vue.use(BootstrapVue);
Vue.use(store);
Vue.use(VueRouter);


new Vue({
	router,
	store,
	  render: h => h(App),
}).$mount('#app');