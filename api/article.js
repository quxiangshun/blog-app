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
			url: '/article/api/article/search',
			method: 'POST',
			data: {
				...query,
				current,
				size
			}
		})
	},
	/**
	 * 查询文章详情数据接口
	 * @param {Object} articleId
	 */
	getById(articleId) {
		return request({
			url: `/article/api/article/${articleId}`
		})
	},
	/**
	 * 根据文章ID获取评论列表
	 * @param {Object} articleId
	 */
	getArticleCommentById(articleId) {
		return request({
			url: `/article/api/commetn/list/${articleId}`
		})
	},
	/**
	 * 新增文章评论接口
	 * @param {Object} data
	 */
	addArticleComment(data) {
		return request({
			url: '/article/api/article/search',
			method: 'POST',
			data
		})
	},
}
