export default () => {
	return [
		[{
			title: '允许非WIFI网络播放', // 左侧标题
			event: 'setWifiPlay', // 点击触发事件名
			checked: uni.getStorageSync('wifi-play') || false, // 是否有Switch开关，且是否选中
		}, {
			title: '允许非WIFI网络缓存', // 左侧标题
			event: 'setWifiDownload', // 点击触发事件名
			checked: uni.getStorageSync('wifi-download') || false, // 是否有Switch开关，且是否选中
		}, {
			title: '视频自动连续播放', // 左侧标题
			event: 'setAutoPlay', // 点击触发事件名
			checked: uni.getStorageSync('auto-play') || false, // 是否有Switch开关，且是否选中
		}],
		[{
			title: '清除应用缓存', // 左侧标题
			event: 'clearStorage', // 点击触发事件名
			text: uni.getStorageInfoSync().currentSize < 1024 ? uni.getStorageInfoSync().currentSize + 'KB' : (
				uni.getStorageInfoSync().currentSize / 1024).toFixed(2) + 'M', 
		}]
	]
}
