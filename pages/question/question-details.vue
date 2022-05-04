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
			</view>
			<!-- 提问内容 -->
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
				<view class="footer-header">{{detailData.reply}}个回答</view>
				<view class="comment-item row" v-for="(item, index) in replyList" :key="index">
					<image :src="item.userImage || '/static/logo.png'"></image>
					<view class="comment-right">
						<view class="info space-between center">
							<text>{{item.nickName}}</text>
							<text>{{$util.dateFormat(item.createDate)}}</text>
						</view>
						<!-- 提问内容 -->
						<!-- #ifdef MP -->
						<!-- nodes 是html代码字符串 -->
						<rich-text class="markdown-body content" selectable="true" :nodes="item.htmlContent">
						</rich-text>
						<!-- #endif -->
						<!-- #ifndef MP -->
						<text class="markdown-body content" selectable="true" v-html="item.htmlContent"></text>
						<!-- #endif -->
					</view>
				</view>
			</view>
		</view>

		<!-- 关注和评论 -->
		<view class="question-option row">
			<text class="one iconfont icon-jiaguanzhu">关注问题</text>
			<!-- <text class="one grey">已关注问题</text> -->
			<text @click="showAnswerHandler" class="one iconfont icon-edit">回答问题</text>
		</view>

		<!-- 回答问题输入框 -->
		<view v-if="showAnswer" class="answer-box" @touchmove.stop.prevent="()=>{}">
			<view class="title center" @touchend.prevent="()=>{}">
				<view class="one">
					<text @touchend.prevent="showAnswerHandler" class="iconfont icon-close"></text>
				</view>
				<text class="one">回答问题</text>
				<button class="btn" type="primary" size="mini" :disabled="disabled || !content.trim()"
					@click="addReply">提交</button>
			</view>
			<textarea maxlength="500" class="textarea" v-model="content" placeholder="有何高见,展开讲讲..." :disabled="disabled"
				@focus="focus"></textarea>

		</view>

		<!-- #ifdef APP-PLUS -->
		<!-- 分享组件 -->
		<jh-share ref="jhShare" :shareData="{title: detailData.title}"></jh-share>
		<!-- #endif -->
	</view>
</template>

<script>
	import api from '@/api/question.js'
	export default {
		data() {
			return {
				id: null, // 文章ID
				detailData: {}, // 详情数据
				replyList: [], // 评论列表
				showAnswer: false, // 显示输入框
				content: '', // 评论内容
				disabled: true, // 未登录之前禁止评论
				focus: false, // 自动获取焦点
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getDetails()
			this.loadReplyList()
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
			async loadReplyList() {
				const {
					data
				} = await api.getReplyByQuestionId(this.id)
				this.replyList = data
			},
			showAnswerHandler() {
				const isLogin = this.$util.isLogin()
				if (!isLogin) this.showAnswer = !this.showAnswer
				if (this.showAnswer) {
					this.disabled = false
					this.$nextTick(() => {
						this.focus = true
					})
				}

			},
			async addReply() {
				if (!this.content) return
				this.focus = false
				uni.showLoading({
					title: '提交中...',
					mask: true
				})
				const content = this.content.trim()
				const data = {
					mdContent: content,
					htmlContent: content,
					questionId: this.id
				}
				uni.hideLoading()
				const res = await api.addQuestionReply(data)

				if (res.code === 20000) {
					this.showAnswer = false
					this.loadReplyList()
					this.$util.msg('回答成功', {
						icon: 'success'
					})
					this.content = ''
				} else {
					this.$util.msg('回答失败，请重试')
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
	.question-option {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 20rpx;
		background-color: $jh-color-grey;
		border-top: $jh-underline;
		text-align: center;

		text {
			font-size: 30rpx;
			font-weight: bold;
			line-height: 90rpx;
			color: $jh-text-color-blue;

			&:first-child {
				border-right: $jh-underline;
			}
		}

		.grey {
			color: $jh-text-color-grey;
		}
	}

	/* 底部 */
	.answer-box {
		z-index: 100;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx 0 0;
		box-shadow: 0 0 5px $jh-text-color-grey;

		.title {
			font-size: 35rpx;
			font-weight: bold;
			padding: 20rpx 0;
		}

		.iconfont {
			padding: 20rpx;
			color: $jh-color-primary;
		}

		.btn {
			padding: 0 20rpx;
			margin-left: 15rpx;
		}

		.textarea {
			height: 350rpx;
			font-size: 30rpx;
			padding: 15rpx 20rpx;
			width: 100%;
			background-color: #F8F9FB;
		}
	}
</style>
