import api from '@/api/order.js'
export default {
	data() {
		return {
			provider: 'alipay', // 支付方式
			loading: false, // 是否提交
			data: {}, // 订单信息服务接口所需请求参数，可能包含属性courseIds、openid、orderId、price

		}
	},
	onLoad(option) {
		// #ifdef MP-WEIXIN
		// 微信小程序选中微信支付
		this.provider = 'wxpay'
		// #endif
	},
	methods: {
		/**
		 * 切换支付提供商
		 * @param {Object} event
		 */
		radioChange(event) {
			this.provider = event.detail.value
		},
		/**
		 * 登录微信小程序，获取用户的openid
		 */
		loginWeixinMp() {
			return new Promise((resolve, reject) => {
				// 1. 登录微信小程序，获取code
				uni.login({
					provider: 'weixin',
					success: async (res) => {
						console.log('res', res.code)
						// 2. 童工code，调用后台服务接口，获取openid
						// TODO
						// const openid = await api.getUserOpenid()
						const openid = 'xxxxxxx'
						// 把openid放到本地，可以避免每次调用支付的时候都去获取openid
						uni.setStorageSync('openid', openid)
						resolve(openid)
					},
					fail: (err) => {
						reject(err)
					}
				})
			})
		},
		// 微信小程序支付
		async wxPayHandler() {
			this.loading = true
			let openid = uni.getStorageInfoSync('openid')
			if (!openid) {
				try {
					openid = await this.loginWeixinMp()
				} catch (e) {
					console.error(e)
				}
				if (!openid) {
					uni.showModal({
						content: '获取openid失败',
						showCancel: false
					})
					this.loading = false
					return
				}
			}
			this.data.openid = openid
			// 3. 通过openid调用后台服务接口获取订单信息
			const orderInfo = await this.getOrderInfo()
			// 4. 发起支付
			uni.requestPayment({
				...orderInfo,
				success: (res) => {
					this.$util.msg('支付成功!')
					// 跳转到订单页
					this.navTo(`/pages/order/order`)
				},
				fail: (err) => {
					uni.showModal({
						content: '支付失败!，原因：' + err.errMsg,
						showCancel: false
					})
				},
				complete: () => {
					this.loading = false
				}
			})

		},
		// 安卓端APP支付
		async payHandler() {
			this.loading = true
			// #ifdef APP-PLUS
			// 1. 获取订单信息
			const orderInfo = await this.getOrderInfo()
			if (!orderInfo) {
				uni.showModal({
					content: '获取订单信息失败',
					showCancel: false
				})
				return
			}
			// 2. 发送支付请求
			uni.requestPayment({
				provider: this.provider,
				orderInfo: orderInfo,
				success: (e) => {
					uni.showModal({
						content: '支付成功!',
						showCancel: false
					})
					// 跳转到订单页
					this.navTo(`/pages/order/order`)
				},
				fail: (e) => {
					console.log('支付失败', e)
					uni.showModal({
						content: '支付失败!',
						showCancel: false
					})
				},
				complete: () => {
					this.loading = false
				}
			})
			// #endif

			// #ifdef H5
			// H5的支付逻辑需要单独实现
			// #endif
		},
		/**
		 * 获取预支付订单信息
		 * @param {Object} openid
		 */
		getOrderInfo() {
			return new Promise(async (resolve, reject) => {

				// 提交给后台的数据（字形扩展），用于后台校验订单数据以及课程金额是否正确
				// let data = {
				// 	courseIds: this.courseIds,
				//  orderId: orderId,
				//  openid: openid,
				//  price: price,
				// }
				let res;
				// 如果openid有意义，则是微信小程序发送请求到服务端获取订单信息
				if (this.data.openid) {
					res = await api.getOrderInfoWxmppay(this.data)
				} else if (!this.data.openid && this.provider === 'alipay') {
					res = await api.getOrderInfoAlipay(this.data)
				} else if (!this.data.openid && this.provider === 'wxpay') {
					res = await api.getOrderInfoWxpay(this.data)
				}
				if (res.code === 20000) {
					resolve(res.data)
				} else {
					reject(new Error('获取支付信息失败，原因：' + res.message))
				}
			})
		},
	}
}
