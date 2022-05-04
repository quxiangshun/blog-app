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
}
