<template>
	<view>
	<view class="swap">
		 <swiper class="swiper" :circular="true" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="item in cards" :key="item.title">
				<view class='swap-card'>
				  <view class='line'>
					  <image src="/static/assets/everyday.png"></image>
					  <text class="tips">{{item.tips}}</text>
				  </view>
				  <view class='line'>
					  <view>
						  <text>当前已闯</text> 
						  <text class='strong'> {{item.count}} </text>    
						  <text>关</text>
					  </view>  
					  <view>
						  <text>已经完成</text>
						  <text class='strong'> {{item.process}}%</text>
					  </view>
				  </view>    
				  <view class='line progress-box'>                        
					<progress :percent="item.process" show-info stroke-width="4" activeColor="#86d461"/>
				  </view>
				  <view class='line center title'>
					<text>{{item.title}}</text>
				  </view>
				  <view class='line center'>
					{{item.saying}}
				  </view>
				  <view class='line placeholder'>
				  </view>
			  </view>
			</swiper-item>
		</swiper>
	</view>
	<!-- 主体内容 -->
	<view class="content">
		<!-- 闯关课程 -->
		<view class='card course'>
			<view class='card-title'>闯关课程</view>
			<view class='item-list'>
				<view class='item' v-for="item in courses" :key="item.id" @click="navigateToBookMenu(item.id)">
					<image :src='item.img' class="item-image"></image>
					<text class="item-title">{{item.name}}</text>
				</view>
			</view>
		</view>
		<!-- 辅助功能 -->
		<view class='card helper'>
			<view class='card-title'>辅助功能</view>
			<view class='item-list'>
				<view class='item' v-for="item in helpers" :key="item.name" @click="navigateToHelper(item)">
					<image :src='item.img' class="item-image"></image>
					<text class="item-title">{{item.name}}</text>
				</view>
			</view>
		</view>
		<!-- 推荐阅读 -->
		<view class='card article'>
			<view class='card-title'>推荐阅读</view>
			<view class='item-col-list'>
				<view class='item-row' v-for="item in article" :key="item.id"> 
					<view class="item-title">
						{{item.title}}            
					</view>
					<image :src='item.cover_img' class="item-image"></image>
				</view>
			</view>
			<view class="readMore arrow">阅读更多</view>
		</view>
	</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 1000,
				cards: [
				  {
					title: "四级闯关",
					tips: "距离四级考试还有**天",
					total:0,
					count: "0",
					process: 40,
					saying: "一步一个脚印，万里长征始于足下"
				  },
				  {
					title: "六级闯关",
					tips: "距离六级考试还有**天",
					total: 0,
					count: "0",        
					process: 0,
					saying: "一步一个脚印，万里长征始于足下"
				  },
				],
				courses: [
				  {
					"id": 1,
					"name": "四级闯关",
					"router": "",
					"status": false,
					"img": require("static/assets/CET4.png")
				  },
				  {
					"id":2,
					"name": "六级闯关",
					"router": "",
					"status": true,
					"img": require("static/assets/CET6.png")
				  }
				],
				helpers: [
				  {
					"name": "词根词缀",
					"router": "/pages/wordList/wordList",
					"img": require("static/assets/function01.png")
				  },
				  {
					"name": "作文模板",
					"router": "/pages/essayList/essayList?type=1",
					"img": require("static/assets/function02.png")
				  },
				  {
					"name": "极简语法",
					"router": "/pages/essayList/essayList?type=2",
					"img": require("static/assets/function03.png")
				  }
				],
				article: [
					{
						id: 1,
						title: "xxxxxx1",
						cover_img: require("static/assets/function03.png")
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			navigateToBookMenu(id) {
				uni.navigateTo({
				    url: '/pages/bookMenu/bookMenu?bookid=' + id
				});
			},
			navigateToHelper(item) {
				uni.navigateTo({
				    url: item.router
				});
			}
		}
	}
</script>

<style scoped lang="less">
// 轮播卡片
.swap{
  width: 100%;
	swiper{
	  height: 500rpx;
	  display: flex;	 
		.swap-card{
			box-sizing: border-box;
			height: 100%;
			margin: 10px;
			background: #fff;
			border-radius: 10rpx;
			box-shadow:14rpx 4rpx 5rpx 5rpx #f5f1f1;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.line {
				padding: 7px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				text-shadow: 1px 1px 1px rgb(99, 90, 90);
				image {
					width: 70px;
					height: 65px;
				}
				.tips {
					color: #86d461;
				}
				progress {
					width: 100%;
				}
				&.title {
					font-weight: bolder;
					color: #86d461;
				}
				&.center {
					justify-content: center;
				}
				&.placeholder {
					height: 30px;
				}
				.strong{
				    color: #86d461;
					margin: 0 5px;
				}
			}
		}
	}
}

// 主体内容
.content {
	padding: 10px;
	// 通用卡片样式
	.card{  
	  border-radius: 15rpx; 
	  box-shadow:4rpx 4rpx 5rpx 5rpx #f5f1f1;
	  display: flex;
	  flex-direction: column; 
	  padding: 10rpx;   
	  margin-bottom: 10px;
	  background: #fff;
	  .card-title{
	    color: #86d461;
	    height: 70rpx;
	    padding-left: 10rpx;
	    line-height: 70rpx;
	    border-left: 10rpx solid #86d461;
	    text-shadow: 1px 1px 1px rgb(99, 90, 90);  
	    border-bottom: 1rpx solid  #dadada;
	  }
	}
	// 我的课程， 辅助功能
	.course, .helper {
		.item-list{
		  display: flex;
		  flex-direction: row;
		  align-items: center; 
		  justify-content: space-around;
		  overflow-x: scroll;
		  
		  .item{
		    display: flex;
		    flex-direction: column;
		    align-items: center; 
		    justify-content: center;
		    font-size: 25rpx;
		    margin: 10rpx;
		    border-radius: 10rpx;
		    min-width: 120rpx;
		    min-height: 150rpx;
			.item-image{
			  width: 120rpx;
			  height: 150rpx;
			  border-radius: 10rpx;
			}
			.item-title {
				margin-top: 3px;
			}
		  }
		}		
	}
	// 推荐阅读
	.article {
		.item-col-list {
		  display: flex;
		  flex-direction: column;    
		  font-size: 30rpx;
		  
		  .item-row {
			display: flex; 
			border-bottom: 1rpx dotted rgb(230, 222, 222);
			flex-direction: row; 
			justify-content: space-between;  
			align-items: center; -webkit-align-items: center;
			align-content: center;  
			padding: 10rpx 15rpx;
			.item-title {
				font-size: 32rpx;
				font-weight: bold;
			}
			.item-image{
				width: 120rpx;
				height: 150rpx;
				border-radius: 10rpx;
			}
		  }
		}
		.readMore{
		    height: 70rpx;
			line-height: 70rpx;
		    font-size: 14px;
		    color: #666;    
		    margin-right: 30rpx;
		    display: flex;
		    justify-content: flex-end;
		}
	}
}

</style>
