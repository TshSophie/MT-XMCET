<template>
    <view style="background-color: #f2f2f2;padding-top: 100rpx;">
        <YSteps lineNum='0' color='#fff' backgroundColor='#000fff' :infoList='list'></YSteps>
    </view>
</template>
<script>
    import YSteps from '../../components/Y-Steps/Y-Steps.vue'
    import { getUpdateLogs } from '@/api/setting'
    export default {
        components: {
            YSteps
        },
        data() {
            return {
                list: []
            };
        },
        created() {
            getUpdateLogs().then(response => {
                this.list = response.data.map(item => {
                    return {
                        version: item.version,
                        date: item.createTime,
                        info: item.desc
                    }
                })
            })
        },
        methods: {

        }
    }
</script>

<style>

</style>