<template>
	<view class="car-count">
		<view class="cart-box" v-if='carts.length>0'>
			<view class="touch-item" v-for='(item,index) in carts' :class="item.isTouchMove == true?'touch-move-active':''" :key='item.id'
			 @touchstart="touchstart" @touchmove="touchmove" :data-index='index'>
				<view class="cartList clearfix">
					<view @click="selectList(index)" class="selBtn centerboth">
						<text class="iconfont" :class="item.selected==true?'car-sel':'car-unsel'"></text>
					</view>
					<view class="gmes">
						<view class='cartImg centerboth'>
							<image :src="item.img" mode="aspectFit"></image>
						</view>
						<view class="boxCount clearfix">
							<text class="gname line1">{{item.name}}</text>
							<view class="gtitle line1">{{item.spec_key_name}}</view>
							<view class="gprice"><text>￥</text>{{item.price}}</view>
						</view>
					</view>
					<view class="countBox centerboth">
						<view class="carSub" @click="changeNum(index,item.id,0)">
							<text class="iconfont car-sub"></text>
						</view>
						<view class="cartNum">{{item.number}}</view>
						<view class="carAdd" @click="changeNum(index,item.id,1)">
							<text class="iconfont car-add"></text>
						</view>
					</view>
					<text class="dleBtn" @click="deleteList(index,item.id)">删除</text>
				</view>
			</view>
		</view>
		<view class="botomBtn">
			<view @click="allSelBtn"  class="selBtn centerboth">
				<text class="iconfont" :class="selectAll?'car-sel':'car-unsel'"></text>
				<text>全选</text>
			</view>
			<view class="price">合计：<text class="fh">￥</text><text class="num">{{totalPrice}}</text></view>
			<view @click="jiesuan" class="yyBtn">结算({{totalNum}})</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			carts:{//提示信息字体颜色
				type: Array,
				default(){
					return []
				}
			}
		},
		data() {
			return{
				totalPrice: 0, // 总价，初始为0
				selectAll: false, // 全选状态，默认全选
				startX: 0, //开始坐标
				startY: 0,
				totalNum: 0,
			}
		},
		mounted() {
			this.allSelBtn();
			this.getTotalPrice();
		},
		created() {

		},
		computed: {
			
		},
		methods: {
			jiesuan:function(){
				var that = this;
				var idArr = [];
				var carId = that.carts;
				for(var i =0;i< carId.length ;i++){
					if(carId[i].selected == true){
						idArr.push(carId[i].id);
					}
				}
				
				if(idArr.length<=0){
					uni.showToast({
						title:'请选择要结算的商品',
						icon:'none'
					})
					return false;
				}
				var ids = idArr.toString(',');
				this.$emit('jsBtn',ids);
			},
			/**
			 * 修改商品数量
			 */
			changeNum:function(index,id,type) {
				var that = this;
				var carts = that.carts;
				var number = parseInt(carts[index].number);
				if(type==0){
					number = number - 1;
					if(number<=1){
						number = 1;
					}
				}else{
					number = number + 1;
				}
				carts[index].number = number;
				this.$emit('changeNum',carts);
			},
			/**
			 * 删除购物车当前商品
			 */
			deleteList(index,ids) {
				var that = this;
				let carts = that.carts;
				this.$emit('delBtn',carts,ids,index)
			},
			/**
			 * 当前商品选中事件
			 */
			selectList:function(index) {
				var leng = 0;
				var that = this;
				var carts = that.carts;
				var selected = carts[index].selected;
				carts[index].selected = !selected;
			
				for (var i = 0; i < carts.length; i++) {
					if (carts[i].selected == false) {
						that.selectAll = false;
					}
					if (carts[i].selected == true) {
						leng = leng + 1;
					}
				}
				if (leng == carts.length) {
					that.selectAll = true;
				}
				this.$emit('selThis',carts);
			},
			allSelBtn:function(e) {
				var that = this;
				var selectAll = that.selectAll;
				selectAll = !selectAll;
				var carts = that.carts;
			
				for (var i = 0; i < carts.length; i++) {
					carts[i].selected = selectAll;
				}
				that.selectAll = selectAll;
				this.$emit('selAllBtn',carts);
			},
			/**
			 * 计算总价
			 */
			getTotalPrice:function() {
				var that = this;
				var carts = that.carts; // 获取购物车列表
				var total = 0;
				var totalnum = 0;
				for (var i = 0; i < carts.length; i++) { // 循环列表得到每个数据
					if (carts[i].selected) { // 判断选中才会计算价格
						total += carts[i].number * carts[i].price; // 所有价格加起来
						totalnum = totalnum + parseInt(carts[i].number);
					}
				}
				that.totalNum = totalnum;
				that.totalPrice = total.toFixed(2);
			},
			touchstart: function(e) {
				var that = this;
				var carts = that.carts;
				//开始触摸时 重置所有删除
				carts.forEach(function(v, i) {
					0
					if (v.isTouchMove) //只操作为true的
						v.isTouchMove = false;
				});
				that.startX = e.changedTouches[0].clientX;
				that.startY = e.changedTouches[0].clientY;
				this.$emit('touchEv',carts);
			},
			//滑动事件处理
			touchmove: function(e) {
				var that = this;
				var carts = that.carts;
				var index = e.currentTarget.dataset.index, //当前索引
					startX = that.startX, //开始X坐标
					startY = that.startY, //开始Y坐标
					touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
					touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
					//获取滑动角度
					angle = that.angle({
						X: startX,
						Y: startY
					}, {
						X: touchMoveX,
						Y: touchMoveY
					});
				carts.forEach(function(v, i) {
					v.isTouchMove = false
					//滑动超过30度角 return
					if (Math.abs(angle) > 30) return;
					if (i == index) {
						if (touchMoveX > startX) //右滑
							v.isTouchMove = false
						else //左滑
							v.isTouchMove = true
					}
				})
				//更新数据
				this.$emit('touchEv',carts);
			},
			angle: function(start, end) {
				var _X = end.X - start.X,
					_Y = end.Y - start.Y
				//返回角度 /Math.atan()返回数字的反正切值
				return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
			}
		}
	}
