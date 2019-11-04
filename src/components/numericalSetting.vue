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
    <!--历史记录M值-->
    <el-dialog class="his_dialog" width="30%" title="历史记录" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" :header-cell-style="this.tableHeaderColor">
        <el-table-column align="center" label="历史值">
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
    <!--数值设置修改-->
    <el-dialog width="40%" title="数值设置修改" :visible.sync="dialogTableVisible_1">
      <el-form :model="table_form">
        <el-form-item label="要求自身锁定量：" :label-width="formLabelWidth_2">
          <el-input v-model="table_form.pledge_coins" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="要求一级青铜及以上节点数：" :label-width="formLabelWidth_2">
          <el-input v-model="table_form.Level_one_count" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="要求全部青铜及以上节点数：" :label-width="formLabelWidth_2">
          <el-input v-model="table_form.Level_total_count" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="要求全部节点锁定金额：" :label-width="formLabelWidth_2">
          <el-input v-model="table_form.lever_total_pledge_coins" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="下属一级节点传导系数：" :label-width="formLabelWidth_2">
          <el-input v-model="table_form.mining_percentage" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Rx：" :label-width="formLabelWidth_2">
          <el-select v-model="Rx_select" placeholder="">
            <el-option
              v-for="item in Rx_options"
              :key="item.batch"
              :label="item.batchName"
              :value="item.batch">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="解锁周期：" :label-width="formLabelWidth_2">
          <el-input v-model="table_form.unlock_period_days" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否会降级：" :label-width="formLabelWidth_2">
          <el-input
            style="width: 70%;resize: none"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入内容"
            v-model="table_form.level_down_desc">
          </el-input>
        </el-form-item>
        <el-form-item label="是否会升级：" :label-width="formLabelWidth_2">
          <el-input
            style="width: 70%;resize: none"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入内容"
            v-model="table_form.level_up_desc">
          </el-input>
        </el-form-item>
        <el-form-item label="是否自动升级：" :label-width="formLabelWidth_2">
          <el-select v-model="auto_select" placeholder="">
            <el-option
              v-for="item in auto_options"
              :key="item.batch"
              :label="item.batchName"
              :value="item.batch">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="N值：" :label-width="formLabelWidth_2">
          <el-input v-model="table_form.param_n" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="M值：" :label-width="formLabelWidth_2">
          <el-input v-model="table_form.param_m" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="KN值：" :label-width="formLabelWidth_2">
          <el-input v-model="table_form.param_kn" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ON值：" :label-width="formLabelWidth_2">
          <el-input v-model="table_form.param_on" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogcancle_nusi()">取 消</el-button>
        <el-button type="primary" @click="dialogsure_nusi()">确 定</el-button>
      </div>
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
          <el-input maxlength="11" show-word-limit v-model="form.phone" style="width: 70%"
                    autocomplete="off"></el-input>
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
          <el-input maxlength="11" show-word-limit v-model="form_1.phone" style="width: 70%"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="质押金额：" :label-width="formLabelWidth">
          <el-input type="number" min="0" v-model="form_1.pledgeBalance" style="width: 70%"
                    autocomplete="off"></el-input>
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
          共 {{nodeAllCheck_peoples==''?0:nodeAllCheck_peoples}} 人，质押
          {{scientificCounting(nodeAllCheck_tue==''?0:nodeAllCheck_tue)}} TUE
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
                <span>{{scientificCounting(scope.row.nodeamount )}} TUE</span>
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
        <el-form-item label="节点绑定手机号：" :label-width="formLabelWidth_1">
          <span>{{form_2.phone}}</span>
        </el-form-item>
        <el-form-item label="节点质押金额：" :label-width="formLabelWidth_1">
          <span><span>{{scientificCounting(form_2.pledgeBalance)}}</span> TUE</span>
        </el-form-item>
        <el-form-item label="节点下属一级节点数量：" :label-width="formLabelWidth_1">
          <span><span>{{form_2.childrenLevelSecond}}</span></span>
        </el-form-item>
        <el-form-item label="节点下属全部节点数量：" :label-width="formLabelWidth_1">
          <span><span>{{form_2.childrenLevelsCount}}</span><span class="operating"
                                                                 @click="see_de_all(form_2.address)">查看详情</span></span>
        </el-form-item>
        <el-form-item label="节点下属全部节点质押数量：" :label-width="formLabelWidth_1">
          <span><span>{{scientificCounting(form_2.childrenPledgeBalance)}} TUE</span></span>
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
            label="级别"
            fixed
            width="150"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.node_name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="要求自身锁定量"
            width="150"
            align="center">
            <template slot-scope="scope">
              <span class="operating_2" @click="getNewLog(scope.row.node_identity,0)">{{scope.row.pledge_coins}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="要求一级青铜及以上节点数（不包含王者，创世王者，8折王者及其下属）"
            width="300"
            align="center">
            <template slot-scope="scope">
              <span class="operating_2"
                    @click="getNewLog(scope.row.node_identity,1)">{{scope.row.Level_one_count}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="要求全部青铜及以上节点数（不包含王者，创世王者，8折王者及其下属）"
            width="300"
            align="center">
            <template slot-scope="scope">
              <span class="operating_2"
                    @click="getNewLog(scope.row.node_identity,2)">{{scope.row.Level_total_count}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="要求全部节点锁定金额（不包含王者，创世王者，8折王者及其下属）"
            width="300"
            align="center">
            <template slot-scope="scope">
              <span class="operating_2" @click="getNewLog(scope.row.node_identity,3)">{{scope.row.lever_total_pledge_coins}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="下属一级节点传导系数"
            width="150"
            align="center">
            <template slot-scope="scope">
              <span class="operating_2"
                    @click="getNewLog(scope.row.node_identity,4)">{{scope.row.mining_percentage}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Rx"
            width="100"
            align="center">
            <template slot-scope="scope">
              <span class="operating_2"
                    @click="getNewLog(scope.row.node_identity,5)">{{scope.row.rx==0?'不存在':'存在'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="解锁周期"
            width="100"
            align="center">
            <template slot-scope="scope">
              <span class="operating_2"
                    @click="getNewLog(scope.row.node_identity,6)">{{scope.row.unlock_period_days}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="是否会降级"
            width="250"
            align="center">
            <template slot-scope="scope">
              <span class="operating_2"
                    @click="getNewLog(scope.row.node_identity,7)">{{scope.row.level_down_desc}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="是否会升级"
            width="250"
            align="center">
            <template slot-scope="scope">
              <span class="operating_2" @click="getNewLog(scope.row.node_identity,8)">{{scope.row.level_up_desc}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="升级是否自动"
            width="150"
            align="center">
            <template slot-scope="scope">
              <span class="operating_2" @click="getNewLog(scope.row.node_identity,9)">{{scope.row.auto_update==0?'审批':'自动'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="N值"
            width="100"
            align="center">
            <template slot-scope="scope">
              <span class="operating_2" @click="getNewLog(scope.row.node_identity,10)">{{scope.row.param_n}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="M值"
            width="100"
            align="center">
            <template slot-scope="scope">
              <span class="operating_2" @click="getNewLog(scope.row.node_identity,11)">{{scope.row.param_m}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="KN值"
            width="100"
            align="center">
            <template slot-scope="scope">
              <span class="operating_2" @click="getNewLog(scope.row.node_identity,12)">{{scope.row.param_kn}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="ON值"
            width="100"
            align="center">
            <template slot-scope="scope">
              <span class="operating_2" @click="getNewLog(scope.row.node_identity,13)">{{scope.row.param_on}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="200"
            align="center">
            <template slot-scope="scope">
              <span class="operating" @click="edit_all(scope.row)">修改</span>
              <!--<span class="operating"  @click="history_record(scope.row.label)">历史记录</span>-->
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
              <span>{{scientificCounting(scope.row.pledgeBalance)}} TUE</span>
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
    getNodeSettingNew,
    updateNodeSettingNew,
    getNodeSettingNewLog,
  } from '../api/interface'

  export default {
    name: "numericalSetting",
    data() {
      return {
        Rx_select: 0,
        Rx_options: [
          {
            batch: 0,
            batchName: "不存在",
          },
          {
            batch: 1,
            batchName: "存在",
          },
        ],
        auto_options: [
          {
            batch: 0,
            batchName: "审批",
          },
          {
            batch: 1,
            batchName: "自动",
          },
        ],
        auto_select: 0,
        table_form: {
          'pledge_coins': '',//升级成该级别要求节点自身锁定量
          'json:"Level_one_count': '',//升级成该级别要求一级非普通节点数量
          'json:"Level_total_count': '', //升级成该级别要要求全部非普通节点数量
          'lever_total_pledge_coins': '',//升级成该级别要要求全部非普通节点锁定量
          'rx': '',//Rx是否存在 0 不存在 1 存在
          'unlock_period_days': '',//解锁周期 （时间/天数）
          'mining_percentage': '',//传导系数 （时间/天数）
          'level_down_desc': '',//是否会降级
          'level_up_desc': '', //是否会升级
          'auto_update': '', //升级是否自动     0 不自动 1 自动
          'param_n': '',
          'param_m': '',
          'param_kn': '',
          'param_on': '',
        },
        getlog_name: [
          {'value': 'pledge_coins'},
          {'value': 'Level_one_count'},
          {'value': 'Level_total_count'},
          {'value': 'lever_total_pledge_coins'},
          {'value': 'mining_percentage'},
          {'value': 'rx'},
          {'value': 'unlock_period_days'},
          {'value': 'level_down_desc'},
          {'value': 'level_up_desc'},
          {'value': 'auto_update'},
          {'value': 'param_n'},
          {'value': 'param_m'},
          {'value': 'param_kn'},
          {'value': 'param_on'},
        ],
        dialogTableVisible_1: false,
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
        formLabelWidth_2: '220px',
        dialogVisible: false,
        verify_value: '',
        dialogTableVisible: false,
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
          "kn_value": 0,
          "on_value": 0,
        },
        untied_address: '',
        remove_address: '',
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
        getNodeSettingNew(e).then(response => {
          if (response.data == []) {
            this.number_seting = []
          } else {
            this.number_seting = response.data
          }
        })
      },
      /*获取part_1 数据*/
      Initialization_data_1() {
        this.getdata_1()
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
      /*part_1 点击修改*/
      edit_all(e) {
        this.table_form = {
          "Id": e.Id,
          "node_name": e.node_name,
          "node_identity": e.node_identity,
          "sequence": e.sequence,
          "mining_percentage": e.mining_percentage,
          'pledge_coins': e.pledge_coins,//升级成该级别要求节点自身锁定量
          'Level_one_count': e.Level_one_count,//升级成该级别要求一级非普通节点数量
          'Level_total_count': e.Level_total_count, //升级成该级别要要求全部非普通节点数量
          'lever_total_pledge_coins': e.lever_total_pledge_coins,//升级成该级别要要求全部非普通节点锁定量
          'rx': e.rx,//Rx是否存在 0 不存在 1 存在
          'unlock_period_days': e.unlock_period_days,//解锁周期 （时间/天数）
          'level_down_desc': e.level_down_desc,//是否会降级
          'level_up_desc': e.level_up_desc, //是否会升级
          'auto_update': e.auto_update, //升级是否自动     0 不自动 1 自动
          'param_n': e.param_n,
          'param_m': e.param_m,
          'param_kn': e.param_kn,
          'param_on': e.param_on,
        }
        this.Rx_select = e.rx
        this.auto_select = e.auto_update
        this.dialogTableVisible_1 = true
      },
      /*part_1 确定修改*/
      dialogsure_nusi() {
        this.table_form.rx = this.Rx_select
        this.table_form.auto_update = this.auto_select
        this.table_form.Level_one_count = Number(this.table_form.Level_one_count)
        this.table_form.Level_total_count = Number(this.table_form.Level_total_count)
        this.table_form.unlock_period_days = Number(this.table_form.unlock_period_days)
        updateNodeSettingNew(this.table_form).then(response => {
          if (response.eCode == 200) {
            this.Initialization_data_1()
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogcancle_nusi()
          } else {
            this.$message({
              message: '修改失败，请稍后重试！',
              type: 'error'
            });
            this.dialogcancle_nusi()
          }
        })
      },
      /*part_1 取消修改*/
      dialogcancle_nusi() {
        this.dialogTableVisible_1 = false
        this.table_form = {
          'pledge_coins': '',//升级成该级别要求节点自身锁定量
          'json:"Level_one_count': '',//升级成该级别要求一级非普通节点数量
          'json:"Level_total_count': '', //升级成该级别要要求全部非普通节点数量
          'lever_total_pledge_coins': '',//升级成该级别要要求全部非普通节点锁定量
          'rx': '',//Rx是否存在 0 不存在 1 存在
          'unlock_period_days': '',//解锁周期 （时间/天数）
          'level_down_desc': '',//是否会降级
          'level_up_desc': '', //是否会升级
          'auto_update': '', //升级是否自动     0 不自动 1 自动
          'param_n': '',
          'param_m': '',
          'param_kn': '',
          'param_on': '',
        }
      },
      /*part_1 修改log获取*/
      getNewLog(identity, index) {
        let data = {"node_identity": identity, "column_name": this.getlog_name[index].value}
        getNodeSettingNewLog(data).then(response => {
          this.dialogTableVisible = true
          if (response.eCode == 200) {
            if (index == 5) {
              response.data.forEach((item, index, self) => {
                if (item.value == 0) {
                  item.value = '不存在'
                } else {
                  item.value = '存在'
                }
              })
            } else if (index == 9) {
              response.data.forEach((item, index, self) => {
                if (item.value == 0) {
                  item.value = '审批'
                } else {
                  item.value = '自动'
                }
              })
            }
            this.gridData = response.data
          } else {
            this.gridData = []
          }
        })
      },
      /*==========================================*/
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
        this.currentPage = 1
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
        let data = {
          "page": this.currentPage_1,
          "pagesize": 10,
          "address": this.hi_re_3,
          "level": this.select_value_1.toString()
        }
        subordinateNodeAllCheck(data).then(response => {
          if (response.data.dataList == []) {
            this.tableData_3 = []
            this.totla_1 = 0
            this.nodeAllCheck_peoples = 0
            this.nodeAllCheck_tue = 0
          } else {
            this.nodeAllCheck_peoples = response.allp
            this.nodeAllCheck_tue = response.alln
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
        if (this.form.address == '') {
          this.$message({
            type: 'error',
            message: '添加创世王者节点节点地址不能为空！'
          });
        } else if (this.form.phone == '') {
          this.$message({
            type: 'error',
            message: '添加创世王者节点节点绑定手机号不能为空'
          });
        } else {
          let data = {
            "name": "",
            "address": this.form.address,
            "phone": this.form.phone,
            "pledgeBalance": this.form.value.toString(),
            "batch": this.node_select
          }
          insertCreationPerson(data).then(response => {
            if (response.eCode == 200) {
              this.node_select = 1
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
            } else if (response.eCode == 10000) {
              this.$message({
                type: 'error',
                message: response.eMsg
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
        this.untied_address = e
        this.dialogUntied = true
      },
      /*取消解绑*/
      dialogUntied_cancel() {
        this.dialogUntied = false
      },
      /*确认解绑*/
      dialogUntied_sure() {
        let data = {"address": this.untied_address}
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
        let data = {
          "phone": this.form_1.phone,
          "pledgeBalance": this.form_1.pledgeBalance,
          "batch": this.form_1.batch,
          "address": this.form_1.address
        }
        updateCreationPerson(data).then(response => {
          if (response.eCode == 200) {
            this.node_select = 1
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
            this.node_select = 1
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
        this.remove_address = e
        this.dialogdelete = true
      },
      /*取消删除节点*/
      dialogdelete_cancel() {
        this.dialogdelete = false
      },
      /*确认删除节点*/
      dialogdelete_sure() {
        let data = {"address": this.remove_address}
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
        let data_1 = {"address": e}
        nodeLevel(data_1).then(response => {
          this.select_value_1 = ''
          this.node_options_1 = [
            {
              "typeid": '',
              "typename": "请选择节点级别"
            },
          ]
          this.node_options_1 = this.node_options_1.concat(response)
          subordinateNodeAllCheck(data).then(response => {
            if (response.data.dataList == []) {
              this.tableData_3 = []
              this.totla_1 = 0
              this.nodeAllCheck_peoples = 0
              this.nodeAllCheck_tue = 0
            } else {
              this.nodeAllCheck_peoples = response.allp
              this.nodeAllCheck_tue = response.alln
              this.tableData_3 = response.data.dataList
              this.totla_1 = response.data.total
            }
          })
        })
        this.dialog_de_all = true
      },
      /*part_1 节点级别匹配*/
      node_level_matching(e) {
        let a
        if (e == '' || this.node_options_1 == []) {
          a = e
        } else {
          this.node_options_1.forEach((item, index, self) => {
            if (e == item.typeid) {
              a = item.typename
            }
          })
        }
        return a
      },
      /*part_1 查看节点下属全部节点数量详情切换级别*/
      change_nodeLevel() {
        this.currentPage_1 = 1
        let data = {"page": 1, "pagesize": 10, "address": this.hi_re_3, "level": this.select_value_1.toString()}
        subordinateNodeAllCheck(data).then(response => {
          if (response.data.dataList == []) {
            this.tableData_3 = []
            this.totla_1 = 0
            this.nodeAllCheck_peoples = 0
            this.nodeAllCheck_tue = 0
          } else {
            this.nodeAllCheck_peoples = response.allp
            this.nodeAllCheck_tue = response.alln
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
<style>
  .his_dialog .el-dialog__body {
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
    border-radius: 2em;
  }

  .his_dialog .el-dialog__body::-webkit-scrollbar-thumb {
    background-color: #cdcdcd;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
  }
</style>
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

  .operating_2 {
    cursor: pointer;
    color: #800080;
    user-select: none;
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
