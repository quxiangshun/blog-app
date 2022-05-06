<template>
	<view>
		<no-data v-if="!stydyList && stydyList.length <= 0"></no-data>

		<mescroll-body v-else ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
			:up="upOption">
			<!-- 
				@init="mescrollInit" 
				@down="downCallback" 
				@up="upCallback"为固定值,不可删改(与mescroll-mixins保持一致)
				
				 :down="downOption" :up="upOption" 绝大部分情况无需配置
				 :top="顶部偏移量" :bottom="底部偏移量" :topbar="状态栏" :safearea="安全区" (常用)
				 字节跳动小程序 ref="mescrollRef" 必须配置
				 此处支持写入原生组件 -->
			<block v-for="(item, index) in stydyList" :key="index">
				<view class="course-item center" @click="navTo(`/pages/course/course-play?id=${item.id}`, {login: true})">
					<view class="left column">
						<text class="title text-ellipsis">{{item.title}}</text>
						<progress :percent="item.percent + '%'" show-info />
					</view>
					<view class="right">
						<image :src="item.mainImage" lazy-load="true"></image>
					</view>
				</view>
			</block>
		</mescroll-body>


	</view>
</template>

<script>
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import api from '@/api/course.js'

	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				stydyList: [],
				downOption: {
					textLoading: '加载中 ...' // 加载中的提示文本
				},
				upOption: {
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10, // 每页数据的数量
						// time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
					},
					textNoMore: '-- 我是有底线的 --', // 没有更多数据的提示文本
					onScroll: true // 是否监听滚动事件, 默认false, 仅mescroll-uni生效; mescroll-body直接声明onPageScroll (配置为true时,可@scroll="scroll"获取到滚动条位置和方向; 注意监听列表滚动是非常耗性能的,很容易出现卡顿,非特殊情况不要配置此项)
				},
			}
		},
		methods: {
			/*上拉加载的回调*/
			async upCallback(page) {
				let pageNum = page.num
				let pageSize = page.size
				const {
					data
				} = await api.getStudyList(page.num, page.size)
				console.log(data)
				this.stydyList = data.records

				const currentList = data.records

				// 判断是否是第一页，是则将原数据清空
				if (page.num === 1) this.stydyList = []
				//追加数据
				this.stydyList = this.stydyList.concat(currentList)

				// 请求成功，隐藏加载状态
				//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
				this.mescroll.endBySize(currentList.length, data.total);
			}
		}
	}
</script>

<style lang="scss">
	.course-item {
		width: 100%;
		padding: 30rpx 0;
		border-bottom: $jh-underline;

		.left {
			width: 435rpx;
			height: 160rpx;
			margin-right: 30rpx;
			justify-content: space-between;

			.title {
				font-size: 28rpx;
				font-weight: bold;
				line-height: 40rpx;
			}
		}

		.right {
			image {
				height: 160rpx;
				width: 230rpx;
				border-radius: 15rpx;
			}
		}
	}
</style>
