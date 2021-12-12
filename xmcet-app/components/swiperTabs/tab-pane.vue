<template>
	<view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props:{
			label: {
				required:true,
				type: String
			},
			name: {
				required: true,
				type: String
			},
		},
		mounted() {
			console.log(this.label)
		}
	}
</script>

<style>
</style>
