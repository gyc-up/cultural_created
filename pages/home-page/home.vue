<template>
	<view>
		<view
			style="background-image: url('https://img0.baidu.com/it/u=2332554685,1047124038&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=748'); float:inherit:100%,background-size: cover; background-position: center;"
			class="background">

			<!-- 轮播图 -->
			<swiper class="home-swiper lunbotu" circular :indicator-dots="true" :autoplay="true" :interval="3000"
				:duration="500">
				<swiper-item>
					<view class="swiper-item uni-bg-red">
						<img src="../../static/logo.png" class="logo_img">
						</img>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-green">
						<img src="https://img2.baidu.com/it/u=2754963767,4223784436&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1708362000&t=0c9dd32d8ef6299cf633c5ad3da77746"
							class="lunbotu_img">
						</img>
					</view>
				</swiper-item>
				<swiper-item>
					<view class=" swiper-item uni-bg-blue">
						<img src="https://img0.baidu.com/it/u=1985867372,3976359395&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
							class="lunbotu_img">
					</view>
				</swiper-item>
			</swiper>
			<view class='wenchuang'>
				文潮 GO
			</view>
			<view class="separator">
			</view>
			<view>
				<liu-goods-swiper :listTitle="listTitle" :goodsList="goodsList" :imgWidth="192" :imgHeight="152"
					:clickItem="chooseItem" style="color: red; font-size: 16px;">
				</liu-goods-swiper>
			</view>
			<view class="separator">
			</view>
			<view>
				<liu-goods-swiper :listTitle="title1" :goodsList="goodsList2" :imgWidth="192" :imgHeight="152"
					:clickItem="chooseItem" style="color: red; font-size: 16px;">
				</liu-goods-swiper>
			</view>
			<view class="separator">
			</view>
			<view>
				<liu-goods-swiper :listTitle="title2" :goodsList="goodsList1" :imgWidth="192" :imgHeight="152"
					:clickItem="chooseItem" style="color: red; font-size: 16px;">
				</liu-goods-swiper>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {

			return {
				list1: [],
				list2: [],
				list: [],
				//列表标题
				listTitle: '湖南科技大学',
				title1: '湖南大学',
				title2: '湖南师范大学',
				//列表数据
				goodsList1: [{
					icon: 'http://t15.baidu.com/it/u=2826482448,3226115243&fm=224&app=112&f=JPEG?w=500&h=500'
				}, {

					icon: 'https://img0.baidu.com/it/u=2793808971,3518955249&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=753'
				}, {

					icon: 'https://img1.baidu.com/it/u=930535372,1195063778&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=400'
				}, {
					id: 4,
					name: '牛油果',
					descr: '',
					icon: '/pagesB/static/fruit/img4.png'
				}, {
					id: 5,
					name: '提子',
					descr: '',
					icon: '/pagesB/static/fruit/img5.png'
				}, {
					id: 6,
					name: '奶油草莓',
					descr: '',
					icon: '/pagesB/static/fruit/img6.png'
				}],
				//列表数据
				goodsList2: [{

					icon: 'https://img1.baidu.com/it/u=175946549,3911374789&fm=253&fmt=auto&app=138&f=JPEG?w=520&h=390'
				}, {

					icon: 'https://img1.baidu.com/it/u=1795894929,3316213271&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375'
				}, {

					icon: 'https://img0.baidu.com/it/u=1258184031,637776848&fm=253&fmt=auto&app=138&f=JPEG?w=739&h=500'
				}, {

					icon: '/pagesB/static/fruit/img4.png'
				}, {

					icon: '/pagesB/static/fruit/img5.png'
				}, {

					icon: '/pagesB/static/fruit/img6.png'
				}],
				//列表数据
				goodsList: [{

					icon: 'https://img1.baidu.com/it/u=1809941625,4083266809&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300'
				}, {

					icon: 'https://img2.baidu.com/it/u=3121668343,2685769808&fm=253&fmt=auto&app=138&f=PNG?w=300&h=300'
				}, {

					icon: 'https://img0.baidu.com/it/u=3934070987,2843391486&fm=253&fmt=auto&app=138&f=JPEG?w=520&h=390'
				}, {

					icon: '/pagesB/static/fruit/img4.png'
				}, {

					icon: '/pagesB/static/fruit/img5.png'
				}, {

					icon: '/pagesB/static/fruit/img6.png'
				}]
			}
		},
		onLoad() {

		},
		methods: {
			chooseItem() {
				console.log("对产品的选择")
			},
			good_click() {
				uni.navigateTo({
					url: "/pages/home-page/detail"
				})
			},
		}
	}
</script>

<style>
	.logo_img {
		margin-left: 25%;
		border-color: bisque;
		max-height: 50%;
		max-width: 50%;
		background-color: #fff;
		border: 20px;
	}

	.separator {
		position: relative;
	}

	.separator::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1px;
		/* 分割线高度 */
		background-color: rgba(128, 128, 128, 0.5);
		/* 灰色透明分割线，RGBA 值表示颜色和透明度 */
	}

	.background {
		background-size: cover;
		overflow: auto;
	}

	.lunbotu {

		background-color: #fff;
		margin: 2%;
		border: 2px solid black;
		border-radius: 5%;
		border-color: bisque;

	}

	@font-face {
		font-family: 文创;
		src: url("/static/fonts/小豆岛山中月简-闪 常规(REEJI-Xiaodou-MoonGB-Flash-Regular).ttf");
	}

	.lunbotu_img {
		max-width: 100%;
		max-height: 100%;
	}

	.wenchuang {
		color: coral;
		font-size: 40px;
		font-weight: 600;
		font-family: 文创;
		text-align: center;
	}
</style>