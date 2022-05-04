const rightIcon = 'iconfont icon-right'
export default () => {
	return [
		[{
				icon: 'jh-icon jh-icon-host-color', // 左侧图标
				title: '我的订单', // 左侧标题
				rightIcon, // 右侧图标
				page: '/pages/order/order', // 目标页面，配置行点击的时候跳转页面
				login: true, // true登录后才可以访问
				// event: null, // 点击触发事件名
				// checked: false, // 是否有Switch开关，且是否选中
				// src: '/static/logo.png', // 是否有图片地址
				// text: '10KB', // 右侧文字
			},
			{
				icon: 'jh-icon jh-icon-lock-color', // 左侧图标
				title: '我的余额', // 左侧标题
				rightIcon, // 右侧图标
				page: '/pages/order/my-balance', // 目标页面，配置行点击的时候跳转页面
				login: true, // true登录后才可以访问
			},
			{
				icon: 'jh-icon jh-icon-warn', // 左侧图标
				title: '我的学习', // 左侧标题
				rightIcon, // 右侧图标
				page: '/pages/my/study', // 目标页面，配置行点击的时候跳转页面
				login: true, // true登录后才可以访问
			}
		],
		[{
				icon: 'jh-icon jh-icon-set-color', // 左侧图标
				title: '设置', // 左侧标题
				rightIcon, // 右侧图标
				page: '/pages/my/setting', // 目标页面，配置行点击的时候跳转页面
			},
			{
				icon: 'jh-icon jh-icon-notice-color', // 左侧图标
				title: '意见反馈', // 左侧标题
				rightIcon, // 右侧图标
				page: '/pages/my/feedback', // 目标页面，配置行点击的时候跳转页面
			}
		],
		[{
			icon: 'jh-icon jh-icon-model-color', // 左侧图标
			title: '关于我们', // 左侧标题
			rightIcon, // 右侧图标
			page: '/pages/my/about', // 目标页面，配置行点击的时候跳转页面
		}]
	]
}
