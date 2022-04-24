<template>
	<view class="question-item">
		<text class="title text-ellipsis">{{item.title}}</text>
		<view class="foot space-between">
			<view class="">
				<text>{{item.reply}} 回答 · </text>
				<text>{{item.viewCount}} 浏览</text>
			</view>
			<view>
				<text>{{item.nickName}} · </text>
				<text>{{$util.dateFormat(item.updateDate)}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => ({
					id: 1,
					userId: 1,
					nickName: '顺',
					title: '朝花夕拾',
					reply: 96320,
					viewCount: 9999,
					updateDate: "2022-04-24 10:56:00"
				})
			}
		}
	}
</script>

<style lang="scss">
	.text-ellipsis {
		// 显示两行，超出部分...显示
		overflow: hidden;
		text-overflow: ellipsis; // 显示省略号
		-webkit-line-clamp: 1; // 最多1行
		display: -webkit-box; // 块是弹性的
		-webkit-box-orient: vertical; // 排列方式
		white-space: normal; // 空白显示
	}

	.question-item {
		padding: 30rpx;
		border-bottom: 1rpx solid #F1F1F1;
		min-height: 80rpx;

		.title {
			font-size: 35rpx;
			font-weight: bold;
		}

		.foot {
			text {
				font-size: 26rpx;
				color: #999;
				padding-right: 10rpx;
			}
		}
	}
</style>
