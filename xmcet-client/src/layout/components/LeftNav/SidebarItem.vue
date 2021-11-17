<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <div v-if="item.badge">
          <el-badge v-if="item.badge > 0" :value="item.badge" class="item">
            <el-menu-item
              :index="resolvePath(onlyOneChild.path)"
              :class="{ 'submenu-title-noDropdown': !isNest }"
            >
              <item
                :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
                :title="onlyOneChild.meta.title"
              />
            </el-menu-item>
          </el-badge>
        </div>
        <div v-else>
          <el-menu-item
            :index="resolvePath(onlyOneChild.path)"
            :class="{ 'submenu-title-noDropdown': !isNest }"
          >
            <item
              :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
              :title="onlyOneChild.meta.title"
            />
          </el-menu-item>
        </div>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router and the meta is not setted, the child router is displayed by default
      if (showingChildren.length === 1 && !parent.meta) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
<style>
/* 重写徽章样式 */
.el-badge__content.is-fixed {
  position: absolute;
  top: 20px !important;
  right: inherit !important;
  left: -5px !important;
  -webkit-transform: translateY(-50%) translateX(100%);
  transform: translateY(-50%) translateX(100%);
}
</style>
