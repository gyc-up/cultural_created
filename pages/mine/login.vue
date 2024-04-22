<template>
	<view class="content">
		<view class="logo">
			<image src="../../static/login-registration/logo.png" mode=""></image>
		</view>
		<view class="uni-form-item uni-column">
			<input type="tel" class="uni-input" name="" v-model="uid" placeholder="请输入账号" />
		</view>
		<view class="uni-form-item uni-column">
			<input type="password" class="uni-input" name="" v-model="password" placeholder="请输入密码" />
		</view>
		<button type="primary" @click="login">登陆</button>
		<view class="links">
			<view @tap="gotoForgetPassword">忘记密码？</view>
			<view>|</view>
			<view class="link-highlight" @tap="gotoRegistration">注册账号</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password: '',
				tel: '',
				uid: '',
			}
		},
		onLoad(query) {
			this.uid = query.uid; // 通过页面参数方式获取uid

			// 如果采用uni.getStorageSync方式获取uid，请确保在登录成功后将uid存储在本地存储中
			// const uid = uni.getStorageSync('uid');

			console.log("获取到的uid为：" + this.uid);

		},
		methods: {
			showMessage() {
				// 显示消息弹窗
				uni.showToast({
					title: '密码错误或用户不存在',
					icon: 'none',
					duration: 2000 // 设置显示时间为2秒，可根据需求调整
				});

				// 2秒后关闭消息弹窗
				setTimeout(() => {
					uni.hideToast();
				}, 2000);
			},
			login: function() {
				uni.request({
					url: 'http://115.159.159.162:2000/user/login',
					method: 'POST',
					data: {
						addon: "value",
						address: "value",
						avatarUrl: "https://img1.baidu.com/it/u=2171904609,2103444221&fm=253&app=138&size=w931&n=0&f=GIF&fmt=auto?sec=1708966800&t=d2a10b0351741952242ca94310f13644",
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
						if (res.data.answer == true) {
							console.log("登录成功");
							console.log("token: " + res.data.data);
							uni.reLaunch({
								url: '/pages/mine/mine?token=' + res.data.data
							});
						} else {
							this.showMessage();
						}
					},
					fail: (err) => {
						console.log('和服务器连接失败失败：', err);
						// 处理数据库连接失败后的逻辑
					}
				});
			},
			gotoRegistration: function() {
				uni.navigateTo({
					url: 'registration'
				});
			},
			gotoForgetPassword: function() {
				uni.navigateTo({
					url: 'forget-password'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	$color-primary: #b49950;

	.content {
		padding: 100upx;
	}

	.logo {
		text-align: center;

		image {
			height: 200upx;
			width: 200upx;
			margin: 0 0 60upx;
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

		.link-highlight {
			color: $color-primary
		}
	}
</style>