<template>
  <div class="page-tabs">
    <el-tabs
      class="tabs"
      :value="current"
      type="card"
      @tab-click="handleClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="page in visitedViews"
        ref="tag"
        :key="page.fullPath"
        :label="page.meta.title || '未命名'"
        :name="page.fullPath"
        :closable="isTabClosable(page)"
      >
        <span
          slot="label"
          style="display: inline-block;"
          @click.right.prevent="handClickRight($event, page)"
        ><i
           :class="
             page.meta.icon ? 'el-icon-' + page.meta.icon : 'el-icon-document'
           "
         />
          {{ page.meta.title || '未命名' }}</span>
      </el-tab-pane>
    </el-tabs>
    <div class="dropdown-menu">
      <el-dropdown
        size="default"
        split-button
        @click="closeAll"
        @command="command => handleControlItemClick(command)"
      >
        <i class="el-icon-error" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-back" command="left">
            关闭左侧
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-right" command="right">
            关闭右侧
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-close" command="other">
            关闭其它
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-error" command="all">
            全部关闭
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <Contentmenu :visible.sync="visible" :x="contentmenuX" :y="contentmenuY">
      <Menulist
        :menulist="
          tagView.fullPath === '/index' ? contextmenuListIndex : contextmenuList
        "
        @rowClick="contextmenuClick"
      />
    </Contentmenu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import path from 'path'

export default {
  name: 'PageTabs',
  components: {
    Contentmenu: () => import('./Contentmenu.vue'),
    Menulist: () => import('./Menulist.vue')
  },
  data() {
    return {
      visible: false,
      contentmenuX: 0,
      contentmenuY: 0,
      contextmenuListIndex: [
        { icon: 'el-icon-refresh', title: '刷新', value: 'refresh' },
        { icon: 'el-icon-error', title: '关闭全部', value: 'all' }
      ],
      contextmenuList: [
        { icon: 'el-icon-refresh', title: '刷新', value: 'refresh' },
        { icon: 'el-icon-back', title: '关闭左侧', value: 'left' },
        { icon: 'el-icon-right', title: '关闭右侧', value: 'right' },
        { icon: 'el-icon-close', title: '关闭其它', value: 'other' },
        { icon: 'el-icon-error', title: '关闭全部', value: 'all' }
      ],
      tagView: '',
      affixTags: [],
      current: ''
    }
  },
  computed: {
    ...mapState('tagsView', ['visitedViews', 'cachedViews']),
    routes() {
      return this.$store.state.permission.routes
    }
  },
  watch: {
    // 监听路由变化
    $route() {
      // 将当前切换的路由存入tagview状态数组
      this.addTags()
      // 切换页签到该tag
      this.current = this.$route.fullPath
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
    // 切换页签到该tag
    this.current = this.$route.fullPath
  },
  methods: {
    /**
     * 将当前路由存入tagsView
     */
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    initTags() {
      // 加载固定展示的页面
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes))
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    /**
     * @description 计算某个标签页是否可关闭
     * @param {Object} page 其中一个标签页
     */
    isTabClosable(page) {
      return page.name !== 'index'
    },
    handClickRight($event, page) {
      this.tagView = page
      // 打开菜单
      this.contentmenuX = $event.clientX
      this.contentmenuY = $event.clientY
      this.visible = true
    },
    /**
     * @description 右键菜单的 row-click 事件
     * @param {String} command 事件类型
     */
    contextmenuClick(command) {
      this.handleControlItemClick(command, this.tagView)
    },
    /**
     * @description 接收点击关闭控制上选项的事件
     * @param {String} command 事件类型
     * @param {String} tagView tab 名称
     */
    handleControlItemClick(command, tagView = null) {
      if (tagView) this.visible = false
      switch (command) {
        case 'refresh':
          // this.$router.push({ name: 'refresh' })
          this.refresh(tagView)
          break
        case 'left':
          this.closeLeft(tagView)
          break
        case 'right':
          this.closeRight(tagView)
          break
        case 'other':
          this.closeOther(tagView)
          break
        case 'all':
          this.closeAll()
          break
        default:
          this.$message.error('无效的操作')
          break
      }
    },
    closeAll() {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.$route.fullPath === '/index') {
          return
        }
        // 刷新页面
        this.toLastView(visitedViews)
      })
    },
    toLastView(visitedViews) {
      // 当前最新页面
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        this.$router.push('/')
      }
    },
    close(view) {
      this.$store
        .dispatch('tagsView/delView', view)
        .then(({ visitedViews }) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews)
          }
        })
    },
    closeLeft(view) {
      if (!view) { view = this.visitedViews.find(item => item.fullPath == this.current) }
      this.$store
        .dispatch('tagsView/delLeftVisitedViews', view)
        .then(visitedViews => {
          if (!this.isActive(view)) {
            this.toLastView(visitedViews)
          }
        })
    },
    closeRight(view) {
      if (!view) { view = this.visitedViews.find(item => item.fullPath == this.current) }
      this.$store
        .dispatch('tagsView/delRightVisitedViews', view)
        .then(visitedViews => {
          if (!this.isActive(view)) {
            this.toLastView(visitedViews)
          }
        })
    },
    closeOther(view) {
      if (!view) { view = this.visitedViews.find(item => item.fullPath == this.current) }
      this.$store
        .dispatch('tagsView/delOthersViews', view)
        .then(({ visitedViews }) => {
          if (!this.isActive(view)) {
            this.toLastView(visitedViews)
          }
        })
    },
    refresh(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then((cachedViews) => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    /**
     * @description 接收点击 tab 标签的事件
     * @param {object} tab 标签
     * @param {object} event 事件
     */
    handleClick(tab, event) {
      // tag 列表查找该标签
      const page = this.visitedViews.find(page => page.fullPath === tab.name)
      if (page && tab.name !== this.$route.fullPath) {
        const { name, params, query } = page
        this.$router.push({ name, params, query })
      }
    },
    /**
     * @description 点击 tab 上的删除按钮触发这里
     * @param {String} tagName tab 名称
     */
    handleTabRemove(tagName) {
      const view = this.visitedViews.find(page => page.fullPath === tagName)
      this.close(view)
    }
  }
}
</script>

<style lang="less">
.page-tabs {
  width: 100%;
  padding-right: 84px;
  box-sizing: border-box;
  position: relative;
  .dropdown-menu {
    position: absolute;
    top: 0;
    right: 0;
  }
  .el-tabs__header {
    margin: 0;
  }
}
</style>
