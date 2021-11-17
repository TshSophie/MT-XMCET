<template>
  <div class="left-nav" :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        background-color="#333744"
        text-color="#fff"
        active-text-color="#409eff"
        :collapse="isCollapse"
        :collapse-transition="false"
        mode="vertical"
        @open="handleOpen"
        @close="handleClose"
      >
        <sidebar-item
          v-for="(route, index) in permission_routes"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem, Logo },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['settings']),
    ...mapGetters(['permission_routes', 'sidebar']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return {
        menuBg: '#304156',
        menuText: '#bfcbd9'
      }
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less" scoped>
// 重写el-scroll
.el-scrollbar__bar {
  bottom: 0px;
}
.el-scrollbar__wrap {
  height: 49px;
}
</style>
