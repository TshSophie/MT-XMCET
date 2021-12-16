<template>
    <view class="content">
        <SingleChoiceForResultCard :cards="cards" @submit="submitAnswer" class="question"/>
    </view>
</template>

<script>
import SingleChoiceForResultCard from '@/components/SingleChoiceForResultCard/SingleChoiceForResultCard.vue'
export default {
    name: 'Practice',
    components: {
        SingleChoiceForResultCard
    },
    data() {
        return {
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
}
</script>

<style lang="less" scoped>
.content {
    height: 100%;
    padding: 0 15rpx;
}
</style>