<template>

	<view class="page-mask">
		<view class="center ">
			<view class="setting">
				<view v-for="(item, key) in itemList" :key="key" v-if="setting" @click="setting_modeify(key)">
					<view class="setting_box">
						<view class="box_word">{{ item.name }}
						</view>

					</view>
				</view>
			</view>
			<view class="center_top">
				<view class="mask"></view>
			</view>
			<view class="center_box_bg">
				<view class="profily">
					<view class="base">
						<view class="profily_header">

						</view>
						<text v-if="nickname==''" @click="login()">点击登陆</text>
						<text v-if="nickname!=''">{{nickname}} </text>
						<image src="../../static/fumou-center-template/setting.png" mode="" @click="setting_click">
						</image>
					</view>

					<view class="order_status">
						<view class="status" v-for="item in status" @click="statusclick(item)">
							<image class="icon" :src="item.url" mode="aspectFill"></image>
							<text>{{item.name}}</text>
						</view>
					</view>
				</view>
				<view class="baiban">

				</view>
				<view class="center_menu">
					<view class="menu_item" v-for="item in menus">
						<image :src="item.icon" mode="aspectFill"></image>
						<text>{{item.name}}</text>
					</view>
				</view>
				<view class="overlay" v-show="showPopup" @click="setting_click()"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPopup: false,
				setting: false,
				avatarUrl: '',
				tmp: '',
				token: '',
				tel: null,
				nickname: '',
				password: '',
				captchaImg: '',
				seconds: 10,
				itemList: [{
						key: 1,
						name: "  修改信息  "
					},
					{
						key: 2,
						name: "  退出登陆  "
					},
					{
						key: 1,
						name: "  切换账号  "
					}
				],
				status: [{
						key: 1,
						name: '待发货',
						url: '../../static/fumou-center-template/one.png',

					},
					{
						key: 2,
						name: '待收货',
						url: '../../static/fumou-center-template/2.png'
					},
					{
						key: 3,
						name: '待评价',
						url: '../../static/fumou-center-template/3.png'
					},
					{
						key: 4,
						name: '全部订单',
						url: '../../static/fumou-center-template/4.png'
					}
				],
				menus: [{
						name: '我的收藏',
						icon: '../../static/fumou-center-template/5.png',
						key: 1,
					},
					{
						name: '地址管理',
						icon: '../../static/fumou-center-template/6.png',
						key: 2,
					},

					{
						name: '帮助中心',
						icon: '../../static/fumou-center-template/8.png',
						key: 4,

					},
					{
						name: '意见反馈',
						icon: '../../static/fumou-center-template/9.png',
						key: 5,
					},
					{
						name: '关于我们',
						icon: '../../static/fumou-center-template/10.png',
						key: 6,
					}
				]
			};
		},

		onLoad(query) {
			this.token = query.token;
			this.getInformation();

		},
		onReady() {
			if (this.token != null) {
				console.log("找到用户")
				// element.style.backgroundColor = white;
				var element2 = document.querySelector('.profily_header')
				var element1 = document.querySelector('.center_top')
				element2.style.backgroundImage = "url('../../static/logo.png')";
				element1.style.backgroundImage = "url('../../static/logo.png')";
				// console.log("元素" + element2.style)

			} else
				console.log("未找到用户")
		},

		methods: {
			close() {
				this.showPopup = !this.showPopup
			},
			setting_modeify(key) {
				if (key == 0) {
					uni.navigateTo({
						url: "/pages/mine/modeify?token=" + this.token,
					})
				}
				if (key == 1) {
					uni.showModal({
						title: '提示',
						content: '是否确认退出登陆？',
						success: function(res) {
							if (res.confirm) {
								// 用户点击了确认按钮
								this.token = null,
									uni.reLaunch({
										url: '/pages/mine/mine' // 要重新加载的页面路径
									});

							} else if (res.cancel) {
								// 用户点击了取消按钮
								uni.showToast({
									title: '用户取消了退出登陆',
									icon: 'none',
									duration: 2000 // 设置显示时间为2秒，可根据需求调整
								})
							}
						}
					});
				}
				if (key == 2) uni.navigateTo({

				})

			},
			login() {
				uni.navigateTo({
					url: "/pages/mine/login"
				})
			},
			setting_click() {
				this.setting = !this.setting
				this.mask = !this.mask
				this.showPopup = !this.showPopup
				var settingBox = document.querySelector('.setting');
				settingBox.classList.toggle('show');
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
						}

					},
					fail: (err) => {
						console.log("获取失败：" + err);
					}
				});
			},
			statusclick(item) {
				console.log("点击了" +
					item.name)
				if (item.key === 1) {
					this.$router.push('/pages/zhoubian/zhoubian');
				} else if (item.key === 2) {
					this.$router.push('/pages/community/community');
				} else if (item.key == 3) {

				}
			}

		}
	}
