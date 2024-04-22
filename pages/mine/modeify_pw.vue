<template>
	<view class="content">
		<view class="uni-form-item uni-column">
			<div class="flex-container">
				<input type="password" class="uni-input" name="" v-model="password" placeholder="请输入原来的密码 :" />
				<input class="word inline">
			</div>


		</view>
		<view class="uni-form-item uni-column">
			<input type="password" class="uni-input" name="" v-model="new_password" placeholder="请输入新的密码" />
		</view>
		<view class="uni-form-item uni-column">
			<div class="flex-container">
				<input type="password" class="uni-input" name="" v-model="new_password2" placeholder="请输入再次输入新密码" />
			</div>
		</view>
		<button type="primary" @tap="changeSuccess = !changeSuccess" style="margin-top:20% ;">提交</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				password: null,
				new_password: null,
				new_password2: null

			}
		},
		onLoad(query) {
			this.token = query.token;
			this.getInformation()
		},
		methods: {
			modeify_pw() {
				console.log("修改密码")
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