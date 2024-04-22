### liu-goods-swiper适用于uni-app项目的横向滑动、左右滑动商品列表模版
### 本组件目前兼容微信小程序、H5
### 本组件是简单好用的左右滑动商品列表，支持各类样式自定义，简单易修改
# --- 扫码预览、关注我们 ---

## 扫码关注公众号，查看更多插件信息，预览插件效果！ 

![](https://uni.ckapi.pro/uniapp/publicize.png)

``` html
<liu-goods-swiper :listTitle="listTitle" :goodsList="goodsList" :imgWidth="192" :imgHeight="152" @clickItem="chooseItem"></liu-goods-swiper>
```
``` javascript
export default {
	data() {
		return {
			//列表标题
			listTitle: '应季热销',
			//列表数据
			goodsList: [{
				id: 1,
				name: '大甜梨',
				descr: '又大又甜又脆巨好吃',
				icon: '/pagesB/static/fruit/img1.png'
			},{
				id: 2,
				name: '猕猴桃',
				descr: '口感甜酸、可口',
				icon: '/pagesB/static/fruit/img2.png'
			},{
				id: 3,
				name: '樱桃',
				descr: '又大又甜水还多',
				icon: '/pagesB/static/fruit/img3.png'
			},{
				id: 4,
				name: '牛油果',
				descr: '果肉柔软、细腻',
				icon: '/pagesB/static/fruit/img4.png'
			},{
				id: 5,
				name: '提子',
				descr: '又大又甜水还多',
				icon: '/pagesB/static/fruit/img5.png'
			},{
				id: 6,
				name: '奶油草莓',
				descr: '酸酸甜甜很好吃',
				icon: '/pagesB/static/fruit/img6.png'
			}]
		};
	},
	methods: {
		//点击某一个item
		chooseItem(item){
			// 点击拿到整个当前点击的item 执行业务逻辑 
		}
	}
}
```

### 属性说明
| 名称                         | 类型            | 默认值               | 描述            |
| ----------------------------|--------------- | -------------------- | ---------------|
| goodsList             			| Array          | []             			| 列表数据
| listTitle            				| String         | ''           				| 默认卡片标题
| imgWidth              			| Number         | 128(rpx)            	| 图片宽度
| imgHeight              			| Number         | 128(rpx)            	| 图片高度
| @clickItem              			| Function         |             	| 点击菜单回调事件