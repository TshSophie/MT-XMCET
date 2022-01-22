<template>
  <li class="el-timeline-item">
    <div class="el-timeline-item__tail"></div>

    <div v-if="!$slots.dot"
      class="el-timeline-item__node"
      :class="[
        `el-timeline-item__node--${size || ''}`,
        `el-timeline-item__node--${type || ''}`
      ]"
      :style="{
        backgroundColor: color
      }"
    >
      <i v-if="icon"
        class="el-timeline-item__icon"
        :class="icon"
      ></i>
    </div>
    <div v-if="$slots.dot" class="el-timeline-item__dot">
      <slot name="dot"></slot>
    </div>

    <div class="el-timeline-item__wrapper">
      <div v-if="!hideTimestamp && placement === 'top'"
        class="el-timeline-item__timestamp is-top">
        {{timestamp}}
      </div>

      <div class="el-timeline-item__content">
        <slot></slot>
      </div>

      <div v-if="!hideTimestamp && placement === 'bottom'"
        class="el-timeline-item__timestamp is-bottom">
        {{timestamp}}
      </div>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'TimelineItem',

    // inject: ['timeline'],

    props: {
      timestamp: String,

      hideTimestamp: {
        type: Boolean,
        default: false
      },

      placement: {
        type: String,
        default: 'bottom'
      },

      type: String,

      color: String,

      size: {
        type: String,
        default: 'normal'
      },

      icon: String
    }
  };
</script>
<style lang="less" scoped>
.el-timeline-item {
  position: relative;
  padding-bottom: 20px;

  .el-timeline-item__tail {
    position: absolute;
    left: 4px;
    height: 100%;
    border-left: 2px solid #e4e7ed;
  }
  .el-timeline-item__node--normal {
    left: -1px;
    width: 12px;
    height: 12px;
  }
  .el-timeline-item__node {
    position: absolute;
    background-color: #e4e7ed;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-timeline-item__wrapper {
    position: relative;
    padding-left: 28px;
    top: -3px;

    .el-timeline-item__timestamp.is-top {
      margin-bottom: 8px;
      padding-top: 4px;
    }
    .el-timeline-item__timestamp {
      color: #909399;
      line-height: 1;
      font-size: 13px;
    }
    .el-timeline-item__content {
      color: #303133;
    }
  }
}
</style>