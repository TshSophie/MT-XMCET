<template>
	<view class='wrap'>
		<swiper previous-margin="50rpx" next-margin="50rpx" easing-function="linear">
		    <swiper-item v-for="card in cardlist" :key="card.weekNum" >
		        <view class='card'>
		            <view class='card-title'>
		                {{card.weekName}}
		            </view>
		            <view class='card-content'>
		                <view class='item' v-for="item in card.itemList" :key="item.id" @click="gotoCourseList(item)">
		                    <view class='left'>
		                        <view class='level-num'>{{item.title}}</view>
		                        <view class='level-name'>{{item.subTitle}}</view>
		                    </view>
		                    <view class='right'>                        
								<image v-if="item.status==1" src='/static/assets/new.png'></image>
								<image v-if="item.status==2" src='/static/assets/unlocked.png'></image>
								<image v-if="item.status==0||!item.status" src='/static/assets/lock.png'></image>
							</view>
						</view>
					</view>
					<view class='card-bottom'>
						<view class='left' @click="gotoVocabularyCollection(card)">词汇</view>
						<view class='right' @click="gotoWrongCollection(card)">错题集</view>
					</view>
				</view>
		    </swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bookid: '',
				cardlist:[
					{
						"weekNum":1,
						"weekName":"WEEK1",
						"itemList":[
						  { 
						    "id": 1, 
						    "title": "第1关", 
						    "subTitle": "Reading", 
						    "week": 1, 
						    "catid": 1, 
						    "status": 1 
						  },   
						 {
						   "id": 2, 
						   "title": "第2关", 
						   "subTitle": "Reading", 
						   "week": 1, 
						   "catid": 1, 
						   "status": 1 
						 },{
						   "id": 3, 
						   "title": "第1关", 
						   "subTitle": "Reading", 
						   "week": 1, 
						   "catid": 1, 
						   "status": 1 
						 }, {
						   "id": 4, 
						   "title": "第1关", 
						   "subTitle": "Reading", 
						   "week": 1, 
						   "catid": 1, 
						   "status": 1 
						 },{
						   "id": 5, 
						   "title": "第1关", 
						   "subTitle": "Reading", 
						   "week": 1, 
						   "catid": 1, 
						   "status": 1 
						 },{
						   "id": 6, 
						   "title": "第1关", 
						   "subTitle": "Reading", 
						   "week": 1, 
						   "catid": 1, 
						   "status": 1 
						 },  {
						   "id": 7, 
						   "title": "第1关", 
						   "subTitle": "Reading", 
						   "week": 1, 
						   "catid": 1, 
						   "status": 1 
						 },   
						]
					}, {
						"weekNum":2,
						"weekName":"WEEK2",
						"itemList":[
						  { 
						    "id": 33, 
						    "title": "第1关", 
						    "subTitle": "Reading", 
						    "week": 1, 
						    "catid": 1, 
						    "status": 1 
						  },                  
						]
					},            
				]
			}
		},
		onLoad(option) {
			 console.log(option.bookid); //打印出上个页面传递的参数。
			 this.bookid = option.bookid
			 // 重新设置标题
			 this.setNavBarTitle()
		},
		methods: {
			setNavBarTitle() {
				uni.setNavigationBarTitle({
				    title: '六级闯关'
				});
			},
			  // 跳转到课程列表页面
			  gotoCourseList(row) {
				var subId = row.subId
				var name = row.name
				var title = ''
				uni.navigateTo({
				  url: '/pages/courseList/courseList?subId=' + subId 
					  + '&title=' + title,
				})
			  },
		    // 跳转到词汇页面
		    gotoVocabularyCollection(card){
				uni.navigateTo({
				  url: '/pages/vocabularyCollection/vocabularyCollection?week=' + card.week + '&catId=' + card.catId
				})
			},
			// 跳转到错题集页面
			gotoWrongCollection(card){
				uni.navigateTo({
				  url: '/pages/wrongCollection/wrongCollection?week=' + card.week + '&catId=' + card.catId
				})
			}
		}
	}
</script>

<style scoped lang="less">

.wrap {
    width: 100%;
	height: 100%;
	padding: 15px 0;
	swiper {
		height: calc(100vh - var(--window-top) - 30px);
	}
	.card {
		height: 100%;			  
		padding-bottom: 100rpx;
		margin-right: 10px;
		border-radius: 20rpx;
		background: white;
		border: 1rpx solid #eee; 
		display: flex;
		flex-direction: column;
		
		.card-title {
			height: 100rpx;
			line-height: 100rpx;
			background: #86d461;
			color: #fff;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			padding-left: 15rpx;
			text-shadow: 1px 1px 1px rgb(99, 90, 90); 
		}
		.card-content {
			flex: 1;
			display: flex; display: -webkit-flex; 
			flex-direction: column;    
			background-color: white;
			overflow-y: scroll;
			
			.item {
				display: flex; display: -webkit-flex; 
				flex-direction: row;
				justify-content: space-between;
				align-items: center; -webkit-align-items: center;
				background-color: rgba(233, 230, 230, 0.801);  
				box-shadow: #fffffff2 2px 2px 20px 2px;
				margin: 10rpx;
				padding: 25rpx;
				border-radius: 10rpx;
				min-height: 90rpx;
				image {
					width: 50rpx;
					height: 50rpx;
				}
				.level-num {
					font-size: 26rpx;
					font-weight: bold;
				}
				.level-name {
					font-size: 28rpx;
					font-weight: bold;
				}
			}
		}
		.card-bottom {
			height: 100rpx; 
			line-height: 100rpx;   
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			font-size: 28rpx;
			color: #8a8484;  
			view {
				width: 50%;
				height: 100%;
				text-align: center; 
				border-top:  1rpx solid rgb(240, 231, 231); 
			}
			.left {
				border-right: 1rpx solid rgb(202, 199, 199);
			}
		}
	}
}

</style>
