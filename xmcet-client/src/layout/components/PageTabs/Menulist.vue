<template>
  <div class="contentmenu-list" @click="rowClick">
    <div v-for="item in menulist" :key="item.value" :data-value="item.value" class="contentmenu-item">
      <i :class="item.icon"></i>
      <div class="contentmenu-item-title">
        {{item.title}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menulist',
  props: {
    menulist: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    rowClick (event) {
      let target = event.target
      while (!target.dataset.value) {
        target = target.parentNode
      }
      this.$emit('rowClick', target.dataset.value)
    }
  }
}
</script>

<style lang="less">
.contentmenu-list {   
  .contentmenu-item {
    padding: 8px 20px 8px 30px;
    margin: 0;
    font-size: 14px;
    color: #606266;
    cursor: pointer;
    position: relative;
    &:hover {
      background: #ecf5ff;
      color: #66b1ff;
    }
    i{
      position: absolute;
      left: 15px;
      top: 10px;
    }
    .contentmenu-item-title {
      margin-left: 10px;
    }
  }
}
</style>
