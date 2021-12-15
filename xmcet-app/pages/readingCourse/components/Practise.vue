<template>
    <view class="content">
        <view class="article">
            <view class="title">
                {{title}}
            </view>
            <rich-text :nodes="strings" class="richText"></rich-text>
        </view>
        <SingleChoiceCard :cards="cards" @submit="submitAnswer" class="question"/>
    </view>
</template>

<script>
import SingleChoiceCard from '@/components/SingleChoiceCard/SingleChoiceCard.vue'
export default {
    name: 'Practice',
    components: {
        SingleChoiceCard
    },
    data() {
        return {
            title: '精读2017年12月六级真题，用词典查出所有不认识的词，并做笔',
            strings: '<p>At the base of a mountain in TanzaniaAt the base ofAt the base of a mountain in TanzaniaAt the base of At the base of a mountain in TanzaniaAt the base of At the base of a mountain in TanzaniaAt the base of At the base of a mountain in TanzaniaAt the base of At the base of a mountain in TanzaniaAt the base of At the base of a mountain in TanzaniaAt the base of At the base of a mountain in TanzaniaAt the base of  a mountainAt the base of a mountainAt the base of a mountainAt the base of a mountainAt the base of a mountain</p><div style="text-align:center;"><img src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png"/></div>',
            cards: [
                {
                    id: 1,
                    question: "49. Why can certain species of tilapia sometimes survive around Lake Natron?",
                    options: [
                        {
                            value: '1',
                            label: "A) They can take refuge in the less salty waters."
                        },
                        {
                            value: '2',
                            label: "B) They can flee quick enough from predators."
                        },
                        {
                            value: '3',
                            label: "C) They can take refuge in the less salty waters."
                        },
                        {
                            value: '4',
                            label: "D) They can flee quick enough from predators."
                        },
                    ],
                    answer: '1',
                    choice: '1'
                },
                {
                    id: 2,
                    question: "49. Why can certain species of tilapia sometimes survive around Lake Natron?",
                    options: [
                        {
                            value: '1',
                            label: "A) They can take refuge in the less salty waters."
                        },
                        {
                            value: '2',
                            label: "B) They can flee quick enough from predators."
                        },
                        {
                            value: '3',
                            label: "C) They can take refuge in the less salty waters."
                        },
                        {
                            value: '4',
                            label: "D) They can flee quick enough from predators."
                        },
                    ],
                    answer: '1',
                    choice: '3'
                },
            ]
        }
    },
    methods: {
        submitAnswer(result) {
            console.log(result)
        }
    },
}
</script>

<style lang="less" scoped>
.content {
    height: 100%;
    padding: 0 15rpx;
    .article {
        background: #fff;
        border-radius: 15rpx;
        box-shadow: #10161a1a 2px 2px 20px 2px;
        padding: 15rpx;
        margin-bottom: 15rpx;
        .title {
            font-weight: bold;
            font-size: 32rpx;
        }
        .richText {
            margin-top: 10rpx;
            font-size: 32rpx;
        }
    }
}
</style>