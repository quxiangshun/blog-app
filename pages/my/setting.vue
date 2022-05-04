<template>
	<view>
		<jh-list :list="list" @setWifiPlay="setWifiPlay" @setWifiDownload="setWifiDownload" @setAutoPlay="setAutoPlay"
			@clearStorage="clearStorage">
		</jh-list>
	</view>
</template>

<script>
	import list from '@/config/setting.js'
	export default {
		data() {
			return {
				list: list()
			}
		},
		methods: {
			setWifiPlay(obj) {
				this.setSwitchStatus(obj, 'wifi-play')
			},
			setWifiDownload(obj) {
				this.setSwitchStatus(obj, 'wifi-download')
			},
			setAutoPlay(obj) {
				this.setSwitchStatus(obj, 'auto-play')
			},
			setSwitchStatus(obj, key) {
				// 取反值就是要更新的
				const checked = !obj.checked
				console.log(key + 'checked', checked)
				this.$set(obj, 'checked', checked)
				uni.setStorage({
					key,
					data: checked
				})
			},
			clearStorage(obj) {
				uni.showModal({
					title: '您确定清除应用缓存吗？',
					content: '(该操作不会删除缓存课程)',
					success: (res) => {
						if (res.confirm) {
							uni.clearStorage()
							// 清空后赋值，此处设置后不用重新调用接口刷新，会自动绑定数据
							this.$set(obj, 'text', '0KB')
							this.$util.msg('清除成功')
							this.list = list()
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $jh-color-grey;
	}
</style>
