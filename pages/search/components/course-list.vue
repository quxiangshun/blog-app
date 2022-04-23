<template>
	<!-- 不能用v-if (i: 每个tab页的专属下标;  index: 当前tab的下标; 申明在 MescrollMoreItemMixin )-->
	<view v-show="i === index">
		<down-bar :params="params" @search="search" :downBars="downBars"></down-bar>
		<!-- top="120"下拉布局往下偏移,防止被悬浮菜单遮住 -->
		<!-- ref动态生成: 字节跳动小程序编辑器不支持一个页面存在相同的ref (如不考虑字节跳动小程序可固定值为 ref="mescrollRef") -->
		<mescroll-body :ref="'mescrollRef'+i" @init="mescrollInit" :down="downOption" @down="downCallback"
			:up="upOption" @up="upCallback" @emptyclick="emptyClick">
			<!-- 数据列表 -->
			<!-- <view v-for="i in 100" :key="i">{{i}}</view> -->
			<view style="padding: 0 30rpx;">
				<course-item v-for="(item, index) in list" :key="index" :item="item"></course-item>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	import downBar from './down-bar.vue'
	import downBars from '@/config/course-down-bar.js'
	import courseItem from '@/components/common/course-item.vue'
	import api from '@/api/course.js'
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		components: {
			downBar,
			courseItem
		},
		props: {
			i: Number, // 每个tab页的专属下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			index: { // 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
				type: Number,
				default () {
					return 0
				}
			},
			params: {
				type: Object,
				default: null
			},
			content: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				downBars: downBars(), //注意此处是调用方法，不要少了()
				searchData: {
					content: null, //关键字内容
					sort: null, // 排序（new/hot）
					isFree: null, // 0付费，1免费
					labelId: null, // 标签ID
					categoryId: null, // 分类ID
					
				},
				list: [],
				downOption: {
					auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption: {
					auto: false, // 不自动加载
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量
					},
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 空空如也 ~', // 提示
						btnText: '去看看'
					}
				}
			}
		},
		mounted() {
			// 如果有其他页面带的请求参数，则获取对应的请求参数值，将参数与this.searchData合并
			// Object.keys返回对象中所有的key名称，返回值数组
			this.params && Object.keys(this.searchData).forEach(key => {
				this.searchData[key] = this.params[key] || null
			})
			// console.log('mounted合并的searchData', this.searchData)
		},
		methods: {
			/**
			 * this.$emit('search', {labelId: labelId, categoryId: label.categoryId})
			 * @param {Object} data
			 */
			search(data) {
				// console.log('数据:::', data, this.content, this.params)
				// 合并关键字内容，去掉左右空格
				this.searchData.content = this.content && this.content.trim()
				// 对象拷贝，合并数据，data中的属性会合并到this.searchData对象属性值上
				Object.assign(this.searchData, data)
				
				// console.log('合并后数据:::', this.searchData)
				// 内容将page.name=1，在upCallback
				this.mescroll.resetUpScroll()
			},
			// 上拉加载的回调
			async upCallback(page) {
				// console.log('课程列表upCallback', page, this.searchData)
				// 根据分页条件查询列表数据
				const {data} = await api.getList(this.searchData, page.num, page.size)
				// 注意是声明的常量list
				const list = data.records
				if(page.num === 1) {
					this.list = []
					// 回到顶部（距离顶部的位置,时长毫秒数）
					this.mescroll.scrollTo(0, 0)
				}
				this.list = this.list.concat(list)
				
				// 请求成功，隐藏加载装填
				this.mescroll.endBySize(list.length, data.total)
			},
			//点击空布局按钮的回调
			emptyClick() {
				uni.showToast({
					title: '点击了按钮,具体逻辑自行实现'
				})
			}
		}
	}
</script>

<style>
</style>
