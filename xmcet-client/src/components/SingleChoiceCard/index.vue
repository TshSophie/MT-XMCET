<template>
    <el-form class="form" ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="题目" prop="question">
          <el-input v-model="form.question" placeholder="请输入题目" @input="handleInput"/>
        </el-form-item>
        <el-form-item label="答案" prop="answer" style="margin: 5px 0">
          <el-input v-model="form.answer" placeholder="请输入题目" @input="handleInput" />
        </el-form-item>
        <div class="options">
            <el-form-item label="选项" prop="options">
                <el-table
                    :data="options"
                    style="width: 100%">
                    <el-table-column
                        label="序号"
                        align="center"
                        type="index"
                        :index="(index)=>index+1">
                        </el-table-column>
                    <el-table-column
                        prop="label"
                        label="内容"
                        width="180">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.label" placeholder="请输入内容" @input="handleInput"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="值"
                        width="180">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.value" placeholder="请输入值" @input="handleInput"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <el-tooltip content="上移" placement="top"><el-button @click="handleClick(scope, 'up')" type="text" size="small" icon="el-icon-top" ></el-button></el-tooltip>
                            <el-tooltip content="下移" placement="top"><el-button @click="handleClick(scope, 'down')" type="text" size="small" icon="el-icon-bottom"></el-button></el-tooltip>
                            <el-tooltip content="删除" placement="top"><el-button @click="handleClick(scope, 'del')" type="text" size="small" icon="el-icon-delete"></el-button></el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button @click="handleAddOption" type="text" icon="el-icon-circle-plus-outline">添加选项</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>
<script>
export default {
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            form: {
                options: []
            },
            rules: {},
            options: []
        }
    },
    created() {
        this.form = this.value
        this.options = this.value.options
    },
    methods: {
        handleClick(row, type) {
            switch(type) {
                case 'up':
                break;
                case 'down':
                    break;
                case 'del': 
                    let index = row.$index
                    this.options.splice(index, 1)
                    break;
                default:
                    break;
            }
            this.form.options = this.options
            this.$emit('input', this.form)
        },
        handleAddOption() {
            this.options.push({
                content: "",
                value: ""
            })
            this.form.options = this.options
            this.$emit('input', this.form)
        },
        handleInput() {
            this.form.options = this.options
            console.log(this.form)
            this.$emit('input', this.form)
            this.$emit('handleInput', this.form)
        }
    }
}
</script>
<style lang="less" scoped>
.form {
    border-radius: 15px;
    border: #eee 2px solid;
    box-shadow: rgba(255, 255, 255, .5) 4px 4px;
    margin: 5px;
    padding: 5px;
}
</style>