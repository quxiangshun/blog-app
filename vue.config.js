module.exports = {
	devServer: {
		// 此处配置的跨域解决方案，如果在manifest.json文件中也配置，最终manifest.json中的配置会覆盖此配置。两种暗杆都可以解决跨域问题
		proxy: {
			"/api": {
				target: "https://mock.mengxuegu.com/mock/625d531166abf914b1f1c07a/jh-app",
				pathRewrite: {
					// 将请求地址 /api 替换为 ”“
					"^/api": ""
				}
			}
		}
	}
}
