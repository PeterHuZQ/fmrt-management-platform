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
        prop="uuid"
        label="ID"
        width="100">
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
          <el-button type="primary">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 弹出新建 结束 -->
  </div>
</template>

<script>
import axios from 'axios'
import {formatDate} from '../../../common/js/date'

export default {
  data () {
    return {
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
    this.GetData()
  },
  methods: {
    GetData () {
      axios.get('/api/rest/user/list').then((res) => {
        for (let i = 0; i < res.data.rows.length; i++) {
          let user = {}
          user.uuid = res.data.rows[i].uuid
          user.userName = res.data.rows[i].userName
          user.name = res.data.rows[i].name
          user.age = res.data.rows[i].age
          user.sex = this.formatSex(res.data.rows[i].sex)
          user.birthday = this.formatBirthday(res.data.rows[i].birthday)
          user.insert_time = this.formatDate(res.data.rows[i].insert_time)
          user.update_time = this.formatDate(res.data.rows[i].update_time)
          this.tableData.push(user)
        }
      })
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
    // 点击新建
    addUserInfo() {
      this.addReset() // 清空表单
      this.isAdd = true
    },
    // 新建重置
    addReset() {
      this.addForm.idCard = ''
      this.addForm.idName = ''
      this.addForm.idType = ''
      this.unitVal = []
      this.isAdd = false
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
