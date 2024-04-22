<template>
	<view>
		<swiper class="home-swiper" circular :indicator-dots="false" :autoplay="true" :interval="3000" :duration="500">
			<swiper-item>
				<view class="swiper-item uni-bg-red">A</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-green">B</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-blue">C</view>
			</swiper-item>
		</swiper>

		<view class="divider"></view>
		<view>
			商品名称
		</view>
		<view>
			<view class="text">单选选中：{{JSON.stringify(radio2)}}</view>
			<uni-data-checkbox mode="button" v-model="radio2" :localdata="sex"></uni-data-checkbox>
		</view>
		<view>
			商品数量
			<uni-number-box @change="changeValue" />

		</view>
		<button>加入购物车</button>

	</view>

</template>


<script>
	export default {
		data() {

			return {
				info: [{
					content: '内容 A'
				}, {
					content: '内容 B'
				}, {
					content: '内容 C'
				}],
				radio2: 0,
				sex: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}, {
					text: '未知',
					value: 2
				}],
				mode: 'round',
				number: 0,
				selectedOption: null,
				value: 0
			}
		},
		methods: {
			change(value) {
				this.numberValue = value
			},
			increment() {
				this.number++;
			},
			decrement() {
				if (this.number > 0) {
					this.number--;
				}

			},
			selectOption(option) {
				this.selectedOption = option;
			},
			change(e) {
				this.current = e.detail.current;
			}
		}
	}
</script>

<style>
	.divider {
		width: 100%;
		border-bottom: 2px solid #000000;
		/* 水平线条样式，可以根据需要调整粗细、颜色等 */
		margin: 20px 0;
		/* 可以根据需要调整上下间距 */
	}

	,
	.text {
		font-size: 12px;
		color: #666;
		margin-top: 5px;
	}
</style>