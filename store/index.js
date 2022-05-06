import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // vue的插件机制


// 构造器
const store = new Vuex.Store({
	state: { // 存放状态
		userInfo: {}, // 用户信息
		accessToken: '', // 访问令牌
	},
	getters: { // store的计算属性
		hasLogin(state) {
			// 取两次反，会将原数据类型转换成布尔类型
			return !!state.accessToken
		}
	},
	mutations: {
		// 更新登录状态
		setToken(state, data) {
			const {
				access_token,
				userInfo
			} = data
			if (access_token) {
				state.accessToken = access_token
				uni.setStorageSync('jhEducationToken', access_token)
			}

			if (userInfo) {
				state.userInfo = userInfo
				uni.setStorageSync('userInfo', userInfo)
			}
		},
		logout(state) {
			state.accessToken = ''
			uni.removeStorageSync('jhEducationToken')
			state.userInfo = {}
			uni.removeStorageSync('userInfo')
		},
		/**
		 * 只赋值状态值，不保存到本地
		 * @param {Object} state
		 * @param {Object} obj 
		 */
		setState(state, obj) {
			for (let key in obj) {
				state[key] = obj[key]
			}
		}
	}
})

export default store
