<template>
	<view class="list-box">
		<view class="list" v-for="(item, index) in list" :key="index">
			<view v-for="(nav, i) in item" :key="i" @click="clickHandler(nav)" class="list-item space-between center"
				:hover-class="nav.checked || nav.checked === false ? '' : 'active'" :hover-start-time="50">
				<view class="left center">
					<text v-if="nav.icon" :class="nav.icon"></text>
					<text>{{nav.title}}</text>
				</view>
				<view class="right center">
					<text v-if="nav.text">{{nav.text}}</text>
					<!-- @click.stop="()=>{}"阻止父组件的点击事件，否则clickHandler方法会调用两次 -->
					<switch v-if="nav.checked || nav.checked === false" :checked="nav.checked" color="#345DC2"
						@click.stop="()=>{}" @change="clickHandler(nav)" />
					<image v-if="nav.src" :src="nav.src || '/static/logo.png'" mode=""></image>
					<text v-if="nav.rightIcon" :class="nav.rightIcon"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array
		},
		data() {
			return {

			};
		},
		methods: {
			clickHandler(nav) {
				if (nav.page) {
					this.navTo(nav.page, {
						login: nav.login
					})
					return
				}
				// 点击事件，传递给父组件
				if (nav.event) {
					this.$emit(nav.event, nav)
				}
			}
		}
	}
</script>

<style lang="scss">
	image {
		width: 80rpx;
		height: 80rpx;
	}

	.list-box {
		background-color: $jh-color-grey;
		padding-top: 20rpx;

		.list {
			background-color: #FFFFFF;
			margin-bottom: 20rpx;

			.list-item {
				padding: 26rpx 39rpx;
				border-bottom: $jh-underline;

				.left {
					font-size: 33rpx;

					text:first-child {
						margin-right: 20rpx;
					}
				}

				.right {
					text {
						font-size: 35rpx;
						color: $jh-text-color-grey;
						margin-left: 15rpx;
					}

					image {
						width: 120rpx;
						height: 120rpx;
						border-radius: 60rpx;
					}

					switch {
						margin-right: -10rpx;
					}
				}
			}
		}

		.active {
			background-color: #FAFAFA;
		}
	}
</style>
