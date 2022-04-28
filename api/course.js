import request from '@/common/js/request.js'

export default {

	// 查询指定位置的广告信息
	getAdvertList(position = 1) {
		return request({
			url: `/article/api/advert/show/${position}`
		})
	},
	// 查询分类与标签信息
	getCategoryList() {
		return request({
			url: '/article/api/category/label/list'
		})
	},
	/**
	 * 条件分页查询课程列表
	 * @param {Object} query 条件对象
	 * @param {Object} current 当前页码
	 * @param {Object} size 每页显示多少条
	 */
	getList(query, current = 1, size = 10) {
		return request({
			url: '/course/api/course/search',
			method: 'POST',
			data: {...query, current, size}
		})
	},
	/**
	 * 通过课程ID查询课程基本信息
	 * @param {String, Number} id
	 */
	getCourseById(id) {
		return request({
			url: `/course/api/course/${id}`,
		})
	},
	/**
	 * 通过课程ID查询课程章节数据
	 * @param {String, Number} id
	 */
	getChapterSectionById(id) {
		return request({
			url: `/course/api/chapter/section/list/${id}`,
		})
	},
	/**
	 * 通过课程ID查询课程评论列表数据
	 * @param {String, Number} id
	 */
	getCourseCommentById(id) {
		return request({
			url: `/course/api/comment/list/${id}`,
		})
	},
	/**
	 * 通过课程ID查询课程套餐信息
	 * @param {String, Number} id
	 */
	getCourseGroupById(id) {
		return request({
			url: `/course/api/group/list/${id}`,
		})
	},
	/**
	 * 通过课程ID查询课程是否已购买
	 * @param {String, Number} courseId
	 */
	getCourseIsBuy(courseId) {
		return request({
			url: `/course/course/is-buy/${courseId}`,
		})
	},
	/**
	 * 通过课程ID查询已购买的课程列表
	 * @param {String, Number} courseId 课程ID
	 */
	getCourseBuyList(courseId) {
		return request({
			url: `/course/course/buy/list/${courseId}`
		})
	},
	addCourseComment(data) {
		return request({
			url: '/course/comment',
			method: 'POST',
			data
		})
	}
}
