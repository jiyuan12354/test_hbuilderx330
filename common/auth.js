/**
  * @description: 从storage中取出当前用户的认证信息
  * @author jianyuan.deng@qq.com
  */
const TokenKey = 'token'
const LocationKey = 'locationAuth'
const UidKey = 'uid'
const UserInfo = 'userInfo'
const Openid = 'openid'
// 获取token
export function getToken() {
    return uni.getStorageSync(TokenKey)
}
// 获取userinfo
export function getUserInfo() {
    return uni.getStorageSync(UserInfo)
}

// 保存token
export function setToken(token) {
    return uni.setStorageSync(TokenKey, token)
}
// 保存userinfo
export function setUserInfo(userInfo) {
    return uni.setStorageSync(UserInfo, userInfo)
}
// 保存openid
export function setOpenid(openid) {
    return uni.setStorageSync(Openid, openid)
}



