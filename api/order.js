import request from '@/common/js/request.js'

export default {
	/**
	 * 查询当前用户的余额
	 */
	getUserBalance() {
		return request({
			url: '/pay/user/balance',
			isLogin: true
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
			data,
			isLogin: true
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
			data,
			isLogin: true
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
			data,
			isLogin: true
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
			data,
			isLogin: true
		})
	},

	/**
	 * 查询用户订单列表
	 */
	getUserOrderList() {
		return request({
			url: '/pay/order/user/list',
			isLogin: true
		})
	},
	/**
	 * 删除订单
	 * @param {Object} orderId
	 */
	deleteOrder(orderId) {
		return request({
			url: `/pay/order/${orderId}`,
			method: 'DELETE',
			isLogin: true
		})
	},
	/**
	 * 取消订单
	 * @param {Object} orderId
	 */
	cancelOrder(orderId) {
		return request({
			url: `/pay/order/cancel/${orderId}`,
			method: 'PUT',
			isLogin: true
		})
	},
}
