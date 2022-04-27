import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

import MescrollBody from "@/uni_modules/mescroll-uni/components/mescroll-diy/beibei/mescroll-body.vue";
Vue.component('mescroll-body', MescrollBody)

// 全局引入混合文件
import mixin from 'common/mixin/mixin.js'
Vue.mixin(mixin)

// 工具方法
// * 表示把这个文件中所有的方法都进行全局引入
import * as util from './common/js/util.js'
// 把util挂载到Vue原型上，在组件页面中通过this.$util.方法调用
Vue.prototype.$util = util

// 把env挂载到Vue原型上，在组件页面中通过this.$env.方法调用
import * as env from './config/env.js'
Vue.prototype.$env = env

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
