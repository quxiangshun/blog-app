<template>
	<!-- @touchmove.stop.prevent="()=>{}"防止抖动 -->
	<view class="tab-bar" @touchmove.stop.prevent="()=>{}">
		<scroll-view class="bar-view noScorll" scroll-x="true" :scroll-with-animation="true" :scroll-left="scrollLeft">
			<view class="bar-item" :style="{width: `${itemWidth}px`}" :class="{active: index === value}"
				v-for="(item, index) in tabs" :key="index" @click="changeTab(index)">
				{{item.name}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// 定时器变量
	let timer = null
	export default {
		props: {
			// 此处声明value，而不用index或者其他属性表示，因为要使用vue的语法糖，v-model双向绑定：
			// 1. props声明value；2. 修改它时触发input事件传递
			value: {
				type: Number,
				default: 0
			},
			tabs: { // 标签选项数组
				type: Array,
				default: () => [{
						id: 0,
						name: "课程"
					},
					{
						id: 1,
						name: "文章"
					},
					{
						id: 2,
						name: "问答"
					}
				]
			}
		},
		watch: {
			tabs: {
				immediate: true,
				handler(newVal) {
					// 监听标签选项数组，小于5个，平均分配每个的宽度
					if (newVal && newVal.length < 5) {
						this.itemWidth = this.windowWidth / newVal.length
					}
				}
			}
		},
		data() {
			return {
				scrollLeft: 0, // 滚动条便宜位置（计算左右移动距离）
				windowWidth: uni.getSystemInfoSync().windowWidth, // 获取窗口宽度(单位：px)
				itemWidth: uni.upx2px(150), // 每个tab的宽度，默认是150（单位是rpx）,uni.upx2px(150)转成px
			}
		},
		methods: {
			changeTab(index) {
				// 改变tab，点击不同的标签才更改值
				if (this.value !== index) {
					// 1. props声明value；2. 修改它时触发input事件传递
					if (timer) {
						// 多次切换只执行最后一次
						clearTimeout(timer)
						timer = null
					}
					// 获取点击的这个距离左侧宽度
					let width = this.itemWidth * (index + 1)
					// 延迟400ms，以防用户切换太快
					timer = setTimeout(() => {
						// 点击的tab距离>屏幕的1/2（中间），则移动到中间
						if (width - this.itemWidth / 2 > this.windowWidth / 2) {
							this.scrollLeft = width - this.itemWidth / 2 - this.windowWidth / 2
						} else {
							this.scrollLeft = 0
						}
						this.$emit("input", index)
					}, 200)
				}
			}
		}
	}
</script>

<style lang="scss">
	.tab-bar {
		width: 100%;
		height: 80rpx;
		background-color: #FFFFFF;
		border-bottom: 1rpx solid #EFEFF4;

		.bar-view {
			width: 100%;
			white-space: nowrap;
			text-align: center;

			.bar-item {
				display: inline-block;
				width: 150rpx;
				font-size: 30rpx;
				// line-height和外层height一样就会上下居中
				line-height: 80rpx;
				position: relative;

				&::after {
					position: absolute;
					content: '';
					width: 0;
					height: 0;
					border-bottom: 6rpx solid $jh-text-color-blue;
					border-radius: 20rpx;
					left: 50%;
					bottom: 6rpx;
					transform: translateX(-50%);
					transition: 0.3s;
				}
			}

			.active {
				color: $jh-text-color-blue;

				&::after {
					width: 60rpx;
				}
			}
		}
	}
</style>
