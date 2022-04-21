<template>
	<view class="category row">
		<scroll-view class="left noScorll" scroll-y="true">
			<view class="title">
				<view :class="{active: index === activeIndex}" v-for="(item, index) in categoryList"
					@click.stop="getLabelList(index, item)">{{item.name}}
				</view>
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y="true">
			<view class="tag">
				<view v-for="(item, index) in labelList" @click="clickLabel(item)">{{item.name}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import api from '@/api/course.js'
	export default {
		data() {
			return {
				categoryList: [],
				labelList: [],
				activeIndex: 0,
			}
		},
		mounted() {
			this.loadCategoryData()
		},
		methods: {
			// 查询分类数据
			async loadCategoryData() {
				const {
					data
				} = await api.getCategoryList();
				this.categoryList = data
				// 获取当前选中的分类
				this.getLabelList(this.activeIndex, this.categoryList[0])
			},
			/**
			 * @param {Object} index 分类下标
			 * @param {Object} item 分类信息
			 */
			getLabelList(index, item) {
				// 选中样式
				this.activeIndex = index
				// 通过item获取标签
				this.labelList = item.labelList
			},
			// 点击标签到搜索页
			clickLabel(item) {
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.category {
		display: flex;
		height: 100%;

		.left {
			background-color: #F8F9FB;
			width: 260rpx;
			border-radius: 0 25rpx 25rpx 0;

			.title {
				view {
					color: #888888;
					text-align: center;
					font-size: 30rpx;
					width: 100%;
					padding: 55rpx 30rpx;
					// 在分类前面加上竖线表示激活
					// 在激活之前先把父元素取相对定位
					position: relative;

					&::before {
						position: absolute;
						content: '';
						width: 0;
						height: 0;
						border-right: 6rpx solid $jh-color-primary;
						border-radius: 30rpx;
						left: 0;
						top: 50%;
						// 切换过度效果
						transform: translateY(-50%);
						transform: 0.3s;
					}
				}

				.active {
					color: $jh-color-primary;
					font-size: 33rpx;
					font-weight: bold;

					&::before {
						height: 50rpx;
					}
				}
			}
		}

		.right {
			background-color: #FFFFFF;
			padding-left: 15rpx;
			margin: 0; // 全屏铺满

			.tag {
				display: flex;
				flex-wrap: wrap;
				padding-top: 35rpx;
				padding-left: 10rpx;

				view {
					font-size: 25rpx;
					line-height: 60rpx;
					border: 1rpx solid #999999;
					border-radius: 30rpx;
					min-width: 160rpx;
					text-align: center;
					padding: 0 5rpx;
					margin: 15rpx 5rpx;
				}
			}
		}
	}
</style>
