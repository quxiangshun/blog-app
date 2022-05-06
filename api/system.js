import request from '@/common/js/request.js'

export default {

	/**
	 * 新增反馈信息接口
	 * @param {Object} data
	 */
	addFeedback(data) {
		return request({
			url: '/system/api/feedback',
			method: 'POST',
			data
		})
	},
	
	/**
	 * 发送短信验证码
	 * @param {Object} data
	 */
	sendSmsCode(data) {
		return request({
			url: '/system/sms/code',
			method: 'POST',
			data
		})
	},
	
	updateUserInfo(data) {
		return request({
			url: '/system/user',
			method: 'PUT',
			data,
			isLogin: true
		})
	}
}
