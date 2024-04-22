import {
	rejects
} from "assert"
import {
	resolve
} from "dns/promises"

const http = {
	baseUrl = "http://127.0.0.1:8000",
	request(config) {
		//config:请求配置对象
		config = beforeRequest(config)
		config.url = this.baseUrl + config.url

	}
}
//请求拦截器，在请求之前的函数
const beforeRequest = (config) => {
	return config
}