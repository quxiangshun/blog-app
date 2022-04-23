// 注意：不要直接导出默认数组（export default[...]），因为会被应用缓存起来
// 如果导出方法，每次进入页面都会初始化数据
export default () => {
	return [{
			type: 'sort',
			name: '综合排序',
			active: false,
			list: [{
					id: null,
					name: '综合排序'
				},
				{
					id: 'new',
					name: '最新排序'
				},
				{
					id: 'hot',
					name: '热门排序'
				}
			]
		},
		{
			type: 'isFree',
			name: '全部课程', // 约束：全部分类放在最后一个元素
			active: false,
			list: [{
					id: null,
					name: '全部课程'
				},
				{
					id: 0,
					name: '付费课程'
				},
				{
					id: 1,
					name: '免费课程'
				}
			]
		},
		{
			type: 'label',
			name: '全部分类', // 约束：全部分类放在最后一个元素
			active: false,
			isCategory: true
		}
	]
}
