<template>
	<view>
		<no-data v-if="!commentList && commentList.length <= 0" desc="暂无评论"></no-data>
		<view v-else class="comment">
			<view class="comment-item" v-for="(item, index) in commentList" :key="index">
				<view class="info">
					<image mode="aspectFill" :src="item.userImage || '/static/tab/my.png'"></image>
					<view class="user">
						<view>{{item.name}}</view>
						<view>{{$util.dateFormat(item.createDate)}}</view>
					</view>
					<text :class="{grey: !item.isGood}" class="iconfont icon-haoping2"></text>
				</view>
				<view class="content">
					{{item.content}}
				</view>
				<view v-if="item.children && item.children.content" class="replay">
					<text>讲师回复：</text>
					<text>{{item.children.content}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			commentList: {
				type: Array,
				default: () => [
					{
						id: 1,
						nickName: '屈想顺',
						userImage: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/1ae87107-2943-4ba6-be2b-390ca27c6260.png',
						isGood: 1, // 1好评 2差评
						content: '戏曲很好听，值得学习，老师很专业',
						createDate: Date.now(), // 为了兼容小程序，不能使用new Date()
						children: null, // 回复
					},
					{
						id: 1,
						nickName: '顺',
						userImage: null,
						isGood: 0, // 1好评 2差评
						content: 'come on',
						createDate: '2022-04-24 09:00:00', 
						children: {
							id: 1,
							nickName: '苍老师',
							userImage: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/1ae87107-2943-4ba6-be2b-390ca27c6260.png',
							isGood: 0, // 1好评 2差评
							content: '我会继续努力的',
							createDate: '2022-04-25 09:00:00',
						}, // 回复
					}
				]
			}
		}
	}
</script>

<style lang="scss">
	.comment {
		font-size: 30rpx;
		padding: 0 36rpx;
		background-color: #FFFFFF;

		.comment-item {
			margin-top: 36rpx;
			border-bottom: $jh-underline;

			.info {
				display: flex;
				align-items: center;
				image {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50rpx;
					margin-right: 20rpx;
				}
				.user {
					font-weight: bold;
					line-height: 33rpx;
					:last-child {
						color: #999;
						font-size: 25rpx;
						font-weight: normal;
					}
				}
				:last-child {
					margin-left: auto;
					font-size: 35rpx;
					color: #FF001B;
				}
				.grey {
					color: $jh-text-color-grey;
				}
			}
			.content {
				margin: 25rpx 0;
			}
			.replay {
				color: #7D828F;
				background-color: #F8F9FB;
				padding: 15rpx;
				border-radius: 15rpx;
				margin-bottom: 30rpx;
			}
		}
	}
</style>
