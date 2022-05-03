<template>
	<!-- @touchmove.stop.prevent="()=>{}"防止抖动 -->
	<view class="tab-bar" @touchmove.stop.prevent="()=>{}">
		<view class="bar-view center">
			<view class="bar-item" :class="{active: index === value}" v-for="(item, index) in tabs" :key="index"
				@click="changeTab(index)">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
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
		methods: {
			changeTab(index) {
				// 改变tab，点击不同的标签才更改值
				if (this.value !== index) {
					// 1. props声明value；2. 修改它时触发input事件传递
					this.$emit("input", index)
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
		// background-color: red;
		border-bottom: 1rpx solid #EFEFF4;

		.bar-view {
			width: 100%;
			text-align: center;

			.bar-item {
				// flex: 1 表示把区域平均分配
				flex: 1;
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
