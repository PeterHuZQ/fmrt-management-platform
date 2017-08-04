<!--用户中心  -->
<template lang="html">
  <div class="user-center">
    <div class="group-btn">
      <el-button @click="addUserInfo" type="primary">新建</el-button>
      <el-button type="primary">编辑</el-button>
      <el-button >删除</el-button>
    </div>
    <!--表格开始  -->
    <el-table :data="tableData" border tooltip-effect="dark" style="width: 100%">
      <el-table-column
        type="selection"
        label="全选"
        width="80">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="140">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="100">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="100">
      </el-table-column>
      <el-table-column
        prop="birthday"
        label="出生日期"
        width="160">
      </el-table-column>
      <el-table-column
        prop="insert_time"
        label="创建日期"
        width="220">
      </el-table-column>
      <el-table-column
        prop="update_time"
        label="更新日期"
        width="220">
      </el-table-column>
    </el-table>
    <!--表格结束  -->
    <!--页码  -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="currentSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
    <!--页码 结束 -->
    <!-- 弹出新建 开始 -->
    <div class="messageBox">
      <el-dialog title="新建用户信息" v-model="isAdd" class="addForm" size="tiny">
        <el-form label-position="right" :model="addForm"  label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model.trim="addForm.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model.trim="addForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model.trim="addForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model.trim="addForm.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model.trim="addForm.sex" placeholder="请输入性别"></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-input v-model.trim="addForm.birthday" placeholder="请输入出生日期"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addReset">取消</el-button>
          <el-button type="primary" @click="getInsertCustomerBasic">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 弹出新建 结束 -->
  </div>
</template>

<script>
import api from '@/api'
import {formatDate} from '../../../common/js/date'

export default {
  data () {
    return {
      searchFormData: {
        page: 1, // 页面请求的初始值
        rows: 5 // 页面请求的数量
      },
      totalCount: 1, // 总页数,默认为1
      currentSize: 5, // 当前页数,默认为5
      currentPage: 1, // 当前页码
      tableData: [], // 列表数据
      isAdd: false,  // 添加弹窗
      addForm: {
        userName: '',  // 新建form
        password: '',
        name: '',
        age: '',
        sex: '',
        birthday: ''
      }
    }
  },
  created () {
    this.getListUser() // 页面渲染时发送请求
  },
  methods: {
    async getListUser() {
      const obj = {} // 初始化一个对象
      Object.keys(this.searchFormData).forEach(key => {
        if (this.searchFormData[key] !== '') {
          obj[key] = this.searchFormData[key]
        }
      })
      let result
      try {
        result = await api.userCenter.getListUser(obj).then((res) => {
          return res.data
        })
      } catch (e) {
        console.error('e: ', e)
        return
      }
      if (result.status === 200) {
        this.tableData = result.rows
        this.totalCount = result.total  // 把数据中的总条数赋值到页面中
      } else {
        this.$message({
          message: '获取数据失败',
          type: 'warning'
        })
      }
    },
    formatSex (val) {
      if (val === 1) {
        return '男'
      } else if (val === 2) {
        return '女'
      } else {
        return '未知'
      }
    },
    formatBirthday (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')  // 调用引入的JS模块
    },
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')  // 调用引入的JS模块
    },
    // 当前页码数
    handleCurrentChange(val) {
      if (this.currentPage !== val) {
        this.currentPage = val
        this.isQuery = false
      }
      if (!this.isQuery) {
        this.searchFormData.page = val
        this.getListUser()
      }
    },
    // 当前一页的条数
    handleSizeChange(val) {
      this.currentSize = val
      this.searchFormData.rows = val
      this.getListUser()
    },
    // 点击新建
    addUserInfo() {
      this.addReset() // 清空表单
      this.isAdd = true
    },
    // 新建重置
    addReset() {
      this.addForm.userName = ''
      this.addForm.name = ''
      this.addForm.password = ''
      this.addForm.age = ''
      this.addForm.sex = ''
      this.addForm.birthday = ''
    },
    async getInsertCustomerBasic() {
      // 判断保存的数据是否为空
      if (!this.addForm.userName) {
        this.$message({
          message: '用户名不能为空',
          type: 'warning'
        })
        return false
      }
      if (!this.addForm.password) {
        this.$message({
          message: '密码不能为空',
          type: 'warning'
        })
        return false
      }
      if (!this.addForm.name) {
        this.$message({
          message: '姓名不能为空',
          type: 'warning'
        })
        return false
      }
      if (!this.addForm.age) {
        this.$message({
          message: '年龄不能为空',
          type: 'warning'
        })
        return false
      }
      if (!this.addForm.sex) {
        this.$message({
          message: '性别不能为空',
          type: 'warning'
        })
        return false
      }
      if (!this.addForm.birthday) {
        this.$message({
          message: '出生日期不能为空',
          type: 'warning'
        })
        return false
      }
      let result
      try {
        result = await api.userCenter.getInsertCustomerBasic(this.addForm)
      } catch (e) {
        console.error('error: ', e)
      } finally {
        this.isAdd = false     // 关闭弹窗
      }
      if (result.data.status === 200) {
        this.getListUser()  // 新增标签保存成功，从新刷新界面
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-center {
  .top {
    margin: 30px 0 20px 0;
  }
  .submit {
    text-align: right;
  }
  .group-btn {
    .el-button {
      margin: 10px 5px 20px 5px;
    }
  }
  .addBtn {
    margin-bottom: 10px;
  }
  .block {
    text-align: center;
    margin-top: 30px;
  }
  .footer {
    margin-top: 20px;
    text-align: center;
  }
  .topTip {
    margin-bottom: 20px;
  }
  .bottomTip {
    color: #ccc;
  }
  .import-info {
    text-align: center;
    .blue {
      color: #20A0FF;
    }
    .danger {
      color: #FF4949;
    }
  }
  a {
    color: inherit;
  }
}
</style>
<style lang="less">
.user-center {
  // 弹窗样式
  .messageBox {
    .el-input-group--prepend {
      .el-select {
        .el-input__inner {
          width: 90px;
          color: #000000;
        }
      }
    }
    .el-cascader {
      width: 100%;
    }
    .el-upload--text {
      width: 100%;
    }
  } // 表格样式
  .el-table {
    border: none;
  }
  .el-table__fixed,
  .el-table__fixed-right {
    //  box-shadow: none;
  }
  .el-table td,
  .el-table th.is-leaf {
    border: none;
  }
  .el-table--border td,
  .el-table--border th {
    border: none;
  }
  .el-table--border td,
  .el-table--border th {
    border: none;
  }
}
</style>
