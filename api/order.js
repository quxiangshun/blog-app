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
	},

	/**
	 * 获取生成的订单信息-微信支付
	 * @param {Object} data
	 */
	getOrderInfoWxpay(data) {
		return request({
			url: '/pay/orderInfo/wxpay',
			method: 'POST',
			data
		})
	},

	/**
	 * 获取生成的订单信息-微信小程序支付
	 * @param {Object} data
	 */
	getOrderInfoWxmppay(data) {
		return request({
			url: '/pay/orderInfo/wxmppay',
			method: 'POST',
			data
		})
	},

	/**
	 * 获取生成的订单信息-支付宝支付
	 * @param {Object} data
	 */
	getOrderInfoAlipay(data) {
		return request({
			url: '/pay/orderInfo/alipay',
			method: 'POST',
			data
		})
	}
}
