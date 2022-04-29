<template>
	<view>
		<view class="mask"></view>
		<view class="course-comment center column">
			<uni-rate :size="22"></uni-rate>
			<text class="desc">良好，课程还可以</text>
			<view class="input-box center">
				<textarea class="textarea" placeholder="请输入评价内容..."></textarea>
				<text class="btn">提交</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.course-comment {
		z-index: 100;
		position: fixed;
		left: 0;
		right: 0;
		width: 650rpx;
		margin: 0 auto;
		padding-top: 30rpx;
		font-size: 30rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		.desc {
			color: $jh-text-color-black;
			// 文字间隔
			letter-spacing: 2px;
			padding: 20rpx 0;
		}
		.input-box {
			border-top: $jh-underline;
			width: 100%;
			// 字体不换行
			white-space: nowrap;
		}
		.textarea {
			background-color: #F8F9FB;
			border-radius: 0 0 0 20rpx;
			height: 100rpx;
			font-size: 30rpx;
			padding: 10rpx;
			width: 100%;
		}
		.btn {
			padding: 0 15rpx;
			color: $jh-text-color-blue;
		}
	}
</style>
