<template>
	<view class='list'>
	    <view class='item' v-for="item in list" :key="item.name" @click="gotoCourse(item)">
	      <text>{{item.name}}</text>
		  <image v-if="!item.status" src='/static/assets/lock.png'></image>
		  <image v-if="item.status == 1" src='/static/assets/new.png'></image>
		  <image v-if="item.status == 2" src='/static/assets/unlocked.png'></image>
	    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						name: '语法课',
						status: 1,
					},{
						name: '作文课',
						status: 2,
					},
				],
				title: '课程列表'
			}
		},
		onLoad(option) {
			 this.subId = option.subId
			 // 重新设置标题
			 this.setNavBarTitle()
		},
		methods: {
			setNavBarTitle() {
				uni.setNavigationBarTitle({
				    title: this.title
				});
			},
			gotoCourse() {
				
			}
		}
	}
</script>

<style scoped lang="less">
 .list{
    display: flex; display: -webkit-flex; 
    flex-direction: column;        
    overflow-y: scroll;
	.item{
	    display: flex; display: -webkit-flex; 
	    flex-direction: row;
	    justify-content: space-between;
	    align-items: center; -webkit-align-items: center;
	    background-color: #fff;
	    margin: 20rpx 30rpx;
	    padding: 25rpx;
	    border-radius: 10rpx;
	    min-height: 90rpx;    
		text{
		  font-size: 28rpx;
		}
		image{
		    width: 50rpx;
		    height: 50rpx;
		}
	}
}
</style>
