<template>
	<view class="feedback-box center column">
		<radio-group class="radio-group" @change="radioChange">
			<label>
				<radio value="1" checked color="#007AFF" style="transform: scale(0.7);" /><text>内容意见</text>
			</label>
			<label>
				<radio value="2" color="#007AFF" style="transform: scale(0.7);" /><text>产品建议</text>
			</label>
			<label>
				<radio value="3" color="#007AFF" style="transform: scale(0.7);" /><text>其他建议</text>
			</label>
		</radio-group>
		<textarea maxlength="500" v-model="formData.content" placeholder="请填写具体内容帮助我们了解您的意见和建议..." cols="30"
			rows="10"></textarea>

		<input maxlength="15" v-model="formData.qq" type="text" placeholder="请填写您的QQ">
		<input maxlength="25" v-model="formData.weixin" type="text" placeholder="请填写您的微信">
		
		<!-- #ifdef APP-PLUS -->
		<view class="location">
			<view class="">您的当前位置</view>
			<text>{{formData.location || '获取信息中'}}</text>
		</view>
		<!-- #endif -->
		
		<button type="primary" :loading="loading" :disabled="loading" @click="submitHandler">提交</button>
	</view>
</template>

<script>
	import api from '@/api/system.js'
	export default {
		data() {
			return {
				loading: false, 
				formData: {
					type: '',
					content: '',
					qq: '',
					weixin: '',
					location: null,
				},
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			uni.getLocation({
				geocode: true,
				success: (res) => {
					//console.log(':::::', res.address.province, res.address.city, res.address.district)
					this.formData.location=res.address.province + "/" + res.address.city + "/" + res.address.district
				}
			})
			// #endif
		},
		methods: {
			radioChange(e) {
				this.formData.type = e.detail.value
			},
			async submitHandler() {
				if(!this.formData.content || this.formData.content.trim().length < 10) {
					this.$util.msg('反馈内容至少输入10个字')
					return
				}
				if(!this.formData.qq && !this.formData.weixin) {
					this.$util.msg('微信和QQ至少填写一个')
					return
				}
				if(this.formData.qq && !this.$util.checkStr(this.formData.qq, 'QQ')) {
					this.$util.msg('QQ号不合法，请填写正确QQ号')
					return
				}
				if(this.formData.weixin && !this.$util.checkStr(this.formData.weixin, 'weixin')) {
					this.$util.msg('微信号不合法，请填写正确微信号')
					return
				}
				this.loading = true
				uni.showLoading({
					title: '提交中',
					mask: true
				})
				const res = await api.addFeedback()
				uni.hideLoading()
				this.loading = true
				if (res.code === 20000) {
					uni.showModal({
						content: '您的意见反馈成功',
						showCancel: false,
						success: () => {
							this.navBack()
						}
					})
				} else {
					this.$util.msg('反馈失败，请重试')
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $jh-color-grey;
	}
	
	.feedback-box {
		padding: 0 30rpx;
	}
	
	.radio-group {
		margin: 30rpx 0;
		.label {
			margin-right: 30rpx;
			font-size: 30rpx;
			color: $jh-text-color-black;
		}
	}
	textarea {
		border: 1px solid #E9E9E9;
		width: 100%;
		padding: 10rpx;
		line-height: 60rpx;
	}
	
	input {
		width: 100%;
		border: 1px solid #E9E9E9;
		padding: 10rpx;
		margin-top: 10rpx;
		height: 70rpx;
	}
	.location {
		margin: 50rpx 0;
		align-self: flex-start;
		color: $jh-text-color-grey;
		line-height: 50rpx;
		text {
			color: $jh-text-color-black;
		}
	}
	
	button[type=primary] {
		width: 100%;
		margin-top: 50rpx;
		background-color: $jh-text-color-blue !important;
	}
	
	.button-hover[type=primary] {
		width: 100%;
		margin-top: 50rpx;
		background-color: $jh-color-primary !important;
	}
</style>
