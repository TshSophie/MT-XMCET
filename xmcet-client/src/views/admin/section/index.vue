<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--book数据-->
      <el-col :span="3" :xs="24">
        <div class="head-container">
          <el-input
            v-model="bookTitle"
            placeholder="请输入book名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          />
        </div>
        <div class="head-container">
          <el-tree
            ref="tree"
            :data="bookTreeOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <!--book数据-->
      <el-col :span="21" :xs="24">
        <el-form
          ref="queryForm"
          :model="queryParams"
          :inline="true"
          label-width="68px"
        >
          <el-form-item label="章节名称" prop="title">
            <el-input
              v-model="queryParams.title"
              placeholder="请输入章节标题"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="周次" prop="week">
            <el-input-number
              v-model="queryParams.week"
              :min="1"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="dateRange"
              size="small"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
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
          :data="sectionList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.sectionCourse" style="width: 100%">
                <el-table-column label="ID" align="center" prop="id" />
                <el-table-column label="排序" align="center" prop="sort" />
                <el-table-column
                  label="课程编号"
                  align="center"
                  prop="course.id"
                />
                <el-table-column
                  label="课程名称"
                  align="left"
                  prop="course.name"
                />
                <el-table-column
                  label="课程类型"
                  align="center"
                  prop="course.type"
                  :formatter="typeFormat"
                />
                <el-table-column
                  label="音频"
                  width="320"
                  align="center"
                  prop="course.audio"
                >
                  <template slot-scope="scope">
                    <audio
                      v-if="
                        scope.row.course.audio != '' &&
                          scope.row.course.audio != null
                      "
                      controls
                    >
                      <source
                        :src="getAudioUrl(scope.row.course.audio)"
                        type="audio/ogg"
                      >
                      <source
                        :src="getAudioUrl(scope.row.course.audio)"
                        type="audio/mpeg"
                      >
                      您的浏览器不支持 audio 元素。
                    </audio>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  align="center"
                  width="210"
                  class-name="small-padding fixed-width"
                >
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-edit"
                      @click="handleUpdateCourse(scope.row)"
                    >修改</el-button>
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-delete"
                      @click="handleDeleteCourse(scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="编号" width="72" align="center" prop="id" />
          <el-table-column
            label="章节标题"
            align="center"
            prop="title"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="章节副标题"
            align="center"
            prop="subTitle"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="book"
            align="center"
            prop="bookId"
            :formatter="bookTypeFormat"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="周次"
            align="center"
            prop="week"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="排序"
            align="center"
            prop="inorder"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="备注"
            align="center"
            prop="remark"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="创建时间"
            align="center"
            prop="createTime"
            width="160"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="210"
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
                icon="el-icon-plus"
                @click="handleAddCourse(scope.row)"
              >添加课程</el-button>
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
      </el-col>
    </el-row>

    <!-- 添加或修改章节对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属book" prop="bookid">
              <el-select v-model="form.bookid" filterable placeholder="请选择">
                <el-option
                  v-for="dict in bookOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="章节标题" prop="title">
              <el-input v-model="form.title" placeholder="请输入章节标题" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="章节副标题" prop="subTitle">
              <el-input
                v-model="form.subTitle"
                placeholder="请输入章节副标题"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="周次" prop="week">
              <el-input-number v-model="form.week" :min="1" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="排序" prop="inorder">
              <el-input-number v-model="form.inorder" :min="1" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                v-model="form.remark"
                type="textarea"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="添加课程"
      :visible.sync="open2"
      width="600px"
      append-to-body
    >
      <el-form
        ref="addCourseForm"
        :model="addCourseForm"
        :rules="addCourseFormRules"
        label-width="120px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="章节标题" prop="title">
              <el-input v-model="addCourseForm.title" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="章节副标题" prop="subTitle">
              <el-input v-model="addCourseForm.subTitle" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="课程名称" prop="courseId">
              <el-select
                v-model="addCourseForm.courseId"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="dict in courseOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="addCourseForm.sort" :min="1" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAddCourseForm">确 定</el-button>
        <el-button @click="cancel2">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listSection,
  getSection,
  delSection,
  addSection,
  updateSection,
  addSectionCourse,
  updateSectionCourse,
  deleteSectionCourse,
  getSectionCourse
} from '@/api/admin/section'
import { books } from '@/api/admin/book'
import { getCoursesByBook } from '@/api/admin/course'

