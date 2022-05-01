import request from '@/common/js/request.js'

export default {
	/**
	 * 查询当前用户的余额
	 */
	getUserBalance() {
		return request({
			url: '/pay/user/balance'
		})
	},
	/**
	 * 服务端订单支付-IOS
	 * @param {Object} data
	 */
	orderPayIOS(data) {
		return request({
			url: '/pay/order/pay',
			method: 'POST',
			data
		})
	}
}
