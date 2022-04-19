import { msg } from './util.js'

// 基础URL
// #ifndef H5
// 非h5端，
const BASE_URL = 'https://mock.mengxuegu.com/mock/625d531166abf914b1f1c07a/jh-app'
// #endif

// #ifdef H5
// h5, 进行代理转发
const BASE_URL = '/api'
// #endif

const request = (options = {}) => {
	// resolve 正常响应，reject异常响应
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			timeout: options.timeout || 8000, // 8秒超时时间，单位ms
			success: (res) => {
				// console.log('res', res.data)
				resolve(res.data)
			},
			fail: (err) => {
				// console.log('err', err)
				msg('请求接口失败')
				reject(err)
			}
		})
	}) 
}

// 导出
export default request