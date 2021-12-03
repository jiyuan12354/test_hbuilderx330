var Fly = require('flyio/dist/npm/wx')//npm install flyio --save
var md5 = require('js-md5')//npm install js-md5 --save
require('promise.prototype.finally').shim() //npm install promise.prototype.finally@3.1.1 --save
var fly = new Fly
var newFly = new Fly
// 配置请求根域名
export const url = 'http://xxxxxxxxx/'
fly.config.baseURL = 'http://xxxxxxxxx/client/api/'
// 配置响应拦截器
newFly.config = fly.config
fly.interceptors.response.use(
    async function (response) {
        // 如果请求报错
        if (response.status !== 200) {
            //token过期
            if (response.status === 401) {
                fly.lock()
                //重新获取token
                let code = await wxLogin()
                return newFly.get('/account/doLogin', { code: code }).then(d => {
                    //request.headers["token"]  = d.data.token;
                    uni.setStorageSync('token', d.data.token)
                }).finally(() => fly.unlock()) //解锁后，会继续发起请求队列中的任务
                    .then(() => {
                        console.log(`重新请求：path:${response.request.url}，baseURL:${response.request.baseURL}`)
                        return fly.request(response.request)
                    })
            }
        } else {
            //只将请求结果的data字段返回
            return response.data
        }
        return response
    },
    err => {
        //发生网络错误后会走到这里
        return Promise.resolve('网络请求：ERROR！')
    }
)
// 配置请求拦截器
fly.interceptors.request.use(request => {

    request.headers['token'] = uni.getStorageSync('token')
    request.headers['appid'] = 'abcde'
    request.headers['openid'] = uni.getStorageSync('openid')
    var timestamp = Date.parse(new Date())
    request.headers['hash'] = md5('abcde' + timestamp + '123456')
    request.headers['timestamp'] = timestamp
    request.headers['Content-Type'] = 'application/x-www-form-urlencoded'


    return request
})
//获取垃圾code
var wxLogin = async () => {
    return await new Promise((resolve, reject) => {
        uni.login({
            success(res) {
                if (res.code) {
                    resolve(res.code)
                }
            }
        })
    })
}
export const flyio = fly