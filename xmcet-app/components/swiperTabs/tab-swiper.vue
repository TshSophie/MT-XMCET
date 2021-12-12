<template>
	<swiper class="tab-content" :current="currentTab" duration="300" @change="switchTab">
		<swiper-item v-for="item in childList">
			<!-- {{h(item)}} -->
		</swiper-item>	
	</swiper>
</template>

<script>
	export default {
		name:"tabSwiper",
		props:{
			childList: Object|Array
		},
		data() {
			return {
				currentTab: 0, //预设当前项的值
			}
		},
		mounted() {
			console.log(this.childList)
		}
	}
</script>

<style>
</style>
