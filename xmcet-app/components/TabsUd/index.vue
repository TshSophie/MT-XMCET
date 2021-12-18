<template>
	<view class="tabs">
	    <scroll-view :scroll-x="true" class="tab-nav" :scroll-left="scrollLeft">
			  <view v-for="(item, index) in tabs" :key="index"
				@click="tabClick(index)"
				class="tab-nav-item"
				:class="currentName == index ? 'active':''">
				<view class="tabs-u">{{item.u}}</view>
				<view class="tabs-d">{{item.d}}</view>
			  </view>
	    </scroll-view>
	</view>
</template>

<script>
	export default {
		name:"swiperTabs",
		components:{
		},
		props: {
      		activeName: {
				type: Number,
				default: 0
			},
			value: {
				type: Number,
				default: 0
			},
			tabs: {
				required: true,
				type: Array
			}
		},
		watch: {
			activeName(value) {
				this.setCurrentName(value);
			},
			value(value) {
				this.setCurrentName(value);
			},
		},
		data() {
			return {
				currentName: this.value || this.activeName,
				scrollLeft: 0, //tab标题的滚动条位置 
				childList: [],
			};
		},
		methods:{
			tabClick(item) {
				this.currentName= item
				this.$emit('tab-click', item)
			},
			setCurrentName(value) {
				this.currentName = value
			}
		}
	}
</script>

<style lang="less" scoped>
.tabs {
	width: 100%;
	height: 60px;
	.tab-nav {
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		background: #F7F7F7;
		white-space: nowrap;
		.tab-nav-item {
		box-sizing: border-box;
			padding-top: 5px;
			height: 100%;
			width: 25%;
			display: inline-block;
			text-align: center;
			.tabs-u {
				height: 20x;
				line-height: 20px;
				font-size: 13px;
			}
			.tabs-d {
				flex: 1;
				line-height: 30px;
				font-size: 16px;
				font-weight: bolder;
			}
			&.active {
			  color: #86d461;
			  border-bottom: solid 3px #86d461;
			}
		}
	}
}
</style>
