<template>
	<view>
		<no-data v-if="!groupList && groupList.length <= 0" desc="暂无套餐"></no-data>
		<view v-else class="group-list" v-for="(item,index) in groupList" :key="index">
			<!-- elevation主要解决nvue文件中的Android设备阴影问题 -->
			<view class="group-item" elevation="12px">
				<text class="title">{{item.title}}</text>
				<course-item v-for="(course, ci) in item.list" :key="ci" :item="course"></course-item>
				<view class="price-box space-between center">
					<view>
						<text class="group-price">￥{{item.groupPrice}}</text>
						<text class="total-price">￥{{item.totalPrice}}</text>
					</view>
					<text class="buy" @click="buyGroupHandler(item)">购买套餐</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import courseItem from '@/components/common/course-item.vue'
	export default {
		components: {
			courseItem
		},
		props: {
			groupList: {
				type: Array,
				default: () => [
					{
						title: '黄梅戏',
						groupPrice: 888,
						totalPrice: 555.01,
						list: [
							{
								id: 1,
								mainImage: 'http://www.shjxled.com/data/upload/202102/20210214172843_550.jpg',
								totalTime: '12:20:59',
								title: '演唱',
								nickName: '马玉凯',
								studyTotal: 100,
								priceOriginal: 400,
								priceDiscount: 300,
							},
							{
								id: 2,
								mainImage: 'http://www.shjxled.com/data/upload/202102/20210214172843_550.jpg',
								totalTime: '120:20:59',
								title: '教学',
								nickName: 'qxs',
								studyTotal: 400,
								priceOriginal: 900,
								priceDiscount: 800,
							}
						]
					}
				]
			}
		},
		methods: {
			/**
			 * 购买套餐
			 */
			buyGroupHandler(item) {
				this.navTo(`/pages/order/confirm-buy?groupCourse=${encodeURIComponent(JSON.stringify(item))}`)
			}
		}
	}
</script>

<style lang="scss">
	.group-item {
		margin: 36rpx 30rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		box-shadow: 2px 0 10px 0 rgba(0, 0, 0, .1);
		padding: 0 20rpx;

		.title {
			font-size: 35rpx;
			font-weight: 500;
			line-height: 70rpx;
		}
		.price-box {
			color: $jh-text-color-red;
			font-size: 30rpx;
			font-weight: bold;
			.group-price {
				font-size: 37rpx;
				margin-right: 10rpx;
			}
			.total-price {
				color: #999;
				font-weight: normal;
				text-decoration: line-through;
			}
		}
	}
</style>
