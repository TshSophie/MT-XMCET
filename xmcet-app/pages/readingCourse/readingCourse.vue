<template>
	<view class="page">
		<Tabs v-model="currentTab" @tab-click="handleClick" :tabs="tabs"></Tabs>
		<!--内容合子  -->
		<swiper class="tab-content" :current="currentTab" duration="300" @change="switchTab" :style="{height: (windowHeight - 120) + 'px'}">        
			<swiper-item>
				<scroll-view scroll-y="true" class="scoll-h" >
				   <Practice />
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scoll-h" >
				   <Answer />
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scoll-h" >
					<Translate/>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scoll-h" >
					<Analysis/>
				</scroll-view>
			</swiper-item>
		</swiper>
        <AudioPlayer :src="audioSrc" class="audio"/>
	</view>
</template>

<script>
	import Tabs from '@/components/Tabs/Tabs.vue'
	import Practice from './components/Practise.vue'
	import Answer from './components/Answer.vue'
	import Analysis from './components/Analysis.vue'
	import Translate from './components/Translate.vue'
	import AudioPlayer from "@/components/AudioPlayer/AudioPlayer.vue"

	export default {
		components: {
			Tabs,
			Practice,
			Answer,
			Analysis,
			Translate,
        	AudioPlayer
		},
		data() {
			return {
				title: '阅读练习',
				// 课程id
				id: '',
				currentTab: 0,
				tabs:["练习", "答案", "翻译", "解析"],
            	audioSrc: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3",
				windowHeight: 0
			}
		},
		onLoad(option) {
			this.id = option.id
			// 重新设置标题
			this.setNavBarTitle()
			const res = uni.getSystemInfoSync();
			this.windowHeight = res.windowHeight
		},
		methods: {
			setNavBarTitle() {
				uni.setNavigationBarTitle({
					title: this.title
				});
			},
			handleClick(item) {
				this.currentTab = item
			},
			switchTab(event) {
				this.currentTab = event.detail.current
				console.log(this.currentTab)
			}
		}
	}
</script>

<style lang="less" scoped>
.page {
	position: relative;
	.tabs {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 9999;
	}
	.tab-content {
		position: absolute;
		width: 100%;
		top: 50px;
		left: 0;
	    // height: calc(100vh - 40px - 60px - var(--window-top));

		.scoll-h {
			height: 100%;
		}
	}
    .audio {
		width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
    }
}

</style>
