<template>
	<view class="course-play">
		<!-- #ifndef APP-PLUS -->
		<video id="myVideo" style="width: 750rpx; height: 423rpx;" :poster="poster" :src="src" @ended="nextPlay"></video>
		<!-- #endif -->
		<jh-comment></jh-comment>
		<!-- 课程标题与详情按钮 -->
		<view class="space-between course-info">
			<text class="title">{{course.title}}</text>
			<view class="right" @click="navTo(`/pages/course/course-details?id=${id}`)">
				<text>详情</text>
				<text class="iconfont icon-right"></text>
			</view>
		</view>
		<!-- 课程列表 -->
		<course-dir :isBuy="true" :chapterList="chapterList" :activeObj="activeObj" @playVideo="changeVideo">
		</course-dir>

		<!-- 底部按钮 -->
		<view class="bottom center">
			<!-- #ifdef APP-PLUS -->
			<view class="btn-item one column" @click="share">
				<text class="iconfont icon-Share-Outline"></text>
				<text>分享</text>
			</view>
			<!-- #endif -->
			<view class="btn-item one column">
				<text class="iconfont icon-edit"></text>
				<text>评价</text>
			</view>
		</view>
		
		<!-- 分享组件 -->
		<jh-share ref="share" :shareData="course"></jh-share>
	</view>
</template>

<script>
	let videoContext = null
	let timer = null
	import courseDir from './components/course-dir.vue'
	import api from '@/api/course.js'
	export default {
		components: {
			courseDir
		},
		data() {
			return {
				// #ifndef APP-PLUS
				poster: 'https://pics6.baidu.com/feed/0e2442a7d933c895ff4183829e8c4cfa830200b0.jpeg?token=02d84b8835896cf4af92fdd5fc822d8d',
				src: 'https://vd3.bdstatic.com/mda-jkkgqi4rmyigr1gh/sc/mda-jkkgqi4rmyigr1gh.mp4',
				// #endif
				id: null, //课程ID
				course: {}, // 课程基本信息
				chapterList: [], // 课程章节列表
				activeObj: { // 列表选中的下标
					chapterIndex: 0,
					sectionIndex: 0
				}
			}
		},
		onLoad(option) {
			this.id = option.id
			this.loadData()
		},
		onReady() {
			// #ifndef MP-ALIPAY || APP-PLUS
			videoContext = uni.createVideoContext('myVideo', this)
			// #endif
		},
		methods: {
			loadData() {
				// 查询课程基本信息
				this.getCourseById()
				// 查询章节列表
				this.getCourseBuyList()

				// #ifndef APP-PLUS
				this.poster = this.course.mainImage
				const chapter = this.chapterList[this.activeObj.chapterIndex]
				const section = chapter && chapter.sectionList[this.activeObj.sectionIndex]
				this.src = section && section.videoUrl || null
				// #endif
			},
			/**
			 * 查询课程基本信息
			 */
			async getCourseById() {
				const {
					data
				} = await api.getCourseById(this.id);
				this.course = data
			},
			/**
			 * 查询课程基本信息
			 */
			async getCourseBuyList() {
				const {
					data
				} = await api.getCourseBuyList(this.id);
				this.chapterList = data
				// #ifdef APP-PLUS
				this.sendData2Nvue()
				// #endif
			},
			changeVideo(obj) {
				this.activeObj = obj.activeObj

				// #ifndef APP-PLUS
				videoContext.pause()
				this.src = obj.section && obj.section.videoUrl
				setTimeout(() => {
					videoContext.play()
				}, 300)
				// #endif

				// #ifdef APP-PLUS
				// 切换课程播放
				uni.$emit('video', {
					type: 'change',
					params: {
						section: obj.section,
						activeObj: this.activeObj
					}
				})
				// #endif
			},
			// #ifndef APP-PLUS
			// 视频播放结束后会回调该方法
			nextPlay() {
				// 1. 获取当前章的下一节课，如果有下一节课则播放下一节课
				let chapter = this.chapterList[this.activeObj.chapterIndex]
				let section = chapter && chapter.sectionList[this.activeObj.sectionIndex + 1]
				if(section && section.videoUrl) {
					// 播放当前章的下一节课
					this.activeObj.sectionIndex++ 
					this.playSection(section)
				} else {
					chapter = this.chapterList[this.activeObj.chapterIndex + 1]
					if(chapter && chapter.sectionList && chapter.sectionList.length > 0) {
						// 2. 当前章没有下一节课，就播放下一章的第一节课
						this.activeObj.chapterIndex++
						this.activeObj.sectionIndex = 0
						section = chapter && chapter.sectionList[this.activeObj.sectionIndex]
						// 播放视频
						this.playSection(section)
					} else {
						// 3. 没有下一章，暂停视频，提示已观看到最后一节课
						videoContext.pause();
						this.$util.msg('已观看最后一节课')
					}
				}
			},
			// 播放指定视频
			playSection(section) {
				if(section) {
					// 防止有播放的视频，先暂停再切换
					videoContext.pause()
					// 切换新课程
					this.src = section.videoUrl || ''
					setTimeout(() => {
						videoContext.play()
					}, 300)
				} else {
					this.$util.msg('视频资源不存在')
				}
				
			},
			// #endif
			// #ifdef APP-PLUS
			sendData2Nvue() {
				uni.$emit('video', {
					type: 'init',
					params: {
						course: this.course, // 课程信息
						chapterList: this.chapterList, // 课程列表
						activeObj: this.activeObj
					}
				})
			},
			share() {
				this.$refs.share.showHandler()
			}
			// #endif
		}
	}
</script>

<style lang="scss">
	.course-play {
		padding-bottom: 100rpx;
	}

	.course-info {
		padding: 30rpx;
		font-weight: bold;
		border-bottom: $jh-underline;
		font-size: 38rpx;

		.title {
			width: 500rpx;
			font-size: 35rpx;
			line-height: 60rpx;
			color: $jh-text-color-black;
		}

		.right>text {
			font-size: 28rpx;
			line-height: 60rpx;
			color: $jh-text-color-black;
		}
	}

	.bottom {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #FFFFFF;
		border-top: $jh-underline;

		.btn-item {
			text {
				text-align: center;
				color: $jh-text-color-grey;
				font-size: 25rpx;
			}
		}

		.iconfont {
			font-size: 38rpx !important;
		}
	}
</style>
