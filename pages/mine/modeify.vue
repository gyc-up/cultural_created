<template>
	<view class="content">
		<view v-if="!changeSuccess">
			<image class="head_image" src="../../static/logo.png" @click="head_modeify"></image>
			<view class="uni-form-item uni-column">
				<div class="flex-container">
					<label class="inline">淘宝账户 :</label>
					<input class="word inline" v-model="uid">
				</div>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<div class="flex-container">
				<label class="inline">昵称 :</label>
				<input class="word inline" v-model="name">
			</div>
		</view>

		<view class="uni-form-item uni-column">
			<div class="flex-container">
				<label class="inline">手机号 :</label>
				<input class="word inline" v-model="tel">
			</div>
		</view>
		<view class="uni-form-item uni-column">
			<div class="flex-container">
				<label class="inline">家庭住址 :</label>
				<input class="word inline" v-model="address">
			</div>
		</view>
		<view @click="modeify_pw" style="float: right;color: gray;margin-top: -3%;"> 修改密码</view>
		<button type="primary" @tap="changeSuccess = !changeSuccess" style="margin-top:20% ;">提交</button>

	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: null,
				uid: null,
				name: null,
				tel: null,
				address: null,
				changeSuccess: false
			}
		},
		onLoad(query) {
			this.token = query.token;
			this.getInformation()
		},
		methods: {
			modeify_pw() {
				uni.navigateTo({
					url: "/pages/mine/modeify_pw"
				})
			},
			head_modeify() {
				console.log("更换头像")
			},
			getInformation() {
				uni.request({
					url: 'http://115.159.159.162:2000/secure/get-info',
					method: 'GET',
					header: {
						'Access-Control-Allow-Origin': '*',
						'Authorization': this.token
					},
					success: (res) => {
						this.tmp = JSON.stringify(res.data);
						let tmpOb = JSON.parse(this.tmp); // 将 JSON 字符串解析为对象
						let message = tmpOb.data; // 获取 message 字段的值
						if (message) {
							this.nickname = message.username;
							this.avatarUrl = message.avatarUrl;
							console.log("获取成功：" + message);
							console.log(JSON.stringify(message));
							this.uid = message.uid;
							this.address = message.address;
							this.name = message.name;
							this.tel = message.tel;

						}

					},
					fail: (err) => {
						console.log("获取失败：" + err);
					}
				});
			},

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

	.head_image {
		display: flex;
		justify-content: center;
		height: 50px;
		width: 20%;
		display: block;
		margin: 0 auto;
		border-radius: 50%;
	}

	.word {
		margin-bottom: 5px;
		color: gray
	}

	.content {
		padding: 100upx;
	}

	.uni-form-item {
		margin-top: 35px;
		margin-bottom: 40upx;
		padding: 0;
		border-bottom: 1px solid #e3e3e3;

		.uni-input {
			font-size: 30upx;
			padding: 7px 0;
		}
	}

	.flex-container {
		display: flex;
		align-items: center;
	}

	.inline {
		display: inline-flex;
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

	button[type="primary"] {
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}
</style>