<template>
    <view class="cards">
        <view v-for="card in cards" :key="card.id" class="card">
            <text class="card-question">{{card.question}}</text>
            <radio-group @change="radioChange($event, card.id)">
                <label class="card-label" v-for="item in card.options" :key="item.value">
                    <view :style="{color: renderOption(item.value, card.answer, card.choice)}">
                        <radio :value="item.value" disabled :checked="renderChecked(item.value, card.answer, card.choice)" :color="renderOption(item.value, card.answer, card.choice)"/>
                        {{item.label}}
                    </view>
                </label>
            </radio-group>
            <view class="answer">
              正确答案：{{renderAnswer(card.answer)}}，你的答案：{{renderAnswer(card.choice)}} 
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        cards: {
            required: true,
            type: Array
        }
    },
    data() {
        return {
            current: 0,
            // result: []
        }
    },
    created() {
        // this.result = Object.assign({}, this.cards)
    },
    methods: {
        radioChange($event, id) {
            for (let i = 0; i < this.cards.length; i++) {
                if (this.cards[i].id == id) {
                    this.cards[i].choice = $event.detail.value;
                    break;
                }
            }
        },
        submitAnswer() {
            this.$emit('submit', this.cards)
        },
        renderOption(value, answer, choice) {
            if(value == answer) {
                return 'green'
            } else {
                if(value == choice && choice != answer) {
                    return 'red'
                } else {
                    return 'black'
                }
            }
        },
        renderChecked(value, answer, choice) {
            if(value == answer) {
                return true
            } else {
                return false
            }
        },
        renderAnswer(value) {
            let arr = ['A','B','C','D','E','F','G','H','I','J','K','L',
            'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
            return arr[parseInt(value) - 1]
        }
    },
}
</script>

<style lang="less" scoped>
.cards {
    .card {
        background: #fff;
        border-radius: 15rpx;
        padding: 15rpx;
        // border: dashed 2rpx rgb(214, 91, 19);
        box-shadow: #10161a1a 2px 2px 20px 2px;
        font-size: 28rpx;
        margin-bottom: 15rpx;
        .card-question {
            font-weight: bolder;
        }
        .card-label {
            margin: 3rpx;
        }
        .answer {
            background: #eeeeee;
            font-weight: bolder;
            height: 80rpx;
            line-height: 80rpx;
            border-radius: 5rpx;
            padding-left: 15rpx;
        }
    }

    .card-btn {
        margin: 20rpx;
    }
}
</style>