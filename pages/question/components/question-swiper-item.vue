<template>
	<!-- 
	swiper中的transfrom会使fixed失效,此时用height固定高度; 
	swiper中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法,只能用mescroll-uni,不能用mescroll-body
	-->
	<!-- ref动态生成: 字节跳动小程序编辑器不支持一个页面存在相同的ref (如不考虑字节跳动小程序可固定值为 ref="mescrollRef") -->
	<!-- top的高度等于悬浮菜单tabs的高度 -->
	<mescroll-uni :ref="'mescrollRef'+i" @init="mescrollInit" :height="height" :down="downOption" @down="downCallback"
		:offset="0" :up="upOption" @up="upCallback">
		<!-- 数据列表 -->
		<question-item v-for="(item, index) in list" :key="index" :item="item"></question-item>
	</mescroll-uni>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	import QuestionItem from '@/components/common/question-item.vue'
	import api from '@/api/question.js'

	export default {
		components: {
			QuestionItem
		},
		mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		data() {
			return {
				downOption: {
					auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption: {
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量
					},
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 空空如也 ~', // 提示
					}
				},
				list: [], //列表数据
			}
		},
		props: {
			i: Number, // 每个tab页的专属下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			index: { // 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
				type: Number,
				default () {
					return 0
				}
			},
			tabs: { // 为了请求数据,演示用,可根据自己的项目判断是否要传
				type: Array,
				default () {
					return []
				}
			},
			height: [Number, String] // mescroll的高度
		},
		methods: {
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */

			async upCallback(page) {
				let res = null
				switch (this.index) {
					case 0:
						res = await api.getHotList(page.num, page.size)
						break;
					case 1:
						res = await api.getNewList(page.num, page.size)
						break;
					case 2:
						res = await api.getWaitList(page.num, page.size)
						break;
					default:
						break;
				}
				const data = res.data
				// 注意是声明的常量list
				const list = data.records
				if (page.num === 1) {
					this.list = []
					// 回到顶部（距离顶部的位置,时长毫秒数）
					this.mescroll.scrollTo(0, 0)
				}
				this.list = this.list.concat(list)

				// 请求成功，隐藏加载装填
				this.mescroll.endBySize(list.length, data.total)
			},
		}
	}
</script>