</script>

<style scoped>
	
	@font-face {
	  font-family: 'iconfont';  /* project id 1143282 */
	  src: url('https://at.alicdn.com/t/font_1143282_zy7677qexck.eot');
	  src: url('https://at.alicdn.com/t/font_1143282_zy7677qexck.eot?#iefix') format('embedded-opentype'),
	  url('https://at.alicdn.com/t/font_1143282_zy7677qexck.woff2') format('woff2'),
	  url('https://at.alicdn.com/t/font_1143282_zy7677qexck.woff') format('woff'),
	  url('https://at.alicdn.com/t/font_1143282_zy7677qexck.ttf') format('truetype'),
	  url('https://at.alicdn.com/t/font_1143282_zy7677qexck.svg#iconfont') format('svg');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.car-add:before{
		content: "\e8a6";
	}
	.car-sub:before{
		content: "\e8a7";
	}
	.car-no:before{
		content: "\e64d";
	}
	.car-unsel:before{
		content: "\e63a";
	}
	.car-sel:before{
		content: "\e639";
	}
	.car-del:before{
		content: "\e622";
	}
	
	/*有商品时*/
	.car-count{
		width: 100%;
	}
	.cart-box {
		width: 100%;
		overflow: hidden;
	}
	
	.cartList {
		width: 100%;
		position: relative;
		padding: 20rpx 20rpx 20rpx 50rpx;
		font-size: 26rpx;
		-webkit-transition: all 0.4s;
		transition: all 0.4s;
		-webkit-transform: translateX(60px);
		transform: translateX(60px);
		margin-left: -60px;
		background: #fff;
		margin-top: 30rpx;
	}
	
	.boxCount {
		float: left;
	}
	
	.boxCount .gname {
		font-size: 32rpx;
		color: #333333;
	}
	
	.boxCount .gtitle {
		margin: 5rpx 0 15rpx 0;
		font-size: 24rpx;
		color: #999999;
	}
	
	.gprice {
		color: #e60012;
		font-size: 34rpx;
	}
	
	.gprice text {
		font-size: 24rpx;
	}
	
	.cartList .selBtn {
		position: absolute;
		left: 0;
		width: 50rpx;
		height: 100%;
		top: 0;
	}
	
	.cartList .selBtn image {
		width: 32rpx;
		height: 32rpx;
	}
	
	.cartList .cartImg {
		float: left;
		width: 145rpx;
		height: 145rpx;
		background: #f5f5f5;
		border-radius: 5rpx;
		overflow: hidden;
		margin-right: 20rpx;
	}

	.countBox {
		position: absolute;
		right: 140rpx;
		bottom: 25rpx;
		right: 10rpx;
		bottom: 20rpx;
	}
	
	.countBox .iconfont{
		font-size: 46rpx;
	}
	
	.cartNum {
		width: 80rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		font-size: 32rpx;
		color: #1a256a;
	}
	
	.dleBtn {
		position: absolute;
		right: 0;
		top: 0;
		width: 120rpx;
		height: 100%;
		text-align: center;
		background: #F13430;
		color: #ffffff;
		font-size: 30rpx;
		line-height: 164rpx;
		z-index: 9999;
		-webkit-transition: all 0.4s;
		transition: all 0.4s;
		-webkit-transform: translateX(70px);
		transform: translateX(70px);
	}
	
	.touch-move-active .cartList,
	.touch-move-active .dleBtn {
		-webkit-transform: translateX(0);
		transform: translateX(0);
	}
	
	.touch-move-active .dleBtn {
		right: -120rpx;
	}
	
	.botomBtn {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		background: #FFFFFF;
		box-shadow: #f3f3f3 0rpx -5rpx 10rpx;
		height: 98rpx;
		padding: 0 300rpx 0 30rpx;
		z-index: 99;
	}
	
	.botomBtn .price {
		float: right;
		line-height: 98rpx;
		font-size: 28rpx;
		color: #333333;
	}
	
	.botomBtn .price text {
		font-size: 24rpx;
		color: #e60012;
	}
	
	.botomBtn .price .num {
		font-size: 30rpx;
		font-weight: bold;
	}
	
	.botomBtn .yyBtn {
		position: absolute;
		right: 30rpx;
		width: 240rpx;
		height: 89rpx;
		font-size: 32rpx;
		background: #333333;
		color: #FFFFFF;
		text-align: center;
		border-radius: 5rpx;
		line-height: 89rpx;
		top: 5rpx;
	}
	
	.botomBtn .selBtn {
		position: absolute;
		height: 100%;
		float: left;
	}
	
	.botomBtn .selBtn image {
		width: 32rpx;
		height: 32rpx;
		margin: 0 10rpx;
	}
</style>
