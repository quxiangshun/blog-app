<template>
	<view class="category row">
		<scroll-view class="left noScorll" scroll-y="true">
			<view class="title">
				<view :class="{active: index === activeIndex}" v-for="(item, index) in categoryList"
					@click.stop="getLabelList(index, item)">{{item.name}}
				</view>
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y="true">
			<view class="tag">
				<view v-for="(item, index) in labelList" @click.stop="clickLabel(item)">{{item.name}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import api from '@/api/course.js'
	export default {
		props: {
			// 搜索页将当前组件作为子组件，传递了对应标题处的对象
			value: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				categoryList: [],
				labelList: [],
				activeIndex: 0,
			}
		},
		mounted() {
			this.loadCategoryData()
		},
		/**
		 * 监听搜索框点击事件（监听原生导航按钮）
		 */
		onNavigationBarButtonTap(e) {
			// console.log('点击原生搜索框')
			if (e.index === 0) {
				// 通过封装的混合文件，跳转到搜索页
				this.navTo('/pages/search/search')
			}
		},
		methods: {
			// 查询分类数据
			async loadCategoryData() {
				const {
					data
				} = await api.getCategoryList();
				this.categoryList = data

				// 如果value有值，则是搜索页传递的数据
				if (this.value) {
					this.categoryList.forEach(item => {
						// 在每个分类中第一个位置添加‘不限’标签
						// id: 标签ID；name: 标签名称；
						// cname: 分类名称用于在标题中显示；categoryId：分类ID用于作为条件查询
						item.labelList.unshift({
							id: null,
							name: '不限',
							cname: item.name,
							categoryId: item.id
						})
					})
					this.categoryList.unshift({
						id: null,
						name: '全部分类'
					})
					// 弹出分类窗口，回显上次点击所在分类处（颜色是蓝色）
					this.activeIndex = this.value.activeIndex > -1 ? this.value.activeIndex + 1 : this.activeIndex
				}
				// 获取当前选中的分类
				this.getLabelList(this.activeIndex)
			},
			/**
			 * 获取标签列表(分类下标，分类信息)
			 * @param {Object} index 分类下标
			 * @param {Object} item 分类信息
			 */
			getLabelList(index, item) {
				// 选中样式
				this.activeIndex = index
				if (item && item.name === '全部分类') {
					this.searchPageChangeLabel(item)
					return
				}
				// 获取点击的分类对象
				const activeCategory = this.categoryList[index]
				// 通过分类对象获取标签列表
				this.labelList = activeCategory.labelList
			},
			// 点击标签到搜索页
			clickLabel(item) {
				if (this.value) {
					// 将点击的标签信息回显到搜索页（下拉筛选）进行搜索
					this.searchPageChangeLabel(item)
					return
				}
				// 注意： labelId一定要放在第一个位置，后面解析时需要使用，顺序不要乱
				const params = {
					labelId: item.id,
					name: item.name,
					activeIndex: this.activeIndex
				}
				this.navTo(`/pages/search/search?params=${JSON.stringify(params)}`)
			},
			/**
			 * 搜索页面弹窗选择标签
			 * @param {Object} item 标签信息
			 */
			searchPageChangeLabel(item) {
				// 判断用来避免重复点击
				// this.value.name上次名称(分类、标签)，item.name是点击的名称，item.name是分类名称
				if (this.value.name !== item.name && this.value.name !== item.cname) {
					// 如果父组件传递的是对象，则可以直接修改值
					// 如果有cname则是选择的‘不限’标签，否则是具体的标签名
					this.value.name = item.cname || item.name
					// 标签ID
					this.value.id = item.id || null
					// 分类ID（点击是‘不限’，就取分类ID）
					this.value.categoryId = item.categoryId || null
					this.$emit('searchByLabel', this.value)
				}
				// 关闭搜索页面的弹窗
				this.value.active = false
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.category {
		display: flex;
		height: 100%;

		.left {
			background-color: #F8F9FB;
			width: 200rpx;
			border-radius: 0 25rpx 25rpx 0;

			.title {
				view {
					color: #888888;
					text-align: center;
					font-size: 30rpx;
					width: 200rpx;
					line-height: 40rpx;
					padding: 55rpx 30rpx;
					// 在分类前面加上竖线表示激活
					// 在激活之前先把父元素取相对定位
					position: relative;

					&::before {
						position: absolute;
						content: '';
						width: 0;
						height: 0;
						border-right: 6rpx solid $jh-color-primary;
						border-radius: 30rpx;
						left: 0;
						top: 50%;
						// 切换过度效果
						transform: translateY(-50%);
						transform: 0.3s;
					}
				}

				.active {
					color: $jh-color-primary;
					font-size: 33rpx;
					font-weight: bold;

					&::before {
						height: 50rpx;
					}
				}
			}
		}

		.right {
			background-color: #FFFFFF;
			padding-left: 15rpx;
			margin: 0; // 全屏铺满

			.tag {
				display: flex;
				flex-wrap: wrap;
				padding-top: 35rpx;
				padding-left: 10rpx;

				view {
					font-size: 25rpx;
					line-height: 60rpx;
					border: 1rpx solid #999999;
					border-radius: 30rpx;
					min-width: 160rpx;
					text-align: center;
					padding: 0 5rpx;
					margin: 15rpx 5rpx;
				}
			}
		}
	}
</style>
