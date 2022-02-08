<template>
  <div class="app-container">
    <el-form
      ref="queryForm"
      :model="queryParams"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="课程名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入课程名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="课程状态"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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
      :data="courseList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="课程编号" align="center" prop="id" />
      <el-table-column label="课程名称" align="center" prop="name" />
      <el-table-column
        label="课程类型"
        align="center"
        prop="type"
        :formatter="typeFormat"
      />
      <el-table-column
        label="所属book"
        align="center"
        prop="bookType"
        :formatter="bookTypeFormat"
      />
      <el-table-column label="制作人" align="center" prop="user.userName" />
      <el-table-column
        label="状态"
        align="center"
        prop="status"
        :formatter="statusFormat"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="音频" width="320" align="center" prop="audio">
        <template slot-scope="scope">
          <audio
            v-if="scope.row.audio != '' && scope.row.audio != null"
            controls
          >
            <source :src="getAudioUrl(scope.row.audio)" type="audio/ogg">
            <source :src="getAudioUrl(scope.row.audio)" type="audio/mpeg">
            您的浏览器不支持 audio 元素。
          </audio>
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

    <!-- 添加或修改课程对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入课程名称" />
        </el-form-item>
        <el-form-item label="课程类型" prop="type">
          <el-radio-group v-model="form.type" size="medium">
            <el-radio-button
              v-for="item in typeOptions"
              :key="item.dictValue"
              :label="item.dictValue"
            >{{ item.dictLabel }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.type == 2" label="音频资源" prop="audio">
          <el-upload
            ref="upload"
            action=""
            accept=".mp3"
            :limit="1"
            :disabled="upload.loading"
            :file-list="upload.fileList"
            :auto-upload="false"
          >
            <el-button
              slot="trigger"
              size="small"
              type="primary"
            >选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传mp3文件</div>
          </el-upload>
          <audio v-if="form.audio != '' && form.audio != null" controls>
            <source :src="getAudioUrl(form.audio)" type="audio/ogg">
            <source :src="getAudioUrl(form.audio)" type="audio/mpeg">
            您的浏览器不支持 audio 元素。
          </audio>
        </el-form-item>
        <el-form-item label="课程内容" prop="content">
          <!-- <el-input
            v-model="form.content"
            type="textarea"
            :rows="13"
            placeholder="请输入课程内容"
          /> -->
          <ueditor v-model="form.content" />
        </el-form-item>
        <el-form-item label="解析" prop="solution">
          <!-- <el-input
            v-model="form.solution"
            type="textarea"
            :rows="13"
            placeholder="请输入解析"
          /> -->
          <ueditor v-model="form.solution" />
        </el-form-item>
        <el-form-item label="翻译" prop="translate">
          <!-- <el-input
            v-model="form.translate"
            type="textarea"
            :rows="13"
            placeholder="请输入翻译"
          /> -->
          <ueditor v-model="form.translate" />
        </el-form-item>
        <el-form-item label="问题与答案" prop="qa">
          <!-- <el-input
            v-model="form.qa"
            type="textarea"
            :rows="13"
            :placeholder="qaPlaceholder"
          /> -->
          <div v-for="(item, index) in qaList" :key="index" >
            <SingleChoiceCard v-model="qaList[index]" @handleInput="handleInput"/>
          </div>
          <el-button type="primary" icon="el-icon-plus" @click="handleAddQuestion">添加问题</el-button>
        </el-form-item>
        <el-form-item label="课程词汇" prop="vocabulary">
          <el-input
            v-model="form.vocabulary"
            type="textarea"
            :rows="13"
            :placeholder="vocabularyPlaceholder"
          />
        </el-form-item>
        <el-form-item label="所属book" prop="bookType">
          <el-select v-model="form.bookType" placeholder="请选择">
            <el-option
              v-for="dict in bookOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="课程状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{ dict.dictLabel }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
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
  listCourse,
  getCourse,
  delCourse,
  addCourse,
  updateCourse
} from '@/api/admin/course'
import { books } from '@/api/admin/book'
import ueditor from '@/components/Ueditor'
import SingleChoiceCard from '@/components/SingleChoiceCard'

export default {
  name: 'Course',
  components: {
    ueditor,
    SingleChoiceCard
  },
  data() {
    const validateJsonFormart = (rule, value, callback) => {
      if (value !== '' && !this.isJSON(value)) {
        callback(new Error('错误的json格式'))
      } else {
        callback()
      }
    }
    const validateAudio = (rule, value, callback) => {
      if (!this.form.audio && !this.$refs.upload.uploadFiles.length) {
        callback(new Error('请上传音频资源'))
      } else {
        callback()
      }
    }
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
      // 课程表格数据
      courseList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [],
      // 课程类型数据字典
      typeOptions: [],
      bookOptions: [],
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        name: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      qaList: [],
      // 表单校验
      rules: {
        name: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择课程类型', trigger: 'blur' }],
        status: [
          { required: true, message: '请选择课程状态', trigger: 'change' }
        ],
        bookType: [
          { required: true, message: '请选择课程所属book', trigger: 'change' }
        ],
        audio: [
          {
            validator: validateAudio,
            message: '请上传音频资源',
            trigger: 'change'
          }
        ],
        content: [
          { required: true, message: '请输入课程内容', trigger: 'blur' }
        ],
        qa: [{ validator: validateJsonFormart, trigger: 'blur' }],
        vocabulary: [{ validator: validateJsonFormart, trigger: 'blur' }]
      },
      upload: {
        fileList: [],
        loading: false
      },
      qaPlaceholder: `请输入json格式数据，如：[{
	"q": "1. It is possible for burglars to make jamming attacks with the necessary equipment and skill.",
	"a": 2,
	"option": ["A) 1It was dangerous to live in", "B) 1It was going to be renovated.", "C) 1He could no longer pay the rent.", "D) 1He had sold it to the royal family."]
}, {
	"q": "2. It is possible for burglars to make jamming attacks with the necessary equipment and skill.",
	"a": 2,
	"option": ["A) 2It was dangerous to live in", "B) 2It was going to be renovated.", "C) 2He could no longer pay the rent.", "D) 2He had sold it to the royal family."]
}]`,
      vocabularyPlaceholder: `请输入json格式数据，如：[{
	"word": "analysis ",
	"translate": " 分析，分解；梗概，要略；[数]解析；验定；"
}, {
	"word": "analogy",
	"translate": "类似，相似；比拟，类比；类推；"
}, {
	"word": "analogous",
	"translate": "相似的，可比拟的；<生>同功的；模拟式；"
}]`
    }
  },
  created() {
    this.getDicts('sys_normal_disable')
      .then(response => {
        if (response.code === 200) {
          this.statusOptions = response.data
        }
        return this.getDicts('app_course_type')
      })
      .then(response => {
        if (response.code === 200) {
          this.typeOptions = response.data
        }
        return books()
      })
      .then(response => {
        if (response.code === 200) {
          this.bookOptions = response.data.map(item => { return { dictLabel: item.title, dictValue: item.id } })
        }
        this.getList()
      })
  },
  methods: {
    handleAddQuestion() {
      this.qaList.push({
        question: '',
        answer: '',
        options: [
          {label: '', value: ''},
          {label: '', value: ''},
        ]
      })
    },
    handleInput(val) {
      console.log(val)
    },
    getAudioUrl(src) {
      return process.env.VUE_APP_BASE_API + src
    },
    /** 查询课程列表 */
    getList() {
      this.loading = true
      listCourse(this.addDateRange(this.queryParams, this.dateRange)).then(
        response => {
          this.courseList = response.data.rows
          this.total = response.data.total
          this.loading = false
        }
      )
    },
    // 课程状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status)
    },
    // 课程类型字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.type)
    },
    // 课程类型字典翻译
    bookTypeFormat(row, column) {
      return this.selectDictLabel(this.bookOptions, row.bookType)
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
        name: undefined,
        bookType: '',
        type: '',
        audio: '',
        content: '',
        qa: '',
        solution: '',
        translate: '',
        vocabulary: '',
        status: '',
        remark: undefined
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
      this.title = '添加课程'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getCourse(id).then(response => {
        this.form = response.data
        this.form.status += ''
        this.open = true
        this.title = '修改课程'
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      console.log(this.qaList)
      this.$refs['form'].validate(valid => {
        if (valid) {
          // 构造表单数据
          const formData = new FormData()
          for (const key in this.form) {
            formData.append(key, this.form[key])
          }
          if (this.$refs.upload && this.$refs.upload.uploadFiles) {
            const uploadFiles = this.$refs.upload.uploadFiles
            for (let i = 0; i < uploadFiles.length; i++) {
              formData.append('file', uploadFiles[i].raw)
            }
          }
          if (this.form.id !== undefined) {
            updateCourse(formData).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              }
            })
          } else {
            addCourse(formData).then(response => {
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
      this.$confirm('是否确认删除课程编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return delCourse(ids)
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
