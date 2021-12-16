<template>
  <view class="audiosBox">
    <view class="audioOpen" @click="listenerButtonPlay" v-if="!isOpen">
      <image class="image2" src="../../static/assets/play.png" />
    </view>
    <view class="audioOpen" @click="listenerButtonPause" v-if="isOpen">
      <image src="../../static/assets/Pause.png" />
    </view>
    <view class="slid">
      <slider
        @change="sliderChange"
        block-size="12px"
        step="2"
        :value="offset"
        :max="max"
        selected-color="#86d461"
      />
      <view>
        <text class="times">{{ starttime }}</text>
        <!-- 进度时长 -->
        <text class="times">{{ duration }}</text>
        <!-- 总时长 -->
      </view>
    </view>
  </view>
</template>

<script>
const innerAudioContext = uni.createInnerAudioContext();
export default {
  props: {
      src: {
        required: true,
        type: String
      }
  },
  data() {
    return {
    //   src: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3",
      isOpen: false, // 播放开关
      starttime: "00:00", // 正在播放时长
      duration: "00:00", // 总时长
      max: 0, // 进度条最大值
      offset: 0,
    };
  },
  mounted() {
    innerAudioContext.src = this.src;
    innerAudioContext.autoplay = false;
    innerAudioContext.onPlay(() => {
        this.offset = parseInt(innerAudioContext.currentTime);
        this.starttime = this.formatTime(Math.ceil(this.offset));
        this.max = parseInt(innerAudioContext.duration)
        this.duration = this.formatTime(Math.ceil(innerAudioContext.duration));
        this.isOpen = true;
    });
    innerAudioContext.onTimeUpdate(()=>{
        this.offset = parseInt(innerAudioContext.currentTime);
        this.starttime = this.formatTime(Math.ceil(this.offset));
    })
    innerAudioContext.onEnded(()=>{
        this.isOpen = false;
    })
  },
  destroyed() {
    innerAudioContext.destroy()
  },
  methods: {
    // 播放
    listenerButtonPlay() {
      innerAudioContext.play()
    },
    //暂停播放
    listenerButtonPause() {
      innerAudioContext.pause();
      this.isOpen = false;
      console.log('暂停播放', this.offset)
    },
    listenerButtonStop() {
      innerAudioContext.stop();
    },
    // 进度条拖拽
    sliderChange(e) {
      var offset = parseInt(e.detail.value);
      innerAudioContext.play();
      innerAudioContext.seek(offset);
      this.isOpen = true;
    },
    //格式化时长
    formatTime: function (s) {
      let t = "";
      s = Math.floor(s);
      if (s > -1) {
        let min = Math.floor(s / 60) % 60;
        let sec = s % 60;
        if (min < 10) {
          t += "0";
        }
        t += min + ":";
        if (sec < 10) {
          t += "0";
        }
        t += sec;
      }
      return t;
    },
  },
};
</script>

<style lang="less" scoped>
.audiosBox {
  width: 100%;
  height: 60px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
  background: #f6f7f7;
  border-radius: 10rpx;
  /*按钮大小  */
  .audioOpen {
    width: 70rpx;
    height: 70rpx;
    border-radius: 50%;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    justify-content: center;
    -webkit-justify-content: center;
    margin: 20rpx;
  }
  image {
    width: 100%;
    height: 100%;
  }
  /*进度条长度  */
  .slid {
    flex: 1;
    position: relative;
    view {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      -webkit-justify-content: space-between;
    }
    view > text:nth-child(1) {
      color: #4cee59;
      margin-left: 6rpx;
    }
    view > text:nth-child(2) {
      margin-right: 6rpx;
    }
  }
  slider {
    width: 520rpx;
    margin: 0;
    margin-left: 35rpx;
  }
  /*横向布局  */
  .times {
    width: 100rpx;
    text-align: center;
    display: inline-block;
    font-size: 24rpx;
    color: #999999;
    margin-top: 5rpx;
  }
}
</style>
