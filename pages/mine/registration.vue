<template>
	<view class="content">
		<view class="logo">
			<image src="../../static/login-registration/logo.png" mode=""></image>
		</view>
		<view class="uni-form-item uni-column">
			<input type="tel" class="uni-input" name="" v-model="tel" placeholder="请输入手机号" />
		</view>
		<view class="uni-form-item uni-column">
			<input type="text" class="uni-input" name="" v-model="nickname" placeholder="请输入昵称" />
		</view>
		<view class="uni-form-item uni-column column-with-btn">
			<input type="text" class="uni-input" name="" placeholder="请输入图片验证码" v-model="captchaImg" />
			<image src="../../static/login-registration/captcha.jpg" mode="" class="img-captcha"></image>
		</view>
		<!-- <view class="uni-form-item uni-column column-with-btn">
			<input type="number" class="uni-input" name="" placeholder="请输入验证码" />
			<button :class="{active : !disableCodeBtn}" :disabled="disableCodeBtn"
				@tap="sendCode">{{codeBtn.text}}</button>
		</view> -->
		<view class="uni-form-item uni-column">
			<input type="password" class="uni-input" name="" v-model="password" placeholder="请输入密码" />
		</view>
		<button type="primary" @tap="registrat">注册</button>
		<view class="links">已有账号？<view class="link-highlight" @tap="gotoLogin">点此登陆</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel: null,
				nickname: '',
				password: '',
				captchaImg: '',
				seconds: 10,
				codeBtn: {
					text: '获取验证码',
					waitingCode: false,
					count: this.seconds
				}
			}
		},
		onLoad() {

		},
		methods: {
			registrat: function() {
				uni.request({
					url: 'http://115.159.159.162:2000/user/sign',
					method: 'POST',
					data: {
						addon: "value",
						address: "value",
						avatarUrl: "tesq",
						password: this.password,
						phone: this.tel,
						receiver: "value",
						uid: this.uid,
						username: 'test',
					},
					header: {
						'Access-Control-Allow-Origin': '*',
						'content-type': 'application/json'
					},
					success: (res) => {
						console.log(res.data.data);
						if (res.data.answer == true) {
							console.log("注册成功" + res.data.data.uid);

							uni.navigateTo({
								url: '/pages/mine/login?uid=' + res.data.data.uid
							});
						}
						// 处理注册成功后的逻辑
					},
					fail: (err) => {
						console.log('注册失败：', err);
						// 处理注册失败后的逻辑
					}
				});
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			sendCode: function() {
				this.codeBtn.waitingCode = true;
				this.codeBtn.count = this.seconds;
				this.codeBtn.text = this.codeBtn.count + 's';

				let countdown = setInterval(() => {
					this.codeBtn.count--;
					this.codeBtn.text = this.codeBtn.count + 's';
					if (this.codeBtn.count < 0) {
						clearInterval(countdown);
						this.codeBtn.text = '重新发送';
						this.codeBtn.waitingCode = false;
					}
				}, 1000);
			},
			gotoLogin: function() {
				uni.navigateTo({
					url: 'login'
				})
			}
		},
		computed: {
			disableCodeBtn: function() {
				return this.codeBtn.waitingCode || this.captchaImg.length < 4;
			}
		}
	}
</script>

<style lang="scss" scoped>
	$color-primary: #b49950;

	.content {
		padding: 60upx 100upx 100upx;
	}

	.logo {
		text-align: center;

		image {
			height: 200upx;
			width: 200upx;
			margin: 0 0 40upx;
		}
	}

	.uni-form-item {
		margin-bottom: 40upx;
		padding: 0;
		border-bottom: 1px solid #e3e3e3;

		.uni-input {
			font-size: 30upx;
			padding: 7px 0;
		}
	}

	.column-with-btn {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		button {
			font-size: 24upx;
			margin: 0;
			width: 180upx;
			text-align: center;
		}
	}

	.img-captcha {
		width: 150upx;
		height: 60upx;
	}

	button[type="primary"] {
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}

	.links {
		text-align: center;
		margin-top: 40upx;
		font-size: 26upx;
		color: #999;

		view {
			display: inline-block;
			vertical-align: top;
			margin: 0 10upx;
		}
	}
</style>