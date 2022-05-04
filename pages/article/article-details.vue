<template>
	<view>
		<view class="tag-list row">
			<uni-tag class="tag-view" :text="item.name" type="primary" size="small" circle="true" :inverted="true"
				v-for="(item, index) in detailData.labelList" :key="index"></uni-tag>
		</view>

		<view class="content-main">
			<text class="title">{{detailData.title}}</text>
			<view class="info">
				<view class="author center">
					<image :src="detailData.userImage || '/static/logo.png'" mode=""></image>
					<text>{{detailData.nickName}}</text>
				</view>
				<text> · {{$util.dateFormat(detailData.updateDate)}}</text>
				<text> · {{detailData.viewCount}}人阅读</text>
			</view>
			<!-- 文章内容 -->
			<!-- #ifdef MP -->
			<!-- nodes 是html代码字符串 -->
			<rich-text class="markdown-body" selectable="true" :nodes="detailData.htmlContent"></rich-text>
			<!-- #endif -->
			<!-- #ifndef MP -->
			<text class="markdown-body" selectable="true" v-html="detailData.htmlContent"></text>
			<!-- #endif -->
		</view>

		<view class="footer">
			<view class="comment">
				<view class="footer-header">热门评论</view>
				<view class="comment-item row" v-for="(item, index) in commentList" :key="index">
					<image :src="item.userImage || '/static/logo.png'"></image>
					<view class="comment-right">
						<view class="info space-between center">
							<text>{{item.nickName}}</text>
							<text>{{$util.dateFormat(item.createDate)}}</text>
						</view>
						<text class="content">{{item.content}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 评论区 -->
		<view class="bottom center" @touchmove.stop.prevent="()=>{}">
			<textarea class="textarea" v-model="content" placeholder="有何高见,展开讲讲..." :disabled="disabled" @focus="focus"
				@click="clickComment"></textarea>
			<button class="btn" size="mini" :disabled="disabled || !content.trim()" @click="addComment">提交</button>
		</view>

		<!-- #ifdef APP-PLUS -->
		<!-- 分享组件 -->
		<jh-share ref="jhShare" :shareData="{title: detailData.title, mainImage: detailData.imageUrl}"></jh-share>
		<!-- #endif -->
	</view>
</template>

<script>
	import api from '@/api/article.js'
	export default {
		data() {
			return {
				id: null, // 文章ID
				detailData: {}, // 详情数据
				commentList: [], // 评论列表
				content: '', // 评论内容
				disabled: true, // 未登录之前禁止评论
				focus: false, // 自动获取焦点
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getDetails()
			this.loadCommentList()
		},
		// #ifdef APP-PLUS
		/**
		 * 监听App端右上角分享按钮
		 * @param {Object} e
		 */
		onNavigationBarButtonTap(e) {
			if (e.type === 'share') {
				this.$refs.jhShare.showHandler()
			}
		},
		// #endif
		// #ifndef APP-PLUS || H5 || MP-BAIDU
		/**
		 * 针对小程序端分享
		 * @param {Object} res
		 */
		onShareAppMessage(res) {
			return {
				title: this.detailData.title,
				path: this.$util.routePath(),
				imageUrl: this.detailData.imageUrl
			}
		},
		// #endif
		methods: {
			/**
			 * 查询文章详情
			 */
			async getDetails() {
				const {
					data
				} = await api.getById(this.id)
				// 把标题设置到导航标题上
				uni.setNavigationBarTitle({
					title: data.title
				})
				// 图片在H5和小程序太大了，通过以下方式处理
				data.htmlContent = data.htmlContent.replace(/\<img/gi, '<img style="width:100%;height:auto"')

				this.detailData = data
			},
			/**
			 * 查询文章评论列表
			 */
			async loadCommentList() {
				const {
					data
				} = await api.getArticleCommentById(this.id)
				this.commentList = data
			},
			clickComment() {
				if (!this.disabled) return
				const isLogin = this.$util.isLogin()
				if (isLogin) {
					this.disabled = false
					this.$nextTick(() => {
						this.focus = true
					})
				}
			},
			async addComment() {
				if(!this.content) return 
				this.focus = false
				uni.showLoading({
					title: '提交中...',
					mask: true
				})
				const content =  this.content.trim()
				const data = {
					content,
					articleId: this.id
				}
				uni.hideLoading()
				const res = await api.addArticleComment(data)
				
				if(res.code === 20000) {
					this.loadCommentList()
					this.$util.msg('评论成功', {icon: 'success'})
					this.content = ''
				} else {
					this.$util.msg('评论失败，请重试')
				}
			}
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
		.footer-header {
			font-size: 30rpx;
			color: #303133;
			font-weight: bold;
			padding: 25rpx;

			&:before {
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

			image {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50rpx;
				margin-right: 20rpx;
			}

			.comment-right {
				width: calc(100% - 80rpx);
				font-size: 25rpx;
				color: $jh-text-color-grey;

				.content {
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
		white-space: nowrap; // 不换行
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
