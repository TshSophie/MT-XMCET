<template>
	<view class="tabs">
	    <scroll-view :scroll-x="true" class="tab-nav" :scroll-left="scrollLeft">
			<view v-for="(item,index) in tabArr" :key="item.name" 
			class="tab-nav-item" 
			:class="currentTab == index ? 'active':''"
			@click="swichNav(index)">{{item.label}}
			</view>       
	    </scroll-view>
	    <!--内容合子  -->
		<!-- <view class="tab-content">
			<slot></slot>
		</view> -->
	   <!-- <swiper class="tab-content" :current="currentTab" duration="300" @change="switchTab">
			<swiper-item v-for="item in childList">
			</swiper-item>	
	   </swiper> -->
	   <view class="tab-content">
			<tab-swiper :childList="childList"></tab-swiper>
	   </view>
	</view>
</template>

<script>
	import tabSwiper from './tab-swiper.vue'
	export default {
		name:"swiperTabs",
		components:{
			tabSwiper
		},
		data() {
			return {
				currentTab: 0, //预设当前项的值
				scrollLeft: 0, //tab标题的滚动条位置               
				tabArr: [],
				childList: [],
			};
		},
		created() {
			this.tabArr = []
			this.childList = []
			for (let i = 0; i < this.$slots.default.length; i++) {
				const vnodeComOption = this.$slots.default[i].componentOptions
				this.tabArr.push(vnodeComOption.propsData)
				this.childList.push(vnodeComOption.children)
			}
		},
		mounted() {
			
			// console.log(this.tabArr)
			// console.log(this.childList)
		},
		methods:{
			swichNav(index) {
				this.currentTab = index
			},
			switchTab(event) {
				console.log(event)
			}
		}
	}
</script>

<style lang="less" scoped>
.tabs {
	.tab-nav {
		height: 80rpx;
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		line-height: 80rpx;
		background: #F7F7F7; 
		font-size: 16px; 
		white-space: nowrap;
		.tab-nav-item {
			display: inline-block;
			width: 25%;
			text-align: center;
			
			&.active {
			  color: #86d461;
			  border-bottom: solid 3px #86d461;
			}
		}
	}
	.tab-content {
		
	}
}
</style>
