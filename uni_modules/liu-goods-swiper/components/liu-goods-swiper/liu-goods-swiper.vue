<template>
	<view>
		<view class="subtitle">{{listTitle}}</view>
		<scroll-view scroll-x="true" class="scroll-box">
			<view :class="'item-box'+' bg'+((index+'').slice(-1))" v-for="(item,index) in goodsList" :key="index"
				@click="chooseItem(item)">
				<image :src="item.icon" :style="'width:'+imgWidth+'rpx;'+'height:'+imgHeight+'rpx;'" mode=""></image>
				<view class="item-name">{{item.name}}</view>
				<view class="item-descr">{{item.descr}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			listTitle: {
				type: String,
				default: ''
			},
			goodsList: {
				type: Array,
				default: () => []
			},
			imgWidth: {
				type: Number,
				default: 128
			},
			imgHeight: {
				type: Number,
				default: 128
			}
		},
		data() {
			return {}
		},
		methods: {
			//点击某个item
			chooseItem(item) {
				this.$emit("clickItem", item)
			}
		}
	}
</script>

<style>
	/deep/ ::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
		display: none;
	}
</style>
<style scoped>
	@font-face {
		font-family: head;
		src: url("../../../../static/fonts/也字工厂文德斯体.ttf");
	}

	.subtitle {
		padding: 13rpx 32rpx;
		font-size: 50rpx;
		font-weight: bold;
		color: #ffaa00;
		line-height: 35rpx;
		letter-spacing: 3px;
		font-weight: 1500;
		font-family: head;

	}

	.scroll-box {
		display: flex;
		white-space: nowrap;
		width: 100%;
		min-height: 200rpx;
	}

	.item-box {
		display: inline-block;
		width: 232rpx;
		height: 100%;
		text-align: center;
	}
</style>