<template>
  <div class="app-container">
    <el-form
      ref="queryForm"
      :model="queryParams"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="单词名称" prop="word">
        <el-input
          v-model="queryParams.word"
          placeholder="请输入单词名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >搜索</el-button>
        <el-button
          type="warning"
          icon="el-icon-refresh"
          size="mini"
          @click="resetQuery"
        >重置</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >批量删除</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="wordRootList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" width="75" align="center" prop="id" />
      <el-table-column label="单词" width="100" align="left" prop="word" />
      <el-table-column label="释义" width="200" align="left" prop="mean" />
      <el-table-column label="相关词汇" align="left" prop="detail">
        <template slot-scope="scope">
          <p v-html="detailFormat(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改词根词缀对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="单词" prop="word">
          <el-input v-model="form.word" placeholder="请输入单词" />
        </el-form-item>
        <el-form-item label="释义" prop="mean">
          <el-input
            v-model="form.mean"
            type="textarea"
            :rows="13"
            placeholder="请输入释义"
          />
        </el-form-item>
        <el-form-item label="相关词汇" prop="detail">
          <el-input
            v-model="form.detail"
            type="textarea"
            :rows="13"
            placeholder="请输入相关词汇"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listWordRoot,
  getWordRoot,
  delWordRoot,
  addWordRoot,
  updateWordRoot
} from '@/api/admin/wordRoot'
export default {
  name: 'WordRoot',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 词根词缀表格数据
      wordRootList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        word: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        word: [{ required: true, message: '请输入单词', trigger: 'blur' }],
        mean: [{ required: true, message: '请输入释义', trigger: 'blur' }],
        detail: [{ required: true, message: '请输入相关词汇', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    detailFormat(row) {
      let data = row.detail
      if (this.isJSON(data)) {
        data = JSON.parse(data)
        let str = ''
        const len = data.length
        for (let i = 0; i < len; i++) {
          str += '【' + data[i].word + ':' + data[i].translate + '】<br/>'
        }
        return str
      } else {
        return '无'
      }
    },
    /** 查询词根词缀列表 */
    getList() {
      this.loading = true
      listWordRoot(this.queryParams).then(response => {
        this.wordRootList = response.data.rows
        this.total = response.data.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        word: '',
        mean: '',
        detail: ''
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加词根词缀'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getWordRoot(id).then(response => {
        this.form = response.data
        this.form.status += ''
        this.open = true
        this.title = '修改词根词缀'
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateWordRoot(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              }
            })
          } else {
            addWordRoot(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('新增成功')
                this.open = false
                this.getList()
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm(
        '是否确认删除词根词缀编号为"' + ids + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return delWordRoot(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
        .catch(function() {})
    }
  }
}
</script>
