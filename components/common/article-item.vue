<template>
	<view class="article-item">
		<text class="title text-ellipsis">{{item.title}}</text>
		<view class="article-content row">
			<view class="left-text column">
				<text class="summary text-ellipsis"
					:style="'-webkit-line-clamp: ' + (item.imageUrl ? 5 : 2)">{{item.summary}}
				</text>
			</view>
			<view class="right-image" v-if="item.imageUrl">
				<image :src="item.imageUrl" lazy-load></image>
			</view>
		</view>
		<view class="article-info">
			<text class="iconfont icon-ren"></text>
			<text>{{item.nickName}} · </text>
			<text>{{$util.dateFormat(item.updateDate)}} · </text>
			<text class="iconfont icon-appreciate"></text>
			<text>{{item.thumhup}}</text>
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
					summary: '鲁迅作品',
					imageUrl: '',
					viewCount: 96320,
					thumhup: 9999,
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

	.article-item {
		padding: 30rpx;
		border-bottom: 1rpx solid #F1F1F1;

		.title {
			font-size: 35rpx;
			font-weight: bold;
		}

		.article-content {
			padding-top: 10rpx;

			.left-text {
				.summary {
					font-size: 20rpx;
					color: #999;
					-webkit-line-clamp: 5; // 最多5行
				}
			}

			.right-image {
				min-width: 220rpx;
				margin-left: 5rpx;

				image {
					width: 220rpx;
					height: 140rpx;
					border-radius: 10rpx;
				}
			}
		}

		.article-info {
			padding-top: 10rpx;

			text {
				font-size: 26rpx;
				color: #999;
				padding-right: 10rpx;

				&:first-child {
					color: #222222;
				}
			}
		}
	}
</style>
