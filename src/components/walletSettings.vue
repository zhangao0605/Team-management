<template>
  <div>
    <!--添加节点-->
    <el-dialog width="35%" title="新增版本更新" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="版本号：" :label-width="formLabelWidth">
          <el-input v-model="form.version" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="更新内容：" :label-width="formLabelWidth">
          <el-input
            style="width: 70%;resize: none"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入内容"
            v-model="form.content">
          </el-input>
        </el-form-item>
        <el-form-item label="是否强更：" :label-width="formLabelWidth">
          <el-radio v-model="form.is_stronger" label='1'>是</el-radio>
          <el-radio v-model="form.is_stronger" label='2'>否</el-radio>
        </el-form-item>
        <el-form-item label="更新链接：" :label-width="formLabelWidth">
          <el-input v-model="form.link" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormcancle()">取 消</el-button>
        <el-button type="primary" @click="dialogFormsure()">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改-->
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>{{prompt_1}}</span>
      <br>
      <el-input style="width: 70%;margin-top: 30px" type="text" min="0" v-model="verify_value"
                placeholder="请输入"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_cance()">取 消</el-button>
    <el-button type="primary" @click="dialog_sure()">确 定</el-button>
       </span>
    </el-dialog>
    <!--历史记录查看-->
    <el-dialog class="his_dialog" width="25%" title="历史记录" :visible.sync="dialogTableVisible">
      <el-table :data="tableData_4" :header-cell-style="this.tableHeaderColor">
        <el-table-column align="center" label="历史值">
          <template slot-scope="scope">
            <span>{{scope.row.value}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="修改时间">
          <template slot-scope="scope">
            <span>{{timestampToTime(scope.row.updatetime)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <div class="index_table_swith">
      <div class="table_item" @click="swich_tab(index)" v-for="(list, index) in table_items"
           :class="index== isactive ? item_active :'item_default'">{{list.name}}
      </div>
    </div>
    <div class="ws_con_1" v-show="is_show[0].is_true">
      <div class="index_table_swith">
        <div class="table_item" @click="swich_tab_2(index)" v-for="(list, index) in table_items_2"
             :class="index== isactive_2 ? item_active :'item_default'">{{list.name}}
        </div>
      </div>
      <div class="ws_con_3" v-show="is_show_2[0].is_true">
        <el-button type="primary" @click="add_ios_android(0)">新增更新</el-button>
        <div class="con_table">
          <el-table
            :data="tableData"
            border
            style="width: 100%;margin-bottom: 30px;margin-top: 20px;min-height: 529px"
            :header-cell-style="this.tableHeaderColor"
          >
            <el-table-column
              label="更新时间"
              align="center">
              <template slot-scope="scope">
                <span>{{timestampToTime(scope.row.updatetime)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="版本号"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.version}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="更新内容"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.updatecontent}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="是否强制"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.forced==true?'是':'否'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="更新链接"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.updatelink}}</span>
              </template>
            </el-table-column>

          </el-table>
          <el-pagination
            background
            @current-change="currentPageChange"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total,prev, pager, next"
            :total="totla">
          </el-pagination>
        </div>
      </div>
      <div class="ws_con_4" v-show="is_show_2[1].is_true">
        <el-button type="primary" @click="add_ios_android(1)">新增更新</el-button>
        <div class="con_table">
          <el-table
            :data="tableData_1"
            border
            style="width: 100%;margin-bottom: 30px;margin-top: 20px;min-height: 529px"
            :header-cell-style="this.tableHeaderColor"
          >
            <el-table-column
              label="更新时间"
              align="center">
              <template slot-scope="scope">
                <span>{{timestampToTime(scope.row.updatetime)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="版本号"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.version}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="更新内容"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.updatecontent}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="是否强制"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.forced==true?'是':'否'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="更新链接"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.updatelink}}</span>
              </template>
            </el-table-column>

          </el-table>
          <el-pagination
            background
            @current-change="currentPageChange_1"
            :current-page="currentPage_1"
            :page-size="pagesize_1"
            layout="total,prev, pager, next"
            :total="totla_1">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="ws_con_2" v-show="is_show[1].is_true">
      <div class="con_table">
        <el-table
          :data="tableData_2"
          border
          style="width: 60%;margin-bottom: 30px;margin-top: 20px;min-height: 253px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            label="规则名称"
            align="center">
            <template slot-scope="scope">
              <span>{{rule_name(scope.row.name)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="数值"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.value}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="260"
            align="center">
            <template slot-scope="scope">
              <div class="edit_con">
                <span @click="edit_rule(scope.row.name,scope.row.value,0)">修改</span>
                <span @click="view_history(scope.row.name,0)">查看历史</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        邀请链接域名设置
      </div>
      <div class="con_table">
        <el-table
          :data="tableData_3"
          border
          style="width: 40%;margin-bottom: 30px;margin-top: 20px;min-height: 109px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            label="邀请链接域名"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.value}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="260"
            align="center">
            <template slot-scope="scope">
              <div class="edit_con">
                <span @click="edit_rule(scope.row.name,scope.row.value,1)">修改</span>
                <span @click="view_history(scope.row.name,1)">查看历史</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    updatesettings,
    newupdate,
    withdrawalrules,
    withdrawalsconfigure,
    invitelink,
    viewinghistory
  } from '../api/interface'

  export default {
    name: "walletSettings",
    data() {
      return {
        form: {
          'version': '',
          'content': '',
          'is_stronger': '1',
          'link': '',
        },
        formLabelWidth: '150px',
        dialogFormVisible: false,
        dialogTableVisible: false,
        table_items: [
          {"name": ' 强制更新设置 '},
          {"name": ' 提现及邀请 '},
        ],
        isactive: 0,
        item_active: 'item_active',
        item_default: 'item_default',
        is_show: [
          {"is_true": true},
          {"is_true": false},
        ],
        table_items_2: [
          {"name": ' IOS系统 '},
          {"name": ' 安卓系统 '},
        ],
        isactive_2: 0,
        is_show_2: [
          {"is_true": true},
          {"is_true": false},
        ],
        currentPage: 1,
        pagesize: 10,
        totla: 0,
        tableData: [],
        tableData_1: [],
        tableData_2: [],
        tableData_3: [],
        tableData_4: [],
        currentPage_1: 1,
        pagesize_1: 10,
        totla_1: 0,
        system: 0,
        dialogVisible: false,
        verify_value: '',
        edit_con: {
          'name': '',
          'value': '',
        },
        edit_link: {
          'name': '',
          'value': '',
        },
        edit_type: 0,
        prompt_1: '',
        his_name: ''

      }
    }, methods: {
      swich_tab(e) {
        this.isactive = e
        if (e == 1) {
          this.get_rule()
        }
        this.is_show.forEach((item, index, self) => {
          if (index == e) {
            item.is_true = true
          } else {
            item.is_true = false
          }
        })
      },
      swich_tab_2(e) {
        this.isactive_2 = e
        if (e == 0) {
          this.initialization_data()
        } else {
          this.initialization_data_1()
        }
        this.is_show_2.forEach((item, index, self) => {
          if (index == e) {
            item.is_true = true
          } else {
            item.is_true = false
          }
        })
      },
      getdata(e, q) {
        updatesettings(e).then(response => {
          if (response.data.dataList == []) {
            this.tableData = []
          } else {
            if (q == 0) {
              this.tableData = response.data.dataList
              this.totla = response.data.total
            } else if (q == 1) {
              this.tableData_1 = response.data.dataList
              this.totla_1 = response.data.total
            } else {

            }
          }
        })
      },
      /*ios初始化数据*/
      initialization_data() {
        this.currentPage = 1
        let data = {"page": 1, "pagesize": 10, "system": "0"}
        this.getdata(data, 0)
      },
      /*And初始化数据*/
      initialization_data_1() {
        this.currentPage_1 = 1
        let data = {"page": 1, "pagesize": 10, "system": "1"}
        this.getdata(data, 1)
      },
      /*ios分页查询*/
      currentPageChange(e) {
        this.currentPage = e
        let data = {"page": this.currentPage, "pagesize": 10, "system": "0"}
        this.getdata(data, 0)
      },
      /*安卓分页查询*/
      currentPageChange_1(e) {
        this.currentPage_1 = e
        let data = {"page": this.currentPage_1, "pagesize": 10, "system": "1"}
        this.getdata(data, 1)
      },
      /*安卓，ios新增记录*/
      add_ios_android(e) {
        this.system = e
        this.dialogFormVisible = true
      },
      /*取消新增更新*/
      dialogFormcancle() {
        this.dialogFormVisible = false
        this.form = {
          'version': '',
          'content': '',
          'is_stronger': '1',
          'link': '',
        }
      },
      /*确认新增更新*/
      dialogFormsure() {
        let forced = true
        if (this.form.is_stronger == 1) {
          forced = true
        } else {
          forced = false
        }
        let data = {
          "system": this.system.toString(),
          "version": this.form.version,
          "updatecontent": this.form.content,
          "forced": forced,
          "updatelink": this.form.link
        }
        newupdate(data).then(response => {
          this.dialogFormVisible = false
          this.form = {
            'version': '',
            'content': '',
            'is_stronger': '1',
            'link': '',
          }
          if (response.eCode == 200) {
            this.$message({
              showClose: true,
              message: '新增更新记录成功！',
              type: 'success'
            });
            if (this.system == 0) {
              this.initialization_data()
            } else {
              this.initialization_data_1()
            }
          } else {
            this.$message({
              showClose: true,
              message: '新增更新记录失败！',
              type: 'error'
            });
          }
        })

      },
      /*获取规则*/
      get_rule() {
        withdrawalrules().then(response => {
          if (response.eCode == 200) {
            this.tableData_2 = response.data.dataList
          } else {

          }
        })
        invitelink().then(response => {
          if (response.eCode == 200) {
            this.tableData_3 = response.data.dataList
          } else {

          }
        })
      },
      /*匹配规则name*/
      rule_name(e) {
        let name = ''
        if (e == 'redeemceiling') {
          name = '单笔提现金额'
        }
        else if (e == 'redeemceilingcount') {
          name = '每日提现次数'
        }
        else if (e == 'redeemsingleceiling') {
          name = '自动提现审批金额'
        }
        else if (e == 'redeemonedayceiling') {
          name = '单日单交易所地址最大提现数量'
        }
        return name
      },
      /*点击修改*/
      edit_rule(name, value, type) {
        this.edit_type = type
        this.verify_value = value
        if (type == 0) {
          this.edit_con = {
            'name': name,
            'value': value,
          }
          this.prompt_1 = '修改后会影响用户提现，请确认后再进行'

        } else {
          this.edit_link = {
            'name': name,
            'value': value,
          }
          this.prompt_1 = '修改后会影响分享链接，请确认后进行'
        }
        this.dialogVisible = true
      },
      /*修改相关取消*/
      dialog_cance() {
        this.dialogVisible = false
        this.edit_con = {
          'name': '',
          'value': '',
        }
        this.edit_link = {
          'name': '',
          'value': '',
        }
      },
      /*修改相关确认*/
      dialog_sure() {
        let data
        if (this.edit_type == 0) {
          data = {"name": this.edit_con.name, "value": this.verify_value}
        } else {
          data = {"name": this.edit_link.name, "value": this.verify_value}
        }
        withdrawalsconfigure(data).then(response => {
          this.dialogVisible = false
          this.verify_value = ''
          if (response.eCode == 200) {
            this.$message({
              showClose: true,
              message: '修改成功！',
              type: 'success'
            });
            this.get_rule()
          } else {
            this.$message({
              showClose: true,
              message: '修改失败，请稍后重试！',
              type: 'error'
            });
          }
        })
      },
      /*查看修改历史*/
      view_history(name, type) {
        this.dialogTableVisible = true
        let data = {'name': name}
        viewinghistory(data).then(response => {
          if (response.eCode == 200) {
              this.tableData_4=response.data.dataList
          } else {
            this.tableData_4=[]
          }
        })
      }
    }, created() {
      this.initialization_data()
    }
  }
</script>
<style>
  .his_dialog .el-dialog__body{
    height: 500px;
    overflow: auto;
  }
  .his_dialog .el-dialog__body::-webkit-scrollbar {
    width: 8px;
  }
  .his_dialog .el-dialog__body::-webkit-scrollbar-track {

    background-color: #FFFFFF;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius:2em;
  }
  .his_dialog .el-dialog__body::-webkit-scrollbar-thumb {
    background-color: #cdcdcd;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius:2em;
  }
</style>
<style scoped>
  .edit_con {
    display: flex;
    justify-content: space-around;
  }

  .edit_con span {
    padding: 0 10px;
    cursor: pointer;
    user-select: none;
    color: #800080;
  }

  .item_active {
    color: #800080;
    border-bottom: 2px solid #800080;
    padding-bottom: 5px;
  }

  .item_default {
    color: #000000;
  }

  .table_item {
    margin-bottom: 30px;
    font-size: 18px;
    user-select: none;
    cursor: pointer;
  }

  .el-pagination {
    position: relative;
    float: right;
    margin-right: 3%;
    margin-top: 30px;
    margin-bottom: 50px;
  }

  .index_table_swith {
    width: 20%;
    display: flex;
    justify-content: space-between;
  }

</style>
