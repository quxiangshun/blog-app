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
	},

	/**
	 * 分页查询热门回答列表接口(按照回复数降序)
	 * @param {Object} current 当前页码
	 * @param {Object} size 每页显示多少条
	 */
	getHotList(current = 1, size = 20) {
		return request({
			url: '/question/api/question/hot',
			method: 'POST',
			data: {
				current,
				size
			}
		})
	},

	/**
	 * 分页查询最新问题列表（按照更新时间排序）
	 * @param {Object} current 当前页码
	 * @param {Object} size 每页显示多少条
	 */
	getNewList(current = 1, size = 20) {
		return request({
			url: '/question/api/question/new',
			method: 'POST',
			data: {
				current,
				size
			}
		})
	},

	/**
	 * 分页查询最新问题列表接口（按更新时间降序）
	 * @param {Object} current 当前页码
	 * @param {Object} size 每页显示多少条
	 */
	getWaitList(current = 1, size = 20) {
		return request({
			url: '/question/api/question/wait',
			method: 'POST',
			data: {
				current,
				size
			}
		})
	},
	/**
	 * 查询问题详情数据接口
	 * @param {Object} questionId
	 */
	getById(questionId) {
		return request({
			url: `/question/api/question/${questionId}`
		})
	},

	/**
	 * 通过问题ID查询所有回答
	 * @param {Object} questionId
	 */
	getReplyByQuestionId(questionId) {
		return request({
			url: `/question/api/reply/list/${questionId}`
		})
	},

	/**
	 * 新增问题回答接口
	 * @param {Object} data
	 */
	addQuestionReply(data) {
		return request({
			url: '/question/reply',
			method: 'POST',
			data
		})
	},

	/**
	 * 关注问题接口（0未关注、1已关注）
	 * @param {Object} data
	 */
	starQuestion(questionId) {
		return request({
			url: `/question/question/star/${questionId}`,
			method: 'PUT'
		})
	},
}
