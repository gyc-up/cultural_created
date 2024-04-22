<template>
	<view>
		<view
			style="background-image: url('https://img0.baidu.com/it/u=2382240346,2398815886&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1708794000&t=819986a89328f9bec82dc6d0a77636a4'); flex:100%,background-position: center;"
			class="background">
			<view>
				<!-- 轮播图 -->
				<swiper class="home-swiper lunbotu" circular :indicator-dots="true" :autoplay="true" :interval="3000"
					:duration="500">
					<swiper-item>
						<view class="swiper-item uni-bg-red">
							<image src="goods.banner">
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item uni-bg-green">B</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item uni-bg-blue">
							<image
								src="https://img1.baidu.com/it/u=1597221573,1460218444&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								class="picture">
							</image>
						</view>
					</swiper-item>

				</swiper>

				<view class="conner">

					<image
						src="https://img2.baidu.com/it/u=3850487763,2304446713&fm=253&fmt=auto&app=138&f=JPEG?w=412&h=309"
						class="wenchuangzhoubian">
					</image>

					<image
						src="https://img1.baidu.com/it/u=1149139940,3812164175&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333"
						class="wenchuangzhoubian">
					</image>


				</view>
				<view v-for="goods in list" :key="goods.productId">

					<!-- 			<uni-card class="card" :title="goods.title" :extra="goods.subTitle" :thumbnail="goods.banner"
						@click="good_click">

						<view>{{ goods.title }}</view>
						<view>{{ goods.subTitle }}</view>
						<view>价格: {{ goods.price }}</view>
					</uni-card> -->
					<uni-card class="card" :title="tit1" :cover="pic2" @click="good_click">

						<view>{{desc1}}</view>
						<view>价格: 3.0</view>
					</uni-card>
					<uni-card class="card" :title="goods.title" :extra="goods.subTitle" :cover="pic1"
						@click="good_click">

						<view>{{ goods.title }}</view>
						<view>{{ goods.subTitle }}</view>
						<view>价格: {{ goods.price }}</view>
					</uni-card>

				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				desc1: "复旦有校门，有校花，有校草，还有“校猫”，萌萌又悠闲的哈基米们与同学们朝夕相处",
				pic1: "https://pic1.zhimg.com/80/v2-b2048c931c1a61189629d4c1f5ed8fc8_1440w.webp",
				pic2: "https://pic1.zhimg.com/80/v2-0753f9dba2be1899423fb8fe10738e20_1440w.webp",
				tit1: "复旦大学冰箱贴",
				tit1: "复旦大学冰箱贴",
				list: [],
			}
		},
		onLoad() {
			this.getgood();
		},
		methods: {
			good_click() {
				uni.navigateTo({
					url: "/pages/home-page/detail"
				})
			},
			getgood() {
				uni.request({
					url: 'http://115.159.159.162:2000/product/list', // 后端API接口地址
					method: 'GET',
					header: {
						'Access-Control-Allow-Origin': '*'
					},
					success: (res) => {
						this.list = res.data
						console.log('数据获取成功：', res.data);
					},
					fail: (err) => {
						console.log('数据获取失败：', err);
					}
				});
			},
			shopping_car() {
				uni.navigateTo({
					url: "/pages/shop_cart/shop_cart"
				});
			},
			// wenchuangclick() {
			// 	uni.navigateTo({
			// 		url: "/pages/home-page/detail"
			// 	});
			// },
			// zhoubianclick() {
			// 	uni.navigateTo({
			// 		url: "/pages/zhoubian/zhoubian"
			// 	});
			// }
		}
	}
</script>

<style>
	.card {
		background-color: antiquewhite;
	}

	.picture {
		width: 100%;
		vertical-align: top;
		position: relative;
		top: -50px;
	}

	.background {
		background-size: cover;
		height: 85vh;
		overflow: auto;
	}


	.lunbotu {
		margin: 5%;
		border: 2px solid burlywood;
		border-radius: 2%;
	}

	.conner {
		justify-content: space-between;
		display: flex;
	}

	.wenchuangzhoubian {
		position: relative;
		text-align: center;
		margin: 6%;
		margin-top: 2%;
		margin-bottom: 2%;
		height: 75px;
		width: 42%;
		border-color: bisque;
		background-color: #fff;
		border: 20px;
		border-radius: 10%;
	}
</style>