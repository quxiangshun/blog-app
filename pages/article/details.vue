<template>
	<view>
		<view class="tag-list row">
			<uni-tag class="tag-view" text="xxx" type="primary" size="small" circle="true" :inverted="true"></uni-tag>
			<uni-tag class="tag-view" text="xxx" type="primary" size="small" circle="true" :inverted="true"></uni-tag>
		</view>
		
		<view class="content-main">
			<text class="title">问答列表功能实现</text>
			<view class="info">
				<view class="author center">
					<image src="../../static/images/banner1.jpg" mode=""></image>
					<text>xxxx</text>
				</view>
				<text> · 2022-09-11</text>
				<text> · 199人阅读</text>
			</view>
			<!-- 文章内容 -->
			<!-- #ifdef MP -->
			<!-- nodes 是html代码字符串 -->
			<rich-text selectable="true" nodes="<h2 style='color:red'>内容</h2>"></rich-text>
			<!-- #endif -->
			<!-- #ifndef MP -->
			<text selectable="true" v-html="`<h2 style='color:blue'>内容</h2>`"></text>
			<!-- #endif -->
		</view>
		
		<view class="footer">
			<view class="comment">
				<view class="footer-header">热门评论</view>
				<view class="comment-item row">
					<image src="../../static/images/banner2.jpg"></image>
					<view class="comment-right">
						<view class="info space-between center">
							<text>xxxxx</text>
							<text>2022-08-09</text>
						</view>
						<text class="content">评论内容</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 评论区 -->
		<view class="bottom center" @touchmove.stop.prevent="()=>{}">
			<textarea class="textarea" placeholder="有何高见,展开讲讲..."></textarea>
			<button class="btn" size="mini">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: null, // 文章ID
			}
		},
		onLoad(option) {
			this.id = option.id
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	@import url('@/common/css/github-markdown.css');
	@import url('@/common/css/github-min.css');
	
	.tag-list {
		// 一行排列不下，换行
		flex-wrap: wrap;
		padding: 10rpx 25rpx;
		font-size: 14px;
		background-color: #ffffff;
		.tag-view {
			margin-top: 15rpx;
			margin-right: 20rpx;
		}
	}
    
	.content-main {
		padding: 25rpx;
		.title {
			font-size: 45rpx;
			line-height: 55rpx;
			font-weight: bold;
		}
		.info {
			display: flex;
			align-items: center;
			margin: 30rpx 0;
			.author {
				font-size: 30rpx;
				color: #303133;
				image {
					width: 45rpx;
					height: 45rpx;
					border-radius: 100%;
					margin-right: 10rpx;
				}
			}
			&>text {
				margin-left: 10rpx;
				font-size: 25rpx;
				color: #999;
			}
		}
	}

	.footer {
		background-color: #F1F1F1;
		padding-top: 10rpx;
		/* 标题 */
		.footer-header{
			font-size: 30rpx;
			color: #303133;
			font-weight: bold;
			padding: 25rpx;
			&:before{
				content: '';
				width: 0;
				height: 40rpx;
				margin-right: 25rpx;
				border-left: 6rpx solid $jh-color-primary;
			}
		}
	}
	
	/* 评论 */
	.comment {
		background-color: #FFFFFF;
		margin-top: 10rpx;
		// 最下方有评论按钮,
		padding-bottom: 120rpx;
		.comment-item {
			padding: 20rpx 25rpx;
			image{
				width: 50rpx;
				height: 50rpx;
				border-radius: 50rpx;
				margin-right: 20rpx;
			}
			
			.comment-right{
				width: calc(100% - 80rpx);
				font-size: 25rpx;
				color: $jh-text-color-grey;
				.content{
					font-size: 30rpx;
					color: $jh-text-color-black;
					margin: 10rpx 0;
				}
			}
		}
	}
	
	/* 底部 */
	.bottom {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		white-space: nowrap;// 不换行
		padding: 20rpx;
		background-color: #FFFFFF;
		border-top: $jh-underline;
		.textarea {
			font-size: 30rpx;
			padding: 15rpx 20rpx;
			width: 100%;
			height: 70rpx;
			background-color: #F8F9FB;
			border-radius: 30rpx;
		}
		.btn {
			padding: 0 20rpx;
			margin-left: 15rpx;
		}
	}
</style>
