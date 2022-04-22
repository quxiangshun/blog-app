<template>
	<!-- @touchmove.stop.prevent="()=>{}"防止抖动 -->
	<view class="down-bar row sticky-box" @touchmove.stop.prevent="()=>{}">
		<view class="one" v-for="(item, index) in downBarList" :key="index" @click="clickDownView(item)">
			<view class="center" :class="{active: item.active || item.id || item.id === 0}">
				<text>{{item.name}}</text>
				<text class="iconfont icon-down1" v-show="!item.active"></text>
				<text class="iconfont icon-up" v-show="item.active"></text>
			</view>
			<view class="item-list" v-show="item.active">

				<category class="category" v-if="item.isCategory"></category>
				<view class="name" :class="{active: info.name === item.name}" v-else v-for="(info, i) in item.list"
					:key="i" @click="changeInfo(item, info)">{{info.name}}</view>
			</view>

			<!-- 蒙层 -->
			<view class="cover" v-show="item.active"></view>
		</view>
	</view>
</template>

<script>
	import category from '@/pages/category/category.vue'
	export default {
		components: {
			category
		},
		props: {
			downBars: { // 下拉筛选相关内容
				type: Array,
				default: () => [{
						type: 'sort',
						name: '综合排序',
						active: false,
						list: [{
								id: null,
								name: '综合排序'
							},
							{
								id: 'new',
								name: '最新排序'
							},
							{
								id: 'hot',
								name: '热门排序'
							}
						]
					},
					{
						type: 'label',
						name: '全部分类',
						active: false,
						isCategory: true
					}
				]
			}
		},
		data() {
			return {
				// 将父组件传递的数据赋值给此属性，方便后面修改。直接修改downBars小程序不生效
				downBarList: []
			}
		},
		created() {
			this.downBarList = this.downBars
		},
		methods: {
			// 点击弹出
			clickDownView(item) {
				// 显示或隐藏弹窗
				this.downBarList.forEach(b => {
					// 将点击的这个显示或隐藏，其他全部隐藏
					b.active = item === b ? !item.active : false
				})
			},
			/**
			 * 选中下拉弹出窗口选项时触发
			 * @param {Object} item
			 * @param {Object} info
			 */
			changeInfo(item, info) {
				// 如果和上次点击的选项一样，则不重复查询
				if(item.name === info.name) return
				
				// 更改标题处显示名称
				item.id = info.id
				item.name = info.name
				
				// 查询数据(如果哪个页面引用该组件，则绑定一个search事件)
				this.$emit('search', {[item.type]: info.id})
			}
		}
	}
</script>

<style lang="scss">
	.down-bar {
		z-index: 100;
		background-color: #FFFFFF;
		font-size: 30rpx;
		line-height: 80rpx;
	}

	.item-list {
		z-index: 100;
		background-color: #FFFFFF;
		position: absolute;
		left: 0;
		right: 0;

		.name {
			padding-left: 80rpx;
		}

		.category {
			height: 580rpx;
		}
	}

	// 点击之后的效果
	.active {
		color: $jh-text-color-blue;
	}

	// 粘顶（滚动到底部停留在顶部）
	.sticky-box {
		position: -webkit-sticky; // Safari浏览器
		position: sticky; // 其他浏览器
		// var(--window-top)表示内容区域距离顶部的距离（APP和小程序是0， H5是NavigationBar 的高度）
		top: var(--window-top);
	}

	// 蒙层
	.cover {
		z-index: 99;
		position: fixed;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background-color: $jh-text-color-black;
		opacity: 0.2;
	}
</style>
