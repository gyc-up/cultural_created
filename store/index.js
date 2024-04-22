// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	// 全局数据
	state: { //存放状态
		token: "",
		userInfo: {}
	},
	//全局计算属性
	getters: {

	},
	// 修改数据的方法
	mutations: {

	},
	// 全局操作方法
	actions: {

	}
})
export default store