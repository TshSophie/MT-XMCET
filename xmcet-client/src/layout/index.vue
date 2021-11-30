<template>
  <div class="layout" :class="{...layoutClassObj, hasTagsView: needTagsView}">
    <!-- 搜索 -->
    <transition name="fade-scale">
      <div v-if="searchPanelStatus" class="panel-search-container">
        <panel-search ref="panelSearch" />
      </div>
    </transition>
    <!-- 布局主体 -->
    <div class="layout-main" :class="{ 'fixed-header' : fixedHeader}">
      <!-- 主体头部导航 -->
      <header-nav />
      <!-- 主体内容 -->
      <app-main />
    </div>
    <!-- 左侧导航栏 -->
    <left-nav />
  </div>
</template>
<script>
import { AppMain, HeaderNav, LeftNav } from './components'
import { mapState } from 'vuex'
import panelSearch from './components/PanelSearch'
export default {
  components: {
    AppMain,
    HeaderNav,
    LeftNav,
    'panel-search': panelSearch
  },
  data() {
    return {
      searchActive: true
    }
  },
  computed: {
    // 是否展开侧边栏
    ...mapState({
      sidebar: state => state.app.sidebar,
      searchPanelStatus: state => state.app.searchPanelStatus,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    layoutClassObj() {
      return {
        opensidebar: this.sidebar.opened,
        hideSidebar: !this.sidebar.opened
      }
    }
  },
  created() {
    console.log(this.searchPanelStatus)
  }
}
</script>
<style lang="less" scoped>
// 过渡动画 缩放渐变
.fade-scale-leave-active,
.fade-scale-enter-active {
  transition: all 0.3s;
}
.fade-scale-enter {
  opacity: 0;
  transform: scale(0.9);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.panel-search-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.7;
  z-index: 999;
}
</style>
