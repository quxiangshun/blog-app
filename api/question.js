import request from '@/common/js/request.js'

export default {
	/**
	 * 条件分页查询文章列表
	 * @param {Object} query 条件对象
	 * @param {Object} current 当前页码
	 * @param {Object} size 每页显示多少条
	 */
	getList(query, current = 1, size = 20) {
		return request({
			url: '/question/api/question/search',
			method: 'POST',
			data: {
				...query,
				current,
				size
			}
		})
	}
}
