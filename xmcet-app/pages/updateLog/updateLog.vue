<template>
    <view class="container">
         <timeline>
            <timeline-item v-for="item in list" :key="item.info" placement="top" color="green">
                <view class="info_item">
                    <view class="tag">
                        <uni-tag :text="item.version" size="small" type="success"></uni-tag>
                        <uni-tag :text="item.date"  size="small" mark type="default"></uni-tag>
                    </view>
                    <view class="detail">{{ item.info }}</view>
                </view>
            </timeline-item>
         </timeline>
    </view>
</template>
<script>
    import Timeline from '@/components/Timeline/Timeline.vue'
    import TimelineItem from '@/components/TimelineItem/TimelineItem.vue'
    import { getUpdateLogs } from '@/api/setting'
    export default {
        components: {
            Timeline,
            TimelineItem
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

<style lang="less" scoped>
.container {
    padding: 10px;

    ul {
        padding: 0;
    }
    .info_item {
        background-color: #FFFFFF;
        margin-right: 30upx;
        border-radius: 10upx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 30upx;
        box-shadow: 0 10rpx 30rpx #ddd;

    text {
        font-size: 18px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
    }

    view {
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;

        flex-direction: column;

        &.tag {
            padding: 10px;
        }
    }
}
}

</style>