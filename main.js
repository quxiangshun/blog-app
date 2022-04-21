import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

import MescrollBody from "@/uni_modules/mescroll-uni/components/mescroll-diy/beibei/mescroll-body.vue";
Vue.component('mescroll-body', MescrollBody)

// 全局引入混合文件
import mixin from 'common/mixin/mixin.js'
Vue.mixin(mixin)

App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
