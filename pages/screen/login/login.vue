/**
  * @description: 登錄頁面，使用微信一鍵登錄
  * @author jianyuan.deng@qq.com
  */
<template>
	<view class="flex-col container">
	  <image
	    src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/61a439de9eab8900119d4ca4/61a43b439eab8900119d4e0e/16381532452290125329.png"
	    class="image"
	  />
	  <view @click="doLogin" class="flex-col items-center button">
	    <text>微信用戶一鍵登錄</text>
	  </view>
	  <view class="flex-row user-policy-block">
	    <checkbox-group name="agreePolicy" @change="checkboxChange" class="user-policy-checkbox">
	    	<label class="flex-row">
	    		<checkbox style="transform:scale(0.5)" value="checked" :checked="userPolicyChecked" />
	    <text class="user-policy-content">
	      <text class="text_1">我已閱讀並同意</text>
	      <text class="text_2">《用戶協議》</text>
	      <text class="text_3">和</text>
	      <text class="text_4">《隱私政策》</text>
	    </text>
	    	</label>
	    </checkbox-group>
	  </view>
	</view>
</template>

<script>
    import { 
		mapState,
		mapMutations,
		mapActions, useStore
} from 'vuex'
import {reactive, watchEffect} from 'vue'
	export default {
		setup() {
			const store = useStore()
			watchEffect(() => {
				if(store.state.hasLogin){
					uni.navigateTo({
						url: '../main/main'
					})
				}
			})
		},
		data() {
			return { userPolicyChecked: false, }
		},
		computed: { ...mapState(['hasLogin']) },
		methods: {
			...mapActions(['login']),
			checkboxChange: function (e) {
				let values = e.detail.value
				this.userPolicyChecked = !!values[0]
			},
			doLogin: function (){
				if(this.userPolicyChecked){
					// 登錄
					this.login({ appletName: 'CUSTOMER' })
				} else {
					uni.showToast({
						title: '請先閱讀並同意用戶協議等相關說明',
						icon: 'none',
						duration: 2000
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.container {
  padding: 160rpx 40rpx 824rpx;
  background-color: #ffffff;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  .image {
    align-self: center;
    width: 226rpx;
    height: 156rpx;
  }
  .button {
    margin-top: 143rpx;
    padding: 27rpx 0;
    color: rgb(255, 255, 255);
    font-size: 32rpx;
    font-weight: 500;
    line-height: 45rpx;
    white-space: nowrap;
    background-color: rgb(250, 112, 0);
    box-shadow: 0px 4rpx 8rpx 0px rgba(247, 247, 247, 0.3);
    border-radius: 8rpx;
    position: relative;
  }
  .user-policy-block {
    padding-top: 30rpx;
	.user-policy-checkbox {
	  width: 40rpx
	}
    .user-policy-content {
    padding-top: 10rpx;
      margin-left: 14rpx;
      line-height: 28rpx;
      white-space: nowrap;
      height: 28rpx;
      .text_1 {
        color: rgb(102, 102, 102);
        font-size: 20rpx;
        font-weight: 500;
        line-height: 28rpx;
      }
      .text_2 {
        color: rgb(250, 112, 0);
        font-size: 20rpx;
        font-weight: 500;
        line-height: 28rpx;
      }
      .text_3 {
        color: rgb(102, 102, 102);
        font-size: 20rpx;
        font-weight: 500;
        line-height: 28rpx;
      }
      .text_4 {
        color: rgb(250, 112, 0);
        font-size: 20rpx;
        font-weight: 500;
        line-height: 28rpx;
      }
    }
  }
}
</style>
