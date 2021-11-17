<template>
  <div class="panel-search">
    <i class="el-icon-close close" @click="toggleSearchpanel" />
    <div
      class="panel-search__input-group"
      @click.self="handlePanelClick"
    >
      <el-autocomplete
        ref="input"
        v-model="searchText"
        class="panel-search__input"
        suffix-icon="el-icon-search"
        placeholder="搜索页面"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        :clearable="true"
        @select="handleSelect"
      >
        <template slot-scope="{ item }">
          <div class="panel-search-item">
            <div class="panel-search-item__icon">
              <i :class="item.icon" />
            </div>
            <div class="panel-search-item__info">
              <div class="panel-search-item__info-title">
                <span>{{ item.title }}</span>
              </div>
              <div class="panel-search-item__info-path">
                <span>{{ item.path }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-autocomplete>
      <div class="panel-search__tip">
        您可以使用快捷键
        <span class="panel-search__key">{{ hotkey.open }}</span>
        唤醒搜索面板，按
        <span class="panel-search__key">{{ hotkey.close }}</span>
        关闭
      </div>
    </div>
    <!--  <div
      v-if="resultsList.length > 0"
      class="panel-search__results-group"
      flex-box="1"
    >
     <el-card shadow="never">
        <div class="panel-search__results-group-inner">
          <d2-panel-search-item
            v-for="(item, index) in resultsList"
            :key="index"
            :item="item"
            :hover-mode="true"
            @click.native="handleResultsGroupItemClick(item.path)"
          />
        </div>
      </el-card> 
    </div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      hotkey: {
        open: 's',
        close: 'esc'
      },
      searchText: '',
      resultsList: [
        {
          icon: 'el-icon-s-home',
          title: '测试1',
          path: '/home'
        },
        {
          icon: 'el-icon-s-home',
          title: '测试2',
          path: '/home'
        },
        {
          icon: 'el-icon-s-home',
          title: '测3',
          path: '/home'
        }
      ]
    }
  },
  methods: {
    toggleSearchpanel() {
      this.$store.dispatch('app/toggleSearchpanel').then(() => {
        console.log(this.searchPanelStatus)
      })
    },
    querySearch(queryString, cb) {
      var list = this.resultsList
      var results = queryString ? list.filter(this.createFilter(queryString)) : list
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (data) => {
        return (data.title.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect({ path }) {},
    handlePanelClick() {}
  }
}
</script>

<style lang="less">
// 文字
@color-text-main: #303133;
@color-text-normal: #606266;
@color-text-sub: #909399;
@color-text-placehoder: #C0C4CC;

// 背景
@color-bg: #f8f8f9;

@color-border-3: #EBEEF5;
.panel-search {
  margin: 20px;
  width: 100%;
  position: relative;
  // 关闭按钮
  .close {
    position: absolute;
    right: 50px;
    top: 0px;
    font-size: 35px;
    cursor: pointer;
    color: white;
  }

  // 搜索栏
  .panel-search__input-group {
    margin-top: 30px;
    height: 240px;
    // 输入框
    .panel-search__input {
      width: 500px;
    }
    // 提示
    .panel-search__tip {
      margin-top: 20px;
      margin-bottom: 40px;
      font-size: 12px;
      color: @color-text-sub;
      .panel-search__key {
        padding: 1px 5px;
        margin: 0px 2px;
        border-radius: 2px;
        background-color: @color-text-normal;
        color: @color-bg;
      }
    }
  }

  .panel-search__results-group {
    overflow: auto;
    margin-bottom: -20px;
    .panel-search__results-group-inner {
      margin: -20px;
    }
  }

}

.panel-search-item {
  padding-left: 64px;
  .panel-search-item__icon {
    position: absolute;
    left: 32px;
    top: 8px;
    font-size: 25px;
  }
  .panel-search-item__info {
    width: 100%;
    .panel-search-item__info-title {
      font-size: 16px;
      line-height: 16px;
      font-weight: bold;
      color: @color-text-normal;
    }
    .panel-search-item__info-path {
      margin-bottom: 4px;
      font-size: 10px;
      line-height: 14px;
      color: @color-text-placehoder;
    }
  }
}
</style>
