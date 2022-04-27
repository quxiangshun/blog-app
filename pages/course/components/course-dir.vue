<template>
	<view class="course-dir">
		<view v-for="(item, index) in chapterList" :key="index">
			<text class="chapters text-ellipsis" style="-webkit-line-clamp: 1;">第{{index + 1}}章 {{item.name}}</text>
			<!-- 第几节 -->
			<view class="sections row" v-for="(section, si) in item.sectionList" :key="si"
				@click="playVideo(index, si, section)">
				<text class="iconfont icon-roundrightfill"></text>
				<view class="row">
					<text>{{index + 1}}-{{si + 1}}</text>
					<text class="title text-ellipsis" style="-webkit-line-clamp: 1;">{{section.name}}</text>
				</view>
				<text v-if="section.isFree && !isBuy" class="see">试看</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isBuy: { // 是否购买
				type: Boolean,
				default: false
			},
			chapterList: {
				type: Array,
				default: () => [{
					id: 1,
					name: '项目内容介绍',
					sectionList: [{
							id: 1,
							name: '什么是黄梅戏',
							isFree: 1, // 是否付费 0收费，1免费
						},
						{
							id: 2,
							name: '黄梅戏腔调',
							isFree: 0, // 是否付费 0收费，1免费
						}
					]
				}]
			}
		},
		methods: {
			/**
			 * 点击试看
			 * @param {Object} chapterIndex 第几章index
			 * @param {Object} sectionIndex 第几节index
			 * @param {Object} section 章节信息
			 */
			playVideo(chapterIndex, sectionIndex, section) {
				// 免费或已购买直接跳转到视频播放列表页面
				if (section.isFree || this.isBuy) {
					this.$emit('playVideo', {
						section
					})
				} else {
					this.$util.msg('请先购买')
				}
			}
		}
	}
</script>

<style lang="scss">
	.course-dir {
		padding: 0 36rpx;

		.chapters {
			color: $jh-text-color-black;
			font-size: 35rpx;
			font-weight: bold;
			margin-top: 30rpx;
			margin-bottom: 10rpx;
		}

		.sections {
			color: #3D3C40;
			font-size: 30rpx;
			border-bottom: $jh-underline;
			padding: 20rpx 0;
			line-height: 40rpx;

			text {
				margin-right: 10rpx;
			}

			.title {
				width: 470rpx;
			}

			.see {
				color: $jh-text-color-blue;
				font-size: 25rpx;
				// 靠右  flex: 1 表示把区域平分
				flex: 1;
				text-align: right;
			}
		}
	}
</style>
