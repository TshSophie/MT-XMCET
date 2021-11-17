<template>
  <!-- 头部导航 -->
  <div class="header-nav">
    <div class="navbar">
      <!-- 收缩按钮 -->
      <el-tooltip
        effect="dark"
        :content="sidebar.opened ? '关闭菜单' : '打开菜单'"
        placement="bottom"
      >
        <i
          class="el-icon-s-fold hamburger icon-item"
          :class="{ 'is-active': !sidebar.opened }"
          @click="toggleSideBar"
        />
      </el-tooltip>
      <!-- 面包屑 -->
      <breadcrumb class="breadcrumb-container" />
      <!-- 头部功能、菜单部件 -->
      <div class="header-nav-menu">
        <!-- 全屏按钮 -->
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <screenfull class="icon-item" />
        </el-tooltip>
        <!-- 设置 -->
        <el-tooltip effect="dark" content="设置" placement="bottom">
          <i class="el-icon-setting settings icon-item" @click="showSettings" />
        </el-tooltip>
        <!-- 下拉菜单 -->
        <el-dropdown class="avatar-container">
          <div class="avatar-wrapper">
            <img :src="avatar" class="user-avatar">
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/user/profile">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout">
              <span>退出系统</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 页签 -->
    <page-tabs v-if="needTagsView" />
    <!-- 设置弹出窗 -->
    <el-dialog
      :modal-append-to-body="false"
      title="系统布局配置"
      :visible.sync="dialogVisible"
      width="300px"
      :before-close="() => (dialogVisible = false)"
    >
      <div>
        <el-form ref="form" label-position="left" label-width="180px">
          <el-form-item label="开启 Tags-Views">
            <el-switch v-model="tagsView" />
          </el-form-item>
          <el-form-item label="固定 Header">
            <el-switch v-model="fixedHeader" />
          </el-form-item>
          <el-form-item label="显示 Logo">
            <el-switch v-model="sidebarLogo" />
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Screenfull from '@/components/Screenfull'
import PageTabs from '../PageTabs'
import { mapState } from 'vuex'

export default {
  components: {
    Breadcrumb,
    Screenfull,
    PageTabs
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'avatar'
    ]),
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    },
    ...mapState({
      needTagsView: state => state.settings.tagsView
    }),
    ...mapGetters(['sidebar', 'avatar', 'searchPanelStatus']),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    toggleSearchpanel() {
      this.$store.dispatch('app/toggleSearchpanel').then(() => {
        console.log(this.searchPanelStatus)
      })
    },
    showSettings() {
      this.dialogVisible = true
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/login'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.header-nav {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  // 面包屑
  .breadcrumb-container {
    float: left;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
  }

  .icon-item {
    text-align: center;
    font-size: 23px;
    line-height: 51px;
    width: 50px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .hamburger.is-active {
    transform: rotate(180deg);
  }

  // 下拉菜单
  .header-nav-menu {
    // float: right;
    display: flex;
    justify-content: flex-end;
    height: 100%;
    line-height: 50px;

    // 下拉菜单
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          margin-top: 5px;
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
