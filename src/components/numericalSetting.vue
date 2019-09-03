<template>
  <div class="ns_all">
    <div class="index_table_swith">
      <div class="table_item" @click="swich_tab(index)" v-for="(list, index) in table_items"
           :class="index== isactive ? item_active :'item_default'">{{list.name}}
      </div>
    </div>
    <!--修改权益值M-->
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>M值现在为：{{edit_value.m_value}}</span>
      <br>
      <span>修改M值后，将会影响现在及以后的奖励计算，请确认后再进行更改</span>
      <br>
      <el-input style="width: 70%;margin-top: 30px" type="number" min="0" v-model="verify_value"
                placeholder="请输入新M值"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_cancel()">取 消</el-button>
    <el-button type="primary" @click="dialog_sure()">确 定</el-button>
       </span>
    </el-dialog>
    <!--修改权益值N-->
    <el-dialog
      title=""
      :visible.sync="dialogVisible_1"
      width="30%"
    >
      <span>N值现在为：{{edit_value.n_value}}</span>
      <br>
      <span>修改N值后，将会影响现在及以后的奖励计算，请确认后再进行更改</span>
      <br>
      <el-input style="width: 70%;margin-top: 30px" v-model="verify_value_1" placeholder="请输入新N值"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_cancel_1()">取 消</el-button>
    <el-button type="primary" @click="dialog_sure_1()">确 定</el-button>
       </span>
    </el-dialog>
    <!--历史记录M值-->
    <el-dialog width="30%" title="历史记录 M值" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" :header-cell-style="this.tableHeaderColor">
        <el-table-column align="center" label="M值">
          <template slot-scope="scope">
            <span>{{scope.row.value}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="修改时间">
          <template slot-scope="scope">
            <span>{{timestampToTime(scope.row.timestamp)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--历史记录N值-->
    <el-dialog width="30%" title="历史记录 N值" :visible.sync="dialogTableVisible_1">
      <el-table :data="gridData_1" :header-cell-style="this.tableHeaderColor">
        <el-table-column align="center" label="N值">
          <template slot-scope="scope">
            <span>{{scope.row.value}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="修改时间">
          <template slot-scope="scope">
            <span>{{timestampToTime(scope.row.timestamp)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--添加节点-->
    <el-dialog width="35%" title="添加创世王者节点" :visible.sync="dialogFormVisible">
      <!--<el-dialog-->
        <!--title=""-->
        <!--:visible.sync="dialogtwo"-->
        <!--width="30%"-->
        <!--append-to-body-->
      <!--&gt;-->
        <!--<span>您正在将地址为：XXXXXX，绑定手机号为XXXX的节点添加为创世王者节点，节点质押金额XXXXX TUE ，本次添加需要二次确认，是否确认</span>-->
        <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogtwo_cancel()">取 消</el-button><el-button type="primary"-->
                                                                         <!--@click="dialogtwo_sure()">确 定</el-button>-->
       <!--</span>-->
      <!--</el-dialog>-->
      <el-form :model="form">
        <el-form-item label="节点地址：" :label-width="formLabelWidth">
          <el-input v-model="form.address" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="节点绑定手机号：" :label-width="formLabelWidth">
          <el-input maxlength="11" show-word-limit v-model="form.phone" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="质押金额：" :label-width="formLabelWidth">
          <el-input min="0" type="number" v-model="form.value" style="width: 70%" autocomplete="off"></el-input>
          <span style="margin-left: 5%;font-size: 16px">TUE</span>
        </el-form-item>
        <el-form-item label="节点所属批次：" :label-width="formLabelWidth">
          <el-select v-model="node_select" placeholder="请选择批次">
            <el-option
              v-for="item in node_options"
              :key="item.batch"
              :label="item.batchName"
              :value="item.batch">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormcancle()">取 消</el-button>
        <el-button type="primary" @click="dialogFormsure()">确 定</el-button>
      </div>
    </el-dialog>
    <!--强制解绑-->
    <el-dialog
      title=""
      :visible.sync="dialogUntied"
      width="30%"
    >
      <span>该节点不符合创世王者节点要求，强制解绑后该节点所有质押金额会返还至Thinkey主账户，需要在线下为该节点退费。是否确认强制解绑。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUntied_cancel()">取 消</el-button>
    <el-button type="primary" @click="dialogUntied_sure()">强制解绑</el-button>
       </span>
    </el-dialog>
    <!--删除节点-->
    <el-dialog
      title=""
      :visible.sync="dialogdelete"
      width="25%"
    >
      <div>您将删除创世节点，请确认！</div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogdelete_cancel()">取 消</el-button>
    <el-button type="primary" @click="dialogdelete_sure()">确 定</el-button>
       </span>
    </el-dialog>
    <!--修改节点-->
    <el-dialog width="35%" title="修改创世王者节点" :visible.sync="dialogedit">
      <el-form :model="form_1">
        <el-form-item label="节点名称：" :label-width="formLabelWidth">
          <span>{{form_1.name}}</span>
        </el-form-item>
        <el-form-item label="节点地址：" :label-width="formLabelWidth">
          <span>{{form_1.address}}</span>
        </el-form-item>
        <el-form-item label="节点绑定手机号：" :label-width="formLabelWidth">
          <el-input maxlength="11" show-word-limit v-model="form_1.phone" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="质押金额：" :label-width="formLabelWidth">
          <el-input type="number" min="0" v-model="form_1.pledgeBalance" style="width: 70%" autocomplete="off"></el-input>
          <span style="margin-left: 5%;font-size: 16px">TUE</span>
        </el-form-item>
        <el-form-item label="节点所属批次：" :label-width="formLabelWidth">
          <el-select v-model="form_1.batch" placeholder="请选择">
            <el-option
              v-for="item in node_options"
              :key="item.batch"
              :label="item.batchName"
              :value="item.batch">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogeditcancle()">取 消</el-button>
        <el-button type="primary" @click="dialogeditsure()">确 定</el-button>
      </div>
    </el-dialog>
    <!--查看节点状态详情-->
    <el-dialog width="35%" title="下属节点详情" :visible.sync="dialogseedetail">
      <el-dialog
        width="70%"
        title="节点下属全部节点详情"
        :visible.sync="dialog_de_all"
        append-to-body>
        <div>
          共 {{nodeAllCheck_peoples==''?0:nodeAllCheck_peoples}} 人，质押 {{nodeAllCheck_tue==''?0:nodeAllCheck_tue}} TUE
        </div>
        <div>
          <el-select style="margin-top: 30px" v-model="select_value_1" @change="change_nodeLevel()" placeholder="请选择">
            <el-option
              v-for="item in node_options_1"
              :key="item.typeid"
              :label="item.typename"
              :value="item.typeid">
            </el-option>
          </el-select>

        </div>
        <div class="con_table" style="padding-bottom: 40px">
          <el-table
            :data="tableData_3"
            border
            style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
            :header-cell-style="this.tableHeaderColor"
          >
            <el-table-column
              label="节点加入时间"
              align="center">
              <template slot-scope="scope">
                <span>{{timestampToTime(scope.row.time)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="节点级别"
              align="center">
              <template slot-scope="scope">
                <span>{{node_level_matching(scope.row.nodelevel)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="节点地址"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.nodeaddress}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="节点绑定手机"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.nodephone}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="节点类型"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.nodetype}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="节点质押金额"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.nodeamount}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            @current-change="currentPageChange_1"
            :current-page="currentPage_1"
            :page-size="pagesize_1"
            layout="total,prev, pager, next"
            :total="totla_1"
            style="margin-top: 0;padding-bottom: 30px"
          >
          </el-pagination>
        </div>
      </el-dialog>
      <el-form>
        <el-form-item label="节点名称：" :label-width="formLabelWidth_1">
          <span>{{form_2.name}}</span>
        </el-form-item>
        <el-form-item label="节点状态：" :label-width="formLabelWidth_1">
          <span>{{form_2.status==0?'符合要求':form_2.status==1?'不符合要求':''}}</span>
        </el-form-item>
        <el-form-item label="节点地址：" :label-width="formLabelWidth_1">
          <span>{{form_2.address}}</span>
        </el-form-item>
        <el-form-item  label="节点绑定手机号：" :label-width="formLabelWidth_1">
          <span>{{form_2.phone}}</span>
        </el-form-item>
        <el-form-item label="节点质押金额：" :label-width="formLabelWidth_1">
          <span><span>{{form_2.pledgeBalance}}</span> TUE</span>
        </el-form-item>
        <el-form-item label="节点下属一级节点数量：" :label-width="formLabelWidth_1">
          <span><span>{{form_2.childrenLevelSecond}}</span></span>
        </el-form-item>
        <el-form-item label="节点下属全部节点数量：" :label-width="formLabelWidth_1">
          <span><span>{{form_2.childrenLevelsCount}}</span><span class="operating"
                                                                 @click="see_de_all(form_2.address)">查看详情</span></span>
        </el-form-item>
        <el-form-item label="节点下属全部节点质押数量：" :label-width="formLabelWidth_1">
          <span><span>{{form_2.childrenPledgeBalance}} TUE</span></span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--数值设置-->
    <div class="part_1" v-show="part_show[0].isShow">
      <div class="con_table">
        <el-table
          :data="number_seting"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            label="数据名称"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="数据值"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.value}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <span class="operating" v-show="scope.row.isShow" @click="edit(scope.row.label,scope.row.value)">修改</span>
              <span class="operating" v-show="scope.row.isShow" @click="history_record(scope.row.label)">历史记录</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--创世王者设置-->
    <div class="part_2" v-show="part_show[1].isShow">
      <el-button type="primary" @click="add_node()">添加节点
      </el-button>
      <div class="con_table">
        <el-table
          :data="number_seting_1"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            label="节点名称"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="节点地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="节点绑定手机号"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="节点批次"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.batch}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="质押金额"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.pledgeBalance}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="节点状态"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.status==0?'符合要求':scope.row.status==1?'不符合要求':''}}</span>
              <span class="operating_1" v-show="scope.row.status!=2"
                    @click="see_details(scope.row.address,scope.row.status)">查看详情</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <span class="operating" v-show="scope.row.status==1" @click="untied(scope.row.address)">强制解绑</span>
              <span class="operating" v-show="scope.row.status==2"
                    @click="edit_node(scope.row.name,scope.row.address,scope.row.phone,scope.row.batch,scope.row.pledgeBalance)">修改</span>
              <span class="operating" v-show="scope.row.status==2" @click="delete_node(scope.row.address)">删除</span>
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
  </div>
</template>

<script>
  import {
    getSettingInfo,
    updateSetting,
    getMNLog,
    getPersonInfoCreation,
    checkCreationDetails,
    insertCreationPerson,
    updateCreationPerson,
    unBindCreationAddress,
    deleteCreationAddress,
    subordinateNodeAllCheck,
    nodeLevel,
  } from '../api/interface'

  export default {
    name: "numericalSetting",
    data() {
      return {
        select_value_1: '',
        dialog_de_all: false,
        formLabelWidth_1: '200px',
        dialogseedetail: false,
        dialogedit: false,
        node_edit: 1,
        form: {
          "address": '',
          "phone": '',
          "value": '',
        },
        form_1: {
          "name": '',
          "address": '',
          "phone": '',
          "pledgeBalance": '',
          "batch": '',
        },
        form_2: {
          "address": "",
          "childrenLevelSecond": 0,
          "childrenLevelsCount": 0,
          "childrenPledgeBalance": "",
          "name": "",
          "status": "",
          "phone": "",
          "pledgeBalance": ""
        },
        dialogdelete: false,
        dialogtwo: false,
        dialogUntied: false,
        dialogFormVisible: false,
        formLabelWidth: '150px',
        dialogVisible: false,
        verify_value: '',
        dialogVisible_1: false,
        verify_value_1: '',
        dialogTableVisible: false,
        dialogTableVisible_1: false,
        isactive: 0,
        table_items: [
          {"name": ' 数值设置 '},
          {"name": ' 创世王者节点设置 '},
        ],
        part_show: [
          {"isShow": true},
          {"isShow": false},
        ],
        is_show: [
          {"is_true": true},
          {"is_true": false},
        ],
        gridData: [],
        gridData_1: [],
        item_active: 'item_active',
        item_default: 'item_default',
        number_seting: [],
        number_seting_1: [],
        tableData_3: [],
        node_select: 1,
        node_options: [
          {
            batch: 1,
            batchName: "第1批次",
          },
          {
            batch: 2,
            batchName: "第2批次",
          },
          {
            batch: 3,
            batchName: "第3批次",
          },
          {
            batch: 4,
            batchName: "第4批次",
          },
          {
            batch: 5,
            batchName: "第5批次",
          },
          {
            batch: 6,
            batchName: "第6批次",
          },
          {
            batch: 7,
            batchName: "第7批次",
          },
          {
            batch: 8,
            batchName: "第8批次",
          },
          {
            batch: 9,
            batchName: "第9批次",
          },
          {
            batch: 10,
            batchName: "第10批次",
          },

        ],
        node_options_1: [
          {
            "typeid": '',
            "typename": "请选择节点级别"
          },
        ],
        currentPage: 1,
        pagesize: 10,
        totla: 0,
        currentPage_1: 1,
        pagesize_1: 10,
        totla_1: 0,
        edit_value: {
          "m_value": 0,
          "n_value": 0,
        },
        untied_address:'',
        remove_address:'',
        nodeAllCheck_peoples: 0,
        nodeAllCheck_tue: 0,
        hi_re_3: '',
      }
    },
    methods: {
      /*初始化公共数据*/
      // getdata_public(){
      //   reviewBatch().then(response=>{
      //     this.node_options=this.node_options.concat(response.data)
      //   })
      // },
      /*获取part_1 公共方法*/
      getdata_1(e) {
        getSettingInfo(e).then(response => {
          if (response.data == []) {
            this.number_seting = []
          } else {
            this.number_seting = response.data
          }
        })
      },
      /*获取part_1 数据*/
      Initialization_data_1() {
        let data = {"equityPoolM": "", "equityPoolN": ""}
        this.getdata_1(data)
      },
      /*part_1 table切换*/
      swich_tab(e) {
        this.is_show.forEach((item, index, self) => {
          if (index == e) {
            item.is_true = true
          } else {
            item.is_true = false
          }
        })
        this.part_show.forEach((item, index, self) => {
          if (index == e) {
            item.isShow = true
          } else {
            item.isShow = false
          }
        })
        this.isactive = e
        if (e == 0) {
          this.Initialization_data_1()
        } else if (e == 1) {
          this.Initialization_data_2()
        }
      },
      /*part_1 修改*/
      edit(e, q) {
        if (e == 'M') {
          this.edit_value.m_value = q
          this.verify_value = q
          this.dialogVisible = true
        } else if (e == 'N') {
          this.edit_value.n_value = q
          this.verify_value_1 = q
          this.dialogVisible_1 = true
        } else {
        }
      },
      /*part_1 M值修改弹窗取消*/
      dialog_cancel() {
        this.dialogVisible = false
        this.verify_value = ''
      },
      /*part_1 M值修改弹窗确认*/
      dialog_sure() {
        let data = {"value": this.verify_value, "label": "M"}
        updateSetting(data).then(response => {
          this.dialogVisible = false
          this.verify_value = ''
          if (response.eCode == 200) {
            this.Initialization_data_1()
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '修改失败!'
            });
          }
        })
      },
      /*part_1 N值修改弹窗取消*/
      dialog_cancel_1() {
        this.dialogVisible_1 = false
        this.verify_value_1 = ''
      },
      /*part_1 N值修改弹窗确认*/
      dialog_sure_1() {
        let data = {"value": this.verify_value_1, "label": "N"}
        updateSetting(data).then(response => {
          this.dialogVisible_1 = false
          this.verify_value_1 = ''
          if (response.eCode == 200) {
            this.Initialization_data_1()
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '修改失败!'
            });
          }
        })
      },
      /*part_1 打开历史记录*/
      history_record(e) {
        if (e == 'M') {
          let data = {"label": "M"}
          getMNLog(data).then(response => {
            if (response.data == []) {
              this.gridData = []
            } else {
              this.gridData = response.data
            }
          })
          this.dialogTableVisible = true
        } else if (e == 'N') {
          let data = {"label": "N"}
          this.dialogTableVisible_1 = true
          getMNLog(data).then(response => {
            if (response.data == []) {
              this.gridData_1 = []
            } else {
              this.gridData_1 = response.data
            }
          })
        }
      },


      // getPersonInfo
      /*获取part_2 公共方法*/
      getdata_2(e) {
        getPersonInfoCreation(e).then(response => {
          if (response.data.dataList == []) {
            this.number_seting_1 = []
          } else {
            this.number_seting_1 = response.data.dataList
            this.totla = response.data.total
          }
        })
      },
      /*获取part_2 数据*/
      Initialization_data_2() {
        this.currentPage=1
        let data = {"status": "", "page": 1, "pageSize": 10}
        this.getdata_2(data)
      },
      /*part_2 分页获取数据*/
      currentPageChange(e) {
        this.currentPage = e
        let data = {"status": "", "page": this.currentPage, "pageSize": 10}
        this.getdata_2(data)
      },
      /*查看节点状态详情分页获取数据*/
      currentPageChange_1(e) {
        this.currentPage_1 = e
        let data = {"page": this.currentPage_1, "pagesize": 10, "address": this.hi_re_3 , "level": this.select_value_1.toString()}
        subordinateNodeAllCheck(data).then(response => {
          if (response.data.dataList == []) {
            this.tableData_3 = []
            this.totla_1 = 0
            this.nodeAllCheck_peoples = 0
            this.nodeAllCheck_tue = 0
          } else {
            this.nodeAllCheck_peoples =response.allp
            this.nodeAllCheck_tue =response.alln
            this.tableData_3 = response.data.dataList
            this.totla_1 = response.data.total
          }
        })
      },
      /*添加节点*/
      add_node() {
        this.form = {
          "address": '',
          "phone": '',
          "value": 0,
        }
        this.dialogFormVisible = true
      },
      /*添加节点取消*/
      dialogFormcancle() {
        this.form.address = ''
        this.form.phone = ''
        this.form.value = ''
        this.dialogFormVisible = false
      },
      /*添加节点确认*/
      dialogFormsure() {
        if(this.form.address==''){
          this.$message({
            type: 'error',
            message: '添加创世王者节点节点地址不能为空！'
          });
        }else if(this.form.phone=='') {
          this.$message({
            type: 'error',
            message: '添加创世王者节点节点绑定手机号不能为空'
          });
        }else {
          let data = {
            "name": "",
            "address": this.form.address,
            "phone": this.form.phone,
            "pledgeBalance": this.form.value.toString(),
            "batch": this.node_select
          }
          insertCreationPerson(data).then(response => {
            if (response.eCode == 200) {
              this.node_select=1
              this.form = {
                "address": '',
                "phone": '',
                "value": '',
              },
                this.$message({
                  type: 'success',
                  message: '节点添加成功'
                });
              this.Initialization_data_2()
              this.dialogFormVisible = false
            } else if(response.eCode == 10000){
              this.$message({
                type: 'error',
                message:response.eMsg
              });
            } else {
              this.$message({
                type: 'error',
                message: '节点添加失败'
              });
            }
          })
        }


      },
      // /*添加节点二次确认,取消操作*/
      // dialogtwo_cancel() {
      //   this.dialogtwo = false
      // },
      // /*添加节点二次确认,确认操作*/
      // dialogtwo_sure() {
      //   this.dialogtwo = false
      //   this.dialogFormVisible = false
      // },
      /*强制解绑*/
      untied(e) {
        this.untied_address=e
        this.dialogUntied = true
      },
      /*取消解绑*/
      dialogUntied_cancel() {
        this.dialogUntied = false
      },
      /*确认解绑*/
      dialogUntied_sure() {
        let data={"address":this.untied_address}
        unBindCreationAddress(data).then(response => {
          if (response.eCode == 200) {
            this.$message({
              type: 'success',
              message: '节点强制解绑成功'
            });
            this.Initialization_data_2()
            this.dialogUntied = false
          } else {
            this.$message({
              type: 'error',
              message: '节点强制解绑失败'
            });
            this.dialogUntied = false
          }
        })
      },
      /*修改节点*/
      edit_node(name, address, phone, batch, pledgeBalance) {
        this.form_1 = {
          "name": name,
          "address": address,
          "phone": phone,
          "pledgeBalance": pledgeBalance,
          "batch": batch,
        }
        this.dialogedit = true
      },
      /*取消修改节点*/
      dialogeditcancle() {
        this.dialogedit = false
      },
      /*确认修改节点*/
      dialogeditsure() {
        let data={"phone":this.form_1.phone,"pledgeBalance":this.form_1.pledgeBalance,"batch":this.form_1.batch.toString(),"address":this.form_1.address}
        updateCreationPerson(data).then(response => {
          if (response.eCode == 200) {
            this.node_select=1
            this.form_1 = {
              "name": '',
              "address": '',
              "phone": '',
              "pledgeBalance": '',
              "batch": '',
            }
              this.$message({
                type: 'success',
                message: '节点修改成功'
              });
            this.Initialization_data_2()
            this.dialogedit = false
          } else {
            this.$message({
              type: 'error',
              message: '节点添加失败'
            });
            this.node_select=1
            this.form_1 = {
              "name": '',
              "address": '',
              "phone": '',
              "pledgeBalance": '',
              "batch": '',
            }
            this.dialogedit = false
          }
        })
      },
      /*删除节点*/
      delete_node(e) {
        this.remove_address=e
        this.dialogdelete = true
      },
      /*取消删除节点*/
      dialogdelete_cancel() {
        this.dialogdelete = false
      },
      /*确认删除节点*/
      dialogdelete_sure() {
        let data={"address":this.remove_address}
        deleteCreationAddress(data).then(response => {
          if (response.eCode == 200) {
            this.$message({
              type: 'success',
              message: '节点删除成功'
            });
            this.Initialization_data_2()
            this.dialogdelete = false
          } else {
            this.$message({
              type: 'error',
              message: '节点删除失败'
            });
            this.dialogdelete = false
          }
        })

      },
      /*查看节点状态详情*/
      see_details(e, q) {
        let data = {"address": e}
        checkCreationDetails(data).then(response => {
          this.form_2 = response.data
          this.form_2.status = q
          this.dialogseedetail = true
        })
      },
      /*查看下属节点详情*/
      see_de_all(e) {
        this.currentPage_1 = 1
        this.hi_re_3 = e
        let data = {"page": 1, "pagesize": 10, "address": e, "level": ""}
        let data_1 ={"address":e}
        nodeLevel(data_1).then(response=>{
          this.select_value_1=''
          this.node_options_1= [
            {
              "typeid": '',
              "typename": "请选择节点级别"
            },
          ]
          this.node_options_1=this.node_options_1.concat(response)
          subordinateNodeAllCheck(data).then(response => {
            if (response.data.dataList == []) {
              this.tableData_3 = []
              this.totla_1 = 0
              this.nodeAllCheck_peoples = 0
              this.nodeAllCheck_tue = 0
            } else {
              this.nodeAllCheck_peoples =response.allp
              this.nodeAllCheck_tue =response.alln
              this.tableData_3 = response.data.dataList
              this.totla_1 = response.data.total
            }
          })
        })
        this.dialog_de_all = true
      },
      /*part_1 节点级别匹配*/
      node_level_matching(e){
        let a
        if(e==''||this.node_options_1==[]){
          a=e
        }else {
          this.node_options_1.forEach((item,index,self)=>{
            if(e==item.typeid){
              a=item.typename
            }
          })
        }
        return a
      },
      /*part_1 查看节点下属全部节点数量详情切换级别*/
      change_nodeLevel(){
        this.currentPage_1 = 1
        let data = {"page": 1, "pagesize": 10, "address": this.hi_re_3 , "level": this.select_value_1.toString()}
        subordinateNodeAllCheck(data).then(response => {
          if (response.data.dataList == []) {
            this.tableData_3 = []
            this.totla_1 = 0
            this.nodeAllCheck_peoples = 0
            this.nodeAllCheck_tue = 0
          } else {
            this.nodeAllCheck_peoples =response.allp
            this.nodeAllCheck_tue =response.alln
            this.tableData_3 = response.data.dataList
            this.totla_1 = response.data.total
          }
        })
      },
    },
    created() {
      // this.getdata_public()
      this.Initialization_data_1()
    }
  }
</script>

<style scoped>
  .ns_all {
    width: 100%;
  }

  .item_active {
    color: #800080;
    /*border-bottom: 2px solid #800080 ;*/
    /*padding-bottom: 5px;*/
  }

  .item_default {
    color: #000000;
  }

  .table_item {
    margin-bottom: 30px;
    font-size: 17px;
    user-select: none;
    cursor: pointer;
  }

  .index_table_swith {
    width: 20%;
    display: flex;
    justify-content: space-between;
  }

  .el-pagination {
    position: relative;
    float: right;
    margin-right: 3%;
    margin-top: 30px;
    margin-bottom: 50px;
  }

  .operating {
    cursor: pointer;
    color: #800080;
    padding: 0 5px;
    margin: 0 10px;
    font-size: 15px;
  }

  .operating_1 {
    cursor: pointer;
    float: right;
    position: relative;
    right: 5%;
    color: #800080;
    padding: 0 5px;
    /*margin: 0 10px;*/
  }
</style>