export default {
  name: 'Section',
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
      // book表格数据
      sectionList: null,
      // 弹出层标题
      title: '',
      addCourseFormTitle: '',
      // book树选项
      bookTreeOptions: undefined,
      bookOptions: undefined,
      // 是否显示弹出层
      open: false,
      open2: false,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 课程类型数据字典
      typeOptions: [],
      // 表单参数
      form: {},
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      bookTitle: '',
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: undefined,
        subTitle: undefined,
        week: undefined,
        bookid: undefined
      },
      addCourseForm: {},
      courseOptions: [],
      // 表单校验
      rules: {
        title: [
          { required: true, message: '章节标题不能为空', trigger: 'blur' }
        ],
        subTitle: [
          { required: true, message: '章节副标题不能为空', trigger: 'blur' }
        ],
        week: [{ required: true, message: '周次不能为空', trigger: 'blur' }],
        bookid: [
          { required: true, message: '请选择章节所属book', trigger: 'change' }
        ],
        inorder: [{ required: true, message: '排序不能为空', trigger: 'blur' }]
      },
      addCourseFormRules: {
        courseId: [
          { required: true, message: '请求选择课程', trigger: 'change' }
        ],
        sort: [{ required: true, message: '排序不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    // 根据名称筛选book树
    bookTitle(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getDicts('app_course_type')
      .then(response => {
        this.typeOptions = response.data
        return books()
      })
      .then(response => {
        if (response.code === 200) {
          this.bookOptions = response.data.map(item => {
            return {
              dictLabel: item.title,
              dictValue: item.id
            }
          })
          this.bookTreeOptions = [
            {
              title: '全部',
              id: 0,
              children: response.data
            }
          ]
        }
        this.getList()
      })
  },
  methods: {
    getAudioUrl(src) {
      return process.env.VUE_APP_BASE_API + src
    },
    // 课程类型字典翻译
    bookTypeFormat(row, column) {
      return this.selectDictLabel(this.bookOptions, row.bookid)
    },
    /** 查询book列表 */
    getList() {
      this.loading = true
      listSection(this.addDateRange(this.queryParams, this.dateRange)).then(
        response => {
          this.sectionList = response.data.rows
          this.total = response.data.total
          this.loading = false
        }
      )
    },
    /** 查询book下拉树结构 */
    getTreeselect() {
      books().then(response => {
        if (response.code === 200) {
          this.bookTreeOptions = [
            {
              title: '全部',
              id: 0,
              children: response.data
            }
          ]
        }
      })
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.bookid = data.id
      this.getList()
    },
    // 课程类型字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.course.type)
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 取消按钮
    cancel2() {
      this.open2 = false
      this.resetAddCourseForm()
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        bookid: undefined,
        title: undefined,
        subTitle: undefined,
        inorder: undefined,
        week: undefined,
        remark: undefined
      }
      this.resetForm('form')
    },
    // 表单重置
    resetAddCourseForm() {
      this.addCourseForm = {
        id: undefined,
        sectionId: undefined,
        title: undefined,
        subTitle: undefined,
        courseId: undefined,
        sort: undefined
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1
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
      this.open = true
      this.title = '新增课程章节'
      this.reset()
      this.getTreeselect()
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      this.getTreeselect()
      const id = row.id || this.ids
      this.getDicts('sys_user_attribute')
      getSection(id).then(response => {
        this.form = response.data
        this.title = '修改课程章节'
        this.open = true
      })
    },
    handleAddCourse(row) {
      this.resetAddCourseForm()
      this.addCourseFormTitle = '添加课程'
      this.addCourseForm.sectionId = row.id
      this.addCourseForm.title = row.title
      this.addCourseForm.subTitle = row.subTitle
      getCoursesByBook({ bookid: row.bookid }).then(response => {
        if (response.code === 200) {
          this.courseOptions = response.data.map(item => {
            return {
              dictLabel: item.name,
              dictValue: item.id
            }
          })
        }
        this.open2 = true
      })
    },
    handleUpdateCourse(row) {
      this.resetAddCourseForm()
      this.addCourseFormTitle = '更改课程'
      getSectionCourse(row.id)
        .then(response => {
          if (response.code === 200) {
            const data = response.data
            this.addCourseForm.id = data.id
            this.addCourseForm.sectionId = data.section.id
            this.addCourseForm.title = data.section.title
            this.addCourseForm.subTitle = data.section.subTitle
            this.addCourseForm.courseId = data.courseId
            this.addCourseForm.sectionId = data.sectionId
            this.addCourseForm.sort = data.sort
            return getCoursesByBook({ bookid: data.section.bookid })
          }
        })
        .then(response => {
          if (response.code === 200) {
            this.courseOptions = response.data.map(item => {
              return {
                dictLabel: item.name,
                dictValue: item.id
              }
            })
            this.open2 = true
          }
        })
    },
    submitAddCourseForm: function() {
      this.$refs.addCourseForm.validate(valid => {
        if (valid) {
          if (this.addCourseForm.id !== undefined) {
            updateSectionCourse(this.addCourseForm).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open2 = false
                this.getList()
              }
            })
          } else {
            addSectionCourse(this.addCourseForm).then(response => {
              if (response.code === 200) {
                this.msgSuccess('新增成功')
                this.open2 = false
                this.getList()
              }
            })
          }
        }
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateSection(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              }
            })
          } else {
            addSection(this.form).then(response => {
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
      this.$confirm('是否确认删除章节编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return delSection(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
        .catch(function() {})
    },
    /** 删除按钮操作 */
    handleDeleteCourse(row) {
      const id = row.id
      this.$confirm('是否确认删除ID为"' + id + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return deleteSectionCourse(id)
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
