<template>
	<view>
		<swiperTabs>
			<tab-pane label="栏目1" name="col1">
				dddddddddddddddddddddddddddddddd1
			</tab-pane>
			<tab-pane label="栏目2" name="col2">
				dddddddddddddddddddddddddddddddd2
			</tab-pane>
			<tab-pane label="栏目3" name="col3">
				dddddddddddddddddddddddddddddddd3
			</tab-pane>
		</swiperTabs>
	</view>
</template>

<script>
	import swiperTabs from '../../components/swiperTabs/swiperTabs.vue'
	import tabPane from '../../components/swiperTabs/tab-pane.vue'
	export default {
		components: {
			swiperTabs,
			tabPane
		},
		data() {
			return {
				title: '阅读练习',
				// 课程id
				id: ''
			}
		},
		onLoad(option) {
			 this.id = option.id
			 // 重新设置标题
			 this.setNavBarTitle()
		},
		methods: {
			setNavBarTitle() {
				uni.setNavigationBarTitle({
					title: this.title
				});
			},
		}
	}
</script>

<style>

</style>
