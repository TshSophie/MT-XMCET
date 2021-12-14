<template>
	<view class="tabs">
	    <scroll-view :scroll-x="true" class="tab-nav" :scroll-left="scrollLeft">
			<view v-for="(item, index) in tabs" :key="index"
			@click="tabClick(index)"
			class="tab-nav-item"
			:class="currentName == index ? 'active':''">{{item}}
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
	height: 80rpx;
	.tab-nav {
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
}
</style>