</script>

<style lang="scss">
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9999;
	}

	page {
		height: 100%;
	}

	.profily,
	{
	border-radius: 8px;
	}

	.setting {
		position: absolute;
		left: 70%;
		top: 15%;
		z-index: 100;
		display: flex;
		padding-top: 15px;
		flex-direction: column;
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
	}

	.setting_box {
		width: 120%;
		height: 45px;
		border-color: black;
		line-height: 100%;
		background-color: black;
		display: flex;
		align-items: center;
		transition: transform 0.3s ease-in-out;
	}

	.setting.show {
		opacity: 1;
	}

	.setting_box:hover {
		transform: scale(1.1);
	}


	.center {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);

		&_top {
			height: 18%;
			background: url('../../static/fumou-center-template/header.jpg') no-repeat 0% 50%;
			background-size: cover;

			// background: #E6E6E6;
			.mask {
				background: rgba(0, 0, 0, .4);
				height: 100%;
			}
		}

		&_box_bg {
			background: #F9F9F9;
			position: relative;
			z-index: 1;

			.profily {
				position: absolute;
				width: 90%;
				margin: 0 auto;
				top: -100upx;
				left: 5%;
				background: #FEFEFE;
				padding: 35upx;
				box-sizing: border-box;
				box-shadow: 0px 2px 5px #EDEDED;
			}
		}
	}

	.base {
		display: flex;
		align-items: center;
		border-bottom: 2px solid #F6F6F6;
		padding-bottom: 35upx;
		position: relative;

		.profily_header {
			border-radius: 8px;
			height: 120upx;
			width: 120upx;
			background-image: url('../../static/fumou-center-template/header.jpg');
			background-size: 100%;
		}

		text {
			margin-left: 20px;
			font-size: 30upx;
		}

		image {
			position: absolute;
			height: 40upx;
			width: 40upx;
			right: 0px;
			top: 0px;
		}
	}

	.order_status {
		display: flex;
		justify-content: space-between;
		margin-top: 35upx;


		.status {
			width: 140upx;
			font-size: 24upx;
			text-align: center;
			letter-spacing: .5px;
			display: flex;
			flex-direction: column;

			.icon {
				width: 50upx;
				height: 50upx;
				margin: 0 auto;
				margin-bottom: 5px;

			}
		}
	}

	.box_word {
		margin-left: 10%;
		font-size: 17px;
		color: wheat;
	}

	.baiban {
		background: #FEFEFE;
		height: 300upx;
	}

	.center_menu {
		width: 100%;
		display: inline-block;

		.menu_item {

			font-size: 28upx;
			letter-spacing: 1px;
			padding: 14px 5%;
			background: #FEFEFE;
			overflow: hidden;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;
			border-bottom: 1px solid #EFEFEF;

			&:hover {
				background: #F6F6F6 !important;
			}

			&::after {
				content: '';
				width: 30upx;
				height: 30upx;
				position: absolute;
				right: 5%;
				background: url('../../static/fumou-center-template/right.png') no-repeat;
				background-size: 100%;
			}

			text:nth-of-type(1) {
				margin-left: 10px;
			}

			image {
				width: 40upx;
				height: 40upx;
			}

			&:nth-of-type(4) {
				margin-top: 10px;
			}
		}
	}
</style>