<template>
 <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="名称">
        <el-input
          v-model="queryParams.apiName"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="queryParams.status" placeholder="API状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="apiList"
      row-key="apiId"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="apiName" label="名称" :show-overflow-tooltip="true" width="160"></el-table-column>
      <el-table-column prop="orderNum" label="排序" width="60"></el-table-column>
      <el-table-column prop="path" label="API路径" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="type" label="接口类型" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="状态" :formatter="statusFormat" width="80"></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" 
            type="text" 
            icon="el-icon-edit" 
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button 
            size="mini" 
            type="text" 
            icon="el-icon-plus" 
            @click="handleAdd(scope.row)"
          >新增</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改API对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级API">
              <treeselect
                v-model="form.parentId"
                :options="apiOptions"
                :normalizer="normalizer"
                :show-count="true"
                placeholder="选择上级API"
              />
            </el-form-item>
          </el-col>          
          <el-col :span="12">
            <el-form-item label="名称" prop="apiName">
              <el-input v-model="form.apiName" placeholder="请输入名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="类型" prop="type">
              <el-radio-group v-model="form.type">
                <el-radio label="1">接口</el-radio>
                <el-radio label="2">目录</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item  v-if="form.type == '1'" label="接口路径" prop="path">
              <el-input v-model="form.path" placeholder="请输入接口路径" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.type != '2'" label="接口类型" prop="apiType">
                <el-select v-model="form.apiType" placeholder="请选择">
                    <el-option
                        v-for="item in apiTypeOptions"
                        :key="item.dictValue"
                        :label="item.dictLabel"
                        :value="item.dictValue">
                    </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  v-if="form.type == '1'" label="接口状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item v-if="form.type == '1'" label="功能描述" prop="description">
                <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="form.description">
                </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
                <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="form.remark">
                </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { treeApi, getApi, delApi, addApi, updateApi } from "@/api/system/api";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import IconSelect from "@/components/IconSelect";

export default {
  name: "API",
  components: { Treeselect, IconSelect },
  data() {
    return {
      // 遮罩层
      loading: true,
      // API表格树数据
      apiList: [],
      // API树选项
      apiOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // API状态数据字典
      statusOptions: [],
      // API请求类型数据字典
      apiTypeOptions: [],
      // 查询参数
      queryParams: {
        apiName: undefined,
        visible: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        apiName: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        orderNum: [
          { required: true, message: "API顺序不能为空", trigger: "blur" }
        ],
        path: [
          { required: true, message: "接口路径不能为空", trigger: "blur" }
        ],
        apiType: [
          { required: true, message: "接口类型不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("sys_api_query_type").then(response => {
      this.apiTypeOptions = response.data;
    });
  },
  methods: {
    // 选择图标
    selected(name) {
      this.form.icon = name;
    },
    /** 查询API列表 */
    getList() {
      this.loading = true;
      treeApi(this.queryParams).then(response => {
        this.apiList = response.data;
        this.loading = false;
      });
    },
    /** 转换API数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.apiId,
        label: node.apiName,
        children: node.children
      };
    },
    /** 查询API下拉树结构 */
    getTreeselect() {
      treeApi().then(response => {
        this.apiOptions = [];
        const api = { apiId: 0, apiName: '主类目', children: [] };
        api.children = response.data;
        this.apiOptions.push(api);
      });
    },
    // API状态字典翻译
    statusFormat(row, column) {
      if (row.type != "1") {
        return "";
      }
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        apiId: undefined,
        parentId: 0,
        apiName: undefined,
        apiType: undefined,
        description: undefined,
        remark: undefined,
        type: "1",
        orderNum: 0,
        status: "0"
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      this.getTreeselect();
      if (row != null && row.apiId) {
        this.form.parentId = row.apiId;
      } else {
        this.form.parentId = 0;
      }
      this.open = true;
      this.title = "添加API";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      getApi(row.apiId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改API";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
            console.log(this.form);
          if (this.form.apiId != undefined) {
            updateApi(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addApi(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm('是否确认删除名称为"' + row.apiName + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delApi(row.apiId);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    }
  }
};
</script>