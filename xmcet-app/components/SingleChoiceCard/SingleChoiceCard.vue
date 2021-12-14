<template>
    <view class="cards">
        <view v-for="card in cards" :key="card.id" class="card">
            <text class="card-question">{{card.question}}</text>
            <radio-group @change="radioChange($event, card.id)">
                <label class="card-label" v-for="(item, index) in card.answers" :key="item.value">
                    <view>
                        <radio :value="item.value" :checked="index === current" />
                        {{item.label}}
                    </view>
                </label>
            </radio-group>
        </view>
        <button type="primary" class="card-btn" @click="submitAnswer">提交答案</button>
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
        box-shadow: #10161a1a 2px 2px;
        font-size: 28rpx;
        margin: 15rpx;
        .card-question {
            font-weight: bolder;
        }
        .card-label {
            margin: 3rpx;
        }
    }

    .card-btn {
        margin: 20rpx;
    }
}
</style>