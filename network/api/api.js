import { flyio, url } from './config.js';
//公共链接
export const Url = url;
//接口列表
export class Api {
    wxLogin = async () => {
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

    // 登录
    login = async (params) => {
        let code = await this.wxLogin();
        let res = await flyio.post('/account/doLogin', { code: code, appletName: params.appletName })
        return res;
    }
    //获取用户信息
    getUser = async () => {
        return flyio.get('/weixin/getUser')
    }
    //微信授权获取用户信息
    getUserInfo = async (params) => {
        return flyio.get('/weixin/getUSerInfo', params)
    }
    //微信授权获取手机号
    getMobel = async (params) => {
        return flyio.get('/weixin/getMobel', params)
    }
    //access_token
    access_token = async (params) => {
        return flyio.post('/power/index/access_token', params)
    }
    //内容检查
    msgSecCheck = async (params) => {
        return flyio.post('/power/index/msgSecCheck', params)
    }

}
export default new Api();