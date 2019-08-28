<template>
  <div class="af_all">
    <div class="index_table_swith">
      <div class="table_item" @click="swich_tab(index)" v-for="(list, index) in table_items"
           :class="index== isactive ? item_active :'item_default'">{{list.name}}
      </div>
    </div>
    <!--part_1 查看详细-->
    <el-dialog width="35%" title="节点详情" :visible.sync="alert_1">
      <!--二级弹窗节点类型-->
      <el-dialog
        width="40%"
        title="历史记录"
        :visible.sync="alert_1_1"
        append-to-body>
        <div class="con_table" style="padding-bottom: 40px">
          <el-table
            :data="tableData_1"
            border
            style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
            :header-cell-style="this.tableHeaderColor"
          >
            <el-table-column
              label="时间"
              align="center">
              <template slot-scope="scope">
                <span>{{timestampToTime(scope.row.time)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="节点类型"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.address}}</span>
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
      <!--二级弹窗质押金额-->
      <el-dialog
        width="40%"
        title="质押金额"
        :visible.sync="alert_1_2"
        append-to-body>
        <div class="con_table" style="padding-bottom: 40px">
          <el-table
            :data="tableData_2"
            border
            style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
            :header-cell-style="this.tableHeaderColor"
          >
            <el-table-column
              label="时间"
              align="center">
              <template slot-scope="scope">
                <span>{{timestampToTime(scope.row.timestamp)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.in}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="金额"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.balance}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            @current-change="currentPageChange_1_1"
            :current-page="currentPage_1_1"
            :page-size="pagesize_1_1"
            layout="total,prev, pager, next"
            :total="totla_1_1"
            style="margin-top: 0;padding-bottom: 30px"
          >
          </el-pagination>
        </div>
      </el-dialog>
      <!--二级弹窗累计收益-->
      <el-dialog
        width="40%"
        title="累计收益"
        :visible.sync="alert_1_4"
        append-to-body>
        <div class="con_table" style="padding-bottom: 40px">
          <el-table
            :data="tableData_4"
            border
            style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
            :header-cell-style="this.tableHeaderColor"
          >
            <el-table-column
              label="时间"
              align="center">
              <template slot-scope="scope">
                <span>{{timestampToTime(scope.row.timestamp)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="收益"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.balance}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            @current-change="currentPageChange_1_2"
            :current-page="currentPage_1_2"
            :page-size="pagesize_1_2"
            layout="total,prev, pager, next"
            :total="totla_1_2"
            style="margin-top: 0;padding-bottom: 30px"
          >
          </el-pagination>
        </div>
      </el-dialog>
      <!--二级弹窗下属节点详情-->
      <el-dialog
        width="70%"
        title="节点下属全部节点详情"
        :visible.sync="alert_1_3"
        append-to-body>
        <div>
          共 {{nodeAllCheck_peoples==''?0:nodeAllCheck_peoples}} 人，质押 {{nodeAllCheck_tue==''?0:nodeAllCheck_tue}} TUE
        </div>
        <div>
          <el-select style="margin-top: 30px" v-model="select_value_1" @change="change_nodeLevel()" placeholder="请选择">
            <el-option
              v-for="item in node_options"
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
            @current-change="currentPageChange_1_3"
            :current-page="currentPage_1_3"
            :page-size="pagesize_1_3"
            layout="total,prev, pager, next"
            :total="totla_1_3"
            style="margin-top: 0;padding-bottom: 30px"
          >
          </el-pagination>
        </div>
      </el-dialog>
      <el-form>
        <el-form-item label="节点名称：" :label-width="formLabelWidth_1">
          <span>{{detailes.nodename}}</span>
        </el-form-item>
        <el-form-item label="节点类型：" :label-width="formLabelWidth_1">
          <span>{{detailes.nodetype}}<span class="operating"
                                           @click="see_de_all_1(detailes.nodeaddress)">历史记录</span></span>
        </el-form-item>
        <el-form-item label="节点地址：" :label-width="formLabelWidth_1">
          <span>{{detailes.nodeaddress}}</span>
        </el-form-item>
        <el-form-item label="节点绑定手机号：" :label-width="formLabelWidth_1">
          <span>{{detailes.bindphone}}</span>
        </el-form-item>
        <el-form-item label="节点质押金额：" :label-width="formLabelWidth_1">
          <span><span>{{detailes.currentpledgeamount}}</span> TUE <span class="operating"
                                                                        @click="see_de_all_2(detailes.nodeaddress)">查看详情</span></span>
        </el-form-item>
        <el-form-item label="节点分红比例：" :label-width="formLabelWidth_1">
          <span><span>{{detailes.nodedividendratio}}</span>  </span>
        </el-form-item>
        <el-form-item label="节点下属一级节点数量：" :label-width="formLabelWidth_1">
          <span><span>{{detailes.onenodenum}}</span></span>
        </el-form-item>
        <el-form-item label="节点下属全部节点数量：" :label-width="formLabelWidth_1">
          <span><span>{{detailes.allNodeNum}}</span>  <span class="operating"
                                                            @click="see_de_all_3(detailes.nodeaddress)">查看详情</span></span>
        </el-form-item>
        <el-form-item label="节点下属全部节点质押数量：" :label-width="formLabelWidth_1">
          <span><span>{{detailes.allnodepledgeamount}}</span> TUE  </span>
        </el-form-item>
        <el-form-item label="节点累计收益：" :label-width="formLabelWidth_1">
          <span><span>{{detailes.nodecumulativebenefits}}</span> TUE<span class="operating"
                                                                          @click="see_de_all_4(detailes.nodeaddress)">查看详情</span></span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--part_2 单个批准-->
    <el-dialog
      title=""
      :visible.sync="alert_1_5"
      width="30%"
    >
      <span>批准后，该节点：XXXXX将在下个周期升级为王者节点。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="promotion_cancel()">取 消</el-button>
    <el-button type="primary" @click="promotion_sure()">确 定</el-button>
       </span>
    </el-dialog>
    <!--part_2 全部批准-->
    <el-dialog
      title=""
      :visible.sync="alert_1_6"
      width="30%"
    >
      <span>点击确认会批准当前未审核的全部晋级申请，建议找清节点了解清楚后再进行该操作。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batch_approval_cancel()">取 消</el-button>
    <el-button type="primary" @click="batch_approval_sure()">确 定</el-button>
       </span>
    </el-dialog>
    <!--part_2 查看详细-->
    <el-dialog width="35%" title="节点详情" :visible.sync="alert_1_7">
      <!--二级弹窗下属节点详情-->
      <el-dialog
        width="70%"
        title="节点下属全部节点详情"
        :visible.sync="alert_1_8"
        append-to-body>
        <div>
          共 {{nodeAllCheck_peoples_1==''?0:nodeAllCheck_peoples_1}} 人，质押 {{nodeAllCheck_tue_1==''?0:nodeAllCheck_tue_1}} TUE
        </div>
        <div>
          <el-select style="margin-top: 30px" v-model="select_value_2" @change="change_nodeLevel_1()" placeholder="请选择">
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
            :data="tableData_6"
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
                <span>{{node_level_matching_1(scope.row.nodelevel)}}</span>
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
            @current-change="currentPageChange_6"
            :current-page="currentPage_6"
            :page-size="pagesize_6"
            layout="total,prev, pager, next"
            :total="totla_6"
            style="margin-top: 0;padding-bottom: 30px"
          >
          </el-pagination>
        </div>
      </el-dialog>
      <el-form>
        <el-form-item label="节点名称：" :label-width="formLabelWidth_1">
          <span>{{form_node_de.nodename}}</span>
        </el-form-item>
        <el-form-item label="节点状态：" :label-width="formLabelWidth_1">
          <span>{{form_node_de.njodesta}}</span>
        </el-form-item>
        <el-form-item label="节点地址：" :label-width="formLabelWidth_1">
          <span>{{form_node_de.nodeaddress}}</span>
        </el-form-item>
        <el-form-item label="节点绑定手机号：" :label-width="formLabelWidth_1">
          <span>{{form_node_de.bindphone}}</span>
        </el-form-item>
        <el-form-item label="节点质押金额：" :label-width="formLabelWidth_1">
          <span>{{form_node_de.currentpledgeamount}}</span>
        </el-form-item>
        <el-form-item label="节点下属一级节点数量：" :label-width="formLabelWidth_1">
          <span>{{form_node_de.onenodenum}}</span>
        </el-form-item>
        <el-form-item label="节点下属全部节点数量：" :label-width="formLabelWidth_1">
          <span>{{form_node_de.allNodeNum}}<span class="operating" @click="part_2_see_1(form_node_de.nodeaddress)">查看详情</span></span>
        </el-form-item>
        <el-form-item label="节点下属全部节点质押数量：" :label-width="formLabelWidth_1">
          <span>{{form_node_de.allnodepledgeamount}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--part_3 单个批准-->
    <el-dialog
      title=""
      :visible.sync="alert_1_9"
      width="30%"
    >
      <span>批准后，该节点资金将在周期结束返回至其账户，该用户下期将降级为青铜节点/退出节点大赛。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alert_1_9_cancel()">取 消</el-button>
    <el-button type="primary" @click="alert_1_9_sure()">确 定</el-button>
       </span>
    </el-dialog>
    <!--part_3 全部批准-->
    <el-dialog
      title=""
      :visible.sync="alert_1_10"
      width="30%"
    >
      <span>点击确认会批准当前未审核的全部解绑申请，建议找清节点了解清楚后再进行该操作。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alert_1_10_cancel()">取 消</el-button>
    <el-button type="primary" @click="alert_1_10_sure()">确 定</el-button>
       </span>
    </el-dialog>
    <!--节点信息-->
    <div class="part_1" v-show="part_show[0].isShow">
      <div class="con_search" style="width: 60%">
        <div class="con_search_div">
          <span class="el-icon-search us_search2_1_input_icon"></span>
          <div class="input_fath">
          <el-input  v-model="search_1"
                    placeholder="请输入绑定手机号/节点地址进行检索">
          </el-input>
          </div>
        </div>
        <el-button type="primary" class="con_search_submit" style="position: relative;left: -13%" @click="search_ad_ph_1()">搜索
        </el-button>
        <el-select style="left: -19.8%;position: relative" v-model="select_value" @change="change_user_source_1()"
                   placeholder="请选择节点类型">
          <el-option
            v-for="item in part2_options1"
            :key="item.typeid"
            :label="item.typename"
            :value="item.typeid">
          </el-option>
        </el-select>
      </div>
      <div class="con_table">
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            prop="rinking"
            label="排名"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.rinking}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="nodeaddress"
            label="节点地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.nodeaddress}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="bindphone"
            label="绑定手机号"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.bindphone}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="nodename"
            label="节点名称"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.nodename}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="nodetype"
            label="节点类型"
            align="center">
            <template slot-scope="scope">
              <span>{{node_level_matching_2(scope.row.nodetype)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="currentpledgeamount"
            label="当前质押金额"
            align="center"
            sortable
          >
            <template slot-scope="scope">
              <span>{{scope.row.currentpledgeamount}} <span> TUE</span></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="nodedividendratio"
            label="节点分红比例"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.nodedividendratio}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="nodecumulativebenefits"
            label="节点累计收益"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.nodecumulativebenefits==''?0:scope.row.nodecumulativebenefits}}<span> TUE</span></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="nodecurrentrevenue"
            label="节点当前收益"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.nodecurrentrevenue==''?0:scope.row.nodecurrentrevenue}} <span> WED/h</span></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="onenodenum"
            label="一级节点数量"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.onenodenum}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="allNodeNum"
            label="全部节点数量"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.allNodeNum}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="allnodepledgeamount"
            label="全部节点质押金额"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{scope.row.allnodepledgeamount==''?0:scope.row.allnodepledgeamount}} <span> TUE</span></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="currentwed"
            label="当前WED持有量"
            align="center"
            sortable>
            <template slot-scope="scope">
              <span>{{scope.row.currentwed}} <span> WED</span></span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <span class="operating" @click="seedetail(scope.row.nodeaddress)">查看</span>
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
    <!--晋级审核-->
    <div class="part_2" v-show="part_show[1].isShow">
      <el-button type="primary" @click="batch_approval()">
        全部批准
      </el-button>
      <div class="con_table">
        <el-table
          :data="tableData_5"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            prop="name"
            label="节点名称"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="节点地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="节点绑定手机号"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="节点状态"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.state==1?'符合':scope.row.state==0?'不符合':''}}</span>
              <span class="operating_1" @click="see_details(scope.row.address)">查看详情</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="操作"
            align="center">
            <template slot-scope="scope">
              <span class="operating" @click="approved_for_promotion(scope.row.address)">批准晋级</span>
            </template>
          </el-table-column>

        </el-table>
        <el-pagination
          background
          @current-change="currentPageChange_5"
          :current-page="currentPage_5"
          :page-size="pagesize_5"
          layout="total,prev, pager, next"
          :total="totla_5">
        </el-pagination>
      </div>
    </div>
    <!--解绑审核-->
    <div class="part_3" v-show="part_show[2].isShow">
      <div class="con_search" style="width: 60%">
        <div class="con_search_div">
          <span class="el-icon-search us_search2_1_input_icon"></span>
          <div class="input_fath">
          <el-input  v-model="search_2"
                    placeholder="请输入绑定手机号/节点地址进行检索">
          </el-input>
          </div>
        </div>
        <el-button type="primary" class="con_search_submit" style="    position: relative;left: -50.2%;"
                   @click="search_ad_ph_2()">搜索
        </el-button>
      </div>
      <el-button type="primary" style="float: right;position: relative;top: -40px" @click="part3_approve()">全部批准
      </el-button>
      <div class="con_table">
        <el-table
          :data="tableData_7"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            prop="name"
            label="节点地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.nodeaddress}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="绑定手机号"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.bindphone}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="节点名称"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.nodename}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="value"
            label="当前质押金额"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{scope.row.currentpledgeamount}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="节点累计收益"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.nodeCumulativebenefits}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="节点当前收益"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.nodeCurrentrevenue}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="一级节点数量"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.oneNodenum}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="全部节点数量"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.allNodeNum}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="全部节点质押金额"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{scope.row.allnodepledgeamount}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="number"
            label="申请解绑金额"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{scope.row.applyBindingAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="number"
            label="解绑后级别"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{scope.row.bingdingLevel}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="操作"
            align="center">
            <template slot-scope="scope">
              <span class="operating" @click="part_3_untied(scope.row.nodeaddress)">批准解绑</span>
            </template>
          </el-table-column>

        </el-table>
        <el-pagination
          background
          @current-change="currentPageChange_7"
          :current-page="currentPage_7"
          :page-size="pagesize_7"
          layout="total,prev, pager, next"
          :total="totla_7">
        </el-pagination>
      </div>
    </div>
    <!--交易记录-->
    <div class="part_4" v-show="part_show[3].isShow">
      <div class="con_search" style="width: 60%">
        <div class="con_search_div">
          <span class="el-icon-search us_search2_1_input_icon"></span>
          <div class="input_fath">
          <el-input  v-model="search_3"
                    placeholder="请输入绑定手机号/节点地址进行检索">
          </el-input>
          </div>
        </div>
        <el-button type="primary" class="con_search_submit" style="position: relative;left: -0.7%" @click="search_ad_ph_3()">搜索
        </el-button>
        <el-select style="left: 5%" v-model="select_value_3" @change="change_user_source_2()" placeholder="请选择节点类型">
          <el-option
            v-for="item in part2_options1"
            :key="item.typeid"
            :label="item.typename"
            :value="item.typeid">
          </el-option>
        </el-select>
        <el-select style="left: 10%" v-model="select_value_4" @change="change_tr_type()" placeholder="请选择交易类型">
          <el-option
            v-for="item in part4_options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="margin-top: 30px">
        <span>总质押额：</span>
        <span>{{all_mo}}  </span> TUE
      </div>
      <div class="con_table">
        <el-table
          :data="tableData_8"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            label="交易时间"
            align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.transactiontime)}}</span>
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
            label="绑定手机号"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="节点级别"
            align="center">
            <template slot-scope="scope">
              <span>{{node_level_matching_2(scope.row.nodelevel)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="交易类别"
            align="center">
            <template slot-scope="scope">
              <span>{{tr_macth(scope.row.in)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="交易金额"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{scope.row.transactionAmount}}</span>
            </template>
          </el-table-column>

        </el-table>
        <el-pagination
          background
          @current-change="currentPageChange_8"
          :current-page="currentPage_8"
          :page-size="pagesize_8"
          layout="total,prev, pager, next"
          :total="totla_8">
        </el-pagination>
      </div>
    </div>
    <!--权益池金额记录-->
    <div class="part_4" v-show="part_show[4].isShow">
      <div class="con_table">
        <el-table
          :data="tableData_9"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            label="记录时间"
            align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.time)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="权益池金额"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.tvp}} TUE</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="currentPageChange_9"
          :current-page="currentPage_9"
          :page-size="pagesize_9"
          layout="total,prev, pager, next"
          :total="totla_9">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    nodeInfo,
    nodeType,
    odeInfoCheck,
    equitypool,
    promotionAudit,
    promotionAuditExe,
    allPromotionAuditExe,
    nodeTypeRecord,
    subordinateNodeAllCheck,
    nodePledgeAmount,
    nodeLevel,
    nodeprofitCheck,
    promotionAuditCheck,
    unbindingAudit,
    approvalbind,
    allApprovalbind,
    transactionRecordScreen,
  } from '../api/interface'

  export default {
    name: "accountInformation",
    data() {
      return {
        part2_options1: [
          {
            "typeid": "",
            "typename": "请选择节点类型"
          }],
        node_options: [
          {
            "typeid": '',
            "typename": "请选择节点级别"
          }
        ],
        node_options_1: [
          {
            "typeid": '',
            "typename": "请选择节点级别"
          }
        ],
        part4_options1: [
          {
            'label': '请选择交易类型',
            'value': '',
          },
          {
            'label': '质押',
            'value': true,
          },
          {
            'label': '赎回',
            'value': false,
          },
        ],
        select_value: '',
        select_value_1: '',
        select_value_2: '',
        select_value_3: '',
        select_value_4: '',
        alert_1_1: false,
        alert_1_2: false,
        alert_1_3: false,
        alert_1_4: false,
        alert_1_5: false,
        alert_1_6: false,
        alert_1_7: false,
        alert_1_8: false,
        alert_1_9: false,
        alert_1_10: false,
        formLabelWidth_1: '200px',
        alert_1: false,
        search_1: '',
        search_2: "",
        search_3: "",
        isactive: 0,
        table_items: [
          {"name": ' 节点信息 '},
          {"name": ' 晋级审核 '},
          {"name": ' 解绑审核 '},
          {"name": ' 交易记录 '},
          {"name": ' 权益池金额记录 '},
        ],
        part_show: [
          {"isShow": true},
          {"isShow": false},
          {"isShow": false},
          {"isShow": false},
          {"isShow": false},
        ],
        is_show: [
          {"is_true": true},
          {"is_true": false},
          {"is_true": false},
          {"is_true": false},
          {"is_true": false},
        ],
        item_active: 'item_active',
        item_default: 'item_default',
        tableData: [],
        tableData_1: [],
        tableData_2: [],
        tableData_3: [],
        tableData_4: [],
        tableData_5: [],
        tableData_6: [],
        tableData_7: [],
        tableData_8: [],
        tableData_9: [],
        currentPage: 1,
        pagesize: 10,
        totla: 0,
        currentPage_1: 1,
        pagesize_1: 10,
        totla_1: 0,
        currentPage_2: 1,
        pagesize_2: 10,
        totla_2: 0,
        currentPage_3: 1,
        pagesize_3: 10,
        totla_3: 0,
        currentPage_4: 1,
        pagesize_4: 10,
        totla_4: 0,
        currentPage_5: 1,
        pagesize_5: 10,
        totla_5: 0,
        currentPage_6: 1,
        pagesize_6: 10,
        totla_6: 0,
        currentPage_7: 1,
        pagesize_7: 10,
        totla_7: 0,
        currentPage_8: 1,
        pagesize_8: 10,
        totla_8: 0,
        currentPage_9: 1,
        pagesize_9: 10,
        totla_9: 0,
        currentPage_1_1: 1,
        pagesize_1_1: 10,
        totla_1_1: 0,
        currentPage_1_2: 1,
        pagesize_1_2: 10,
        totla_1_2: 0,
        currentPage_1_3: 1,
        pagesize_1_3: 10,
        totla_1_3: 0,
        part_1_recording: '',
        detailes: {
          "bindphone": "",
          "nodeaddress": "",
          "nodename": "",
          "nodetype": "",
          "currentpledgeamount": "",
          "nodedividendratio": "",
          "nodecumulativebenefits": "",
          "onenodenum": "",
          "allNodeNum": "",
          "allnodepledgeamount": ""
        },
        promotionAuditExe: '',
        hi_re: '',
        hi_re_2: '',
        hi_re_3: '',
        hi_re_4: '',
        hi_re_5: '',
        nodeAllCheck_peoples: 0,
        nodeAllCheck_tue: 0,
        nodeAllCheck_peoples_1: 0,
        nodeAllCheck_tue_1: 0,
        nodelevels: [],
        form_node_de: {
          "bindphone": "",
          "nodeaddress": "",
          "nodename": "",
          "njodesta": "",
          "currentpledgeamount": "",
          "onenodenum": "",
          "allNodeNum": "",
          "allnodepledgeamount": ""
        },
        part_3_phone:'',
        part_4_phone:'',
        all_mo:0,
      }
    },
    methods: {
      /*获取所有公共资源例如节点类型*/
      get_public() {
        let data = {}
        nodeType(data).then(response => {
          this.part2_options1 = this.part2_options1.concat(response)
        })
      },
      /*part_1 获取数据公共接口*/
      get_data_1(e, q) {
        nodeInfo(e).then(response => {
          if (response.dataList == []) {
            this.tableData = []
            this.totla = 0
          } else {
            // // currentpledgeamount
            // response.data.dataList.forEach((item,index,self)=>{
            //   item.currentpledgeamount=Number(item.currentpledgeamount)
            //   item.currentwed=Number(item.currentwed)
            // })
            this.tableData = response.dataList
            this.totla = response.total
            if (q == 1) {
              this.part_1_recording = this.search_1
            }
          }
        })
      },
      /*part_1 初始化*/
      Initialization_data_1() {
        this.currentPage = 1
        let data = {"phone": "", "address": "", "type": "", "page": 1, "pageSize": 10}
        this.get_data_1(data, 0)
      },
      /*table切换*/
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
        else if (e == 2) {
          this.Initialization_data_3()
        }
        else if (e == 3) {
          this.Initialization_data_4()
        }
        else if (e == 4) {
          this.Initialization_data_5()
        }

      },
      /*part_1 查询*/
      search_ad_ph_1() {
        this.currentPage=1
        this.select_value = ''
        if (this.search_1.length == 11) {
          let data = {"phone": this.search_1, "address": "", "type": "", "page": 1, "pageSize": 10}
          this.get_data_1(data, 1)
        } else {
          let data = {"phone": "", "address": this.search_1, "type": "", "page": 1, "pageSize": 10}
          this.get_data_1(data, 1)
        }
      },
      /*part_1 改变节点类型*/
      change_user_source_1() {
        let data
        if (this.part_1_recording.length == 11) {
          data = {"phone": this.part_1_recording, "address": "", "type": this.select_value, "page": 1, "pageSize": 10}
        } else {
          data = {"phone": "", "address": this.part_1_recording, "type": this.select_value, "page": 1, "pageSize": 10}
        }
        this.get_data_1(data, 0)
      },
      /*part_1 分页查询*/
      currentPageChange(e) {
        this.currentPage = e
        let data
        if (this.part_1_recording.length == 11) {
          data = {
            "phone": this.part_1_recording,
            "address": "",
            "type": this.select_value,
            "page": this.currentPage,
            "pageSize": 10
          }
        } else {
          data = {
            "phone": "",
            "address": this.part_1_recording,
            "type": this.select_value,
            "page": this.currentPage,
            "pageSize": 10
          }
        }
        this.get_data_1(data, 0)
      },
      /*part_1 弹窗历史记录分页查询*/
      currentPageChange_1(e) {
        this.currentPage_1 = e
        let data = {"page": this.currentPage_1, "pagesize": 10, "Address": this.hi_re}
        nodeTypeRecord(data).then(response => {
          if (response.data.dataList == []) {
            this.tableData_1 = []
            this.totla_1 = 0
          } else {
            this.tableData_1 = response.data.dataList
            this.totla_1 = response.data.total
          }
        })
      },
      /*part_1 弹窗质押金额分页查询*/
      currentPageChange_1_1(e) {
        this.currentPage_1_1 = e
        let data = {"page": this.currentPage_1_1, "pagesize": 10, "Addr": this.hi_re_2}
        nodePledgeAmount(data).then(response => {
          if (response.data.dataList == []) {
            this.tableData_2 = []
            this.totla_1_1 = 0
          } else {
            this.tableData_2 = response.data.dataList
            this.totla_1_1 = response.data.total
          }
        })
      },
      /*part_1 弹窗累计收益分页查询*/
      currentPageChange_1_2(e) {
        this.currentPage_1_2 = e
        let data = {"page": this.currentPage_1_2, "pagesize": 10, "address": this.hi_re_4}
        nodeprofitCheck(data).then(response => {
          if (response.data.dataList == []) {
            this.tableData_4 = []
            this.totla_1_2 = 0
          } else {
            this.tableData_4 = response.data.dataList
            this.totla_1_2 = response.data.total
          }
        })
        this.alert_1_4 = true
      },
      /*part_1 弹窗下属节点详情分页查询*/
      currentPageChange_1_3(e) {
        this.currentPage_1_3 = e
        let data = {
          "page": this.currentPage_1_3,
          "pagesize": 10,
          "address": this.hi_re_3,
          "level": this.select_value_1.toString()
        }
        subordinateNodeAllCheck(data).then(response => {
          if (response.data.dataList == []) {
            this.tableData_3 = []
            this.totla_1_3 = 0
            this.nodeAllCheck_peoples = 0
            this.nodeAllCheck_tue = 0
          } else {
            this.nodeAllCheck_peoples = response.allp
            this.nodeAllCheck_tue = response.alln
            this.tableData_3 = response.data.dataList
            this.totla_1_3 = response.data.total
          }
        })
      },
      /*part_1 查看*/
      seedetail(e) {
        let data = {"address": e, "page": 1, "pageSize": 10, "phone": '', "type": ''}
        nodeInfo(data).then(response => {
          if (response.dataList == []) {
            this.detailes = {
              "bindphone": "",
              "nodeaddress": "",
              "nodename": "",
              "nodetype": "",
              "currentpledgeamount": "",
              "nodedividendratio": "",
              "nodecumulativebenefits": "",
              "onenodenum": "",
              "allNodeNum": "",
              "allnodepledgeamount": ""
            }

          } else {
            this.detailes = response.dataList[0]
          }
          this.alert_1 = true
        })

      },
      /*part_1 查看节点类型历史纪录详情*/
      see_de_all_1(e) {
        this.currentPage_1 = 1
        this.hi_re = e
        let data = {"page": 1, "pagesize": 10, "Address": e}
        nodeTypeRecord(data).then(response => {
          if (response.data.dataList == []) {
            this.tableData_1 = []
            this.totla_1 = 0
          } else {
            this.tableData_1 = response.data.dataList
            this.totla_1 = response.data.total
          }
        })
        this.alert_1_1 = true
      },
      /*part_1 查看节点质押金额详情*/
      see_de_all_2(e) {
        this.currentPage_1_1 = 1
        this.hi_re_2 = e
        let data = {"page": 1, "pagesize": 10, "Addr": e}
        nodePledgeAmount(data).then(response => {
          if (response.data.dataList == []) {
            this.tableData_2 = []
            this.totla_1_1 = 0
          } else {
            this.tableData_2 = response.data.dataList
            this.totla_1_1 = response.data.total
          }
        })
        this.alert_1_2 = true
      },
      /*part_1 查看节点下属全部节点数量详情*/
      see_de_all_3(e) {
        this.currentPage_1_3 = 1
        this.hi_re_3 = e
        let data = {"page": 1, "pagesize": 10, "address": e, "level": ""}
        let data_1 = {"address": e}
        nodeLevel(data_1).then(response => {
          this.select_value_1=''
          this.node_options= [
            {
              "typeid": '',
              "typename": "请选择节点级别"
            }
          ]
          this.node_options = this.node_options.concat(response)
          subordinateNodeAllCheck(data).then(response => {
            if (response.data.dataList == []) {
              this.tableData_3 = []
              this.totla_1_3 = 0
              this.nodeAllCheck_peoples = 0
              this.nodeAllCheck_tue = 0
            } else {
              this.nodeAllCheck_peoples = response.allp
              this.nodeAllCheck_tue = response.alln
              this.tableData_3 = response.data.dataList
              this.totla_1_3 = response.data.total
            }
          })
        })
        this.alert_1_3 = true
      },
      /*part_1 查看节点下属全部节点数量详情切换级别*/
      change_nodeLevel() {
        this.currentPage_1_3 = 1
        let data = {"page": 1, "pagesize": 10, "address": this.hi_re_3, "level": this.select_value_1.toString()}
        subordinateNodeAllCheck(data).then(response => {
          if (response.data.dataList == []) {
            this.tableData_3 = []
            this.totla_1_3 = 0
            this.nodeAllCheck_peoples = 0
            this.nodeAllCheck_tue = 0
          } else {
            this.nodeAllCheck_peoples = response.allp
            this.nodeAllCheck_tue = response.alln
            this.tableData_3 = response.data.dataList
            this.totla_1_3 = response.data.total
          }
        })
      },
      /*part_1 查看节点累计收益详情*/
      see_de_all_4(e) {
        this.hi_re_4 = e
        this.currentPage_1_2 = 1
        let data = {"page": 1, "pagesize": 10, "address": e}
        nodeprofitCheck(data).then(response => {
          if (response.data.dataList == []) {
            this.tableData_4 = []
            this.totla_1_2 = 0
          } else {
            this.tableData_4 = response.data.dataList
            this.totla_1_2 = response.data.total
          }
        })
        this.alert_1_4 = true
      },
      /*part_1 节点级别匹配*/
      node_level_matching(e) {
        let a
        if (e == '' || this.node_options == []) {
          a = e
        } else {
          this.node_options.forEach((item, index, self) => {
            if (e == item.typeid) {
              a = item.typename
            }
          })
        }
        return a
      },
      /*===============================================*/
      /*part_2 获取数据公共接口*/
      get_data_2(e) {
        promotionAudit(e).then(response => {
          if (response.data.dataList == []) {
            this.tableData_5 = []
            this.totla_5 = 0
          } else {
            this.tableData_5 = response.data.dataList
            this.totla_5 = response.data.total
          }
        })
      },
      /*part_2 初始化*/
      Initialization_data_2() {
        this.currentPage_5 = 1
        let data = {"page": 1, "pageSize": 10}
        this.get_data_2(data)
      },
      /*part_2 晋级审核分页*/
      currentPageChange_5(e) {
        this.currentPage_5 = e
        let data = {"page": this.currentPage_5, "pageSize": 10}
        this.get_data_2(data)
      },
      /*part_2 单独批准晋级*/
      approved_for_promotion(e) {
        this.promotionAuditExe = e
        this.alert_1_5 = true
      },
      /*part_2 取消单独批准晋级*/
      promotion_cancel() {
        this.alert_1_5 = false
      },
      /*part_2 确认单独批准晋级*/
      promotion_sure() {
        let data = {"address": this.promotionAuditExe}
        promotionAuditExe(data).then(response => {
          if (response.eCode == 200) {
            this.Initialization_data_2()
            this.$message({
              message: '批准晋级已提交！',
              type: 'success'
            });
          } else {
            this.$message({
              message: '批准晋级提交失败！',
              type: 'error'
            });
          }
          this.alert_1_5 = false
        })

      },
      /*part_2 批量批准晋级*/
      batch_approval() {
        this.alert_1_6 = true
      },
      /*part_2 取消批量批准晋级*/
      batch_approval_cancel() {
        this.alert_1_6 = false
      },
      /*part_2 确认批量批准晋级*/
      batch_approval_sure() {
        allPromotionAuditExe().then(response => {
          if (response.eCode == 200) {
            this.Initialization_data_2()
            this.$message({
              message: '批量批准晋级已提交！',
              type: 'success'
            });
          } else {
            this.$message({
              message: '批量批准晋级提交失败！',
              type: 'error'
            });
          }
          this.alert_1_6 = false
        })

      },
      /*part_2 节点状态查看详情*/
      see_details(e) {
        let data = {"address": e}
        promotionAuditCheck(data).then(response => {
          if (response.dataList == []) {
            this.form_node_de = {
              "bindphone": "",
              "nodeaddress": "",
              "nodename": "",
              "njodesta": "",
              "currentpledgeamount": "",
              "onenodenum": "",
              "allNodeNum": "",
              "allnodepledgeamount": ""
            }
          } else {
            this.form_node_de=response.dataList[0]
          }
        })
        this.alert_1_7 = true
      },
      /*part_2 节点详细*/
      part_2_see_1(e) {
        this.currentPage_6= 1
        this.hi_re_5 = e
        let data = {"page": 1, "pagesize": 10, "address": e, "level": ""}
        let data_1 = {"address": e}
        nodeLevel(data_1).then(response => {
          this.select_value_2=''
          this.node_options_1=  [
            {
              "typeid": '',
              "typename": "请选择节点级别"
            }
          ]
          this.node_options_1 = this.node_options_1.concat(response)
          subordinateNodeAllCheck(data).then(response => {
            if (response.data.dataList == []) {
              this.tableData_6 = []
              this.totla_6= 0
              this.nodeAllCheck_peoples_1 = 0
              this.nodeAllCheck_tue_1 = 0
            } else {
              this.nodeAllCheck_peoples_1 = response.allp
              this.nodeAllCheck_tue_1 = response.alln
              this.tableData_6 = response.data.dataList
              this.totla_6 = response.data.total
            }
          })
        })
        this.alert_1_8 = true
      },
      /*part_2 节点二级弹窗分页*/
      currentPageChange_6(e) {
        this.currentPage_6= e
        let data = {"page":  this.currentPage_6, "pagesize": 10, "address": this.hi_re_5, "level": this.select_value_2.toString()}
        subordinateNodeAllCheck(data).then(response => {
          if (response.data.dataList == []) {
            this.tableData_6 = []
            this.totla_6= 0
            this.nodeAllCheck_peoples_1 = 0
            this.nodeAllCheck_tue_1 = 0
          } else {
            this.nodeAllCheck_peoples_1 = response.allp
            this.nodeAllCheck_tue_1 = response.alln
            this.tableData_6 = response.data.dataList
            this.totla_6 = response.data.total
          }
        })
      },
      /*part_2 节点级别切换*/
      change_nodeLevel_1(){
        this.currentPage_6= 1
        let data = {"page": 1, "pagesize": 10, "address": this.hi_re_5, "level": this.select_value_2.toString()}
        subordinateNodeAllCheck(data).then(response => {
          if (response.data.dataList == []) {
            this.tableData_6 = []
            this.totla_6= 0
            this.nodeAllCheck_peoples_1 = 0
            this.nodeAllCheck_tue_1 = 0
          } else {
            this.nodeAllCheck_peoples_1 = response.allp
            this.nodeAllCheck_tue_1 = response.alln
            this.tableData_6 = response.data.dataList
            this.totla_6 = response.data.total
          }
        })
      },
      /*part_2 节点级别匹配*/
      node_level_matching_1(e) {
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
      node_level_matching_2(e) {
        let a
        if (e == '' || this.part2_options1 == []) {
          a = e
        } else {
          this.part2_options1.forEach((item, index, self) => {
            if (e == item.typeid) {
              a = item.typename
            }
          })
        }
        return a
      },
      /*==================================================*/
      /*part_3 初始化数据*/
      get_data_3(e,q){
        // let data={"page":1,"pagesize":10,"address":"","phone":""}
        unbindingAudit(e).then(response=>{
          if(response.data.dataList==[]){
              this.tableData_7=[]
              this.totla_7=0
          }else {
            this.tableData_7=response.data.dataList
            this.totla_7=response.data.total
            if(q==1){
              this.part_3_phone=''
            }
          }
        })
      },
      /*part_3 获取初始化数据*/
      Initialization_data_3() {
        this.currentPage_7 = 1
        let data={"page":1,"pagesize":10,"address":"","phone":""}
        this.get_data_3(data, 0)
      },
      /*part_3分页查询*/
      currentPageChange_7(e) {
        this.currentPage_7 = e
        let data
        if(this.part_3_phone.length==11){
          data={"page":this.currentPage_7,"pagesize":10,"address":"","phone":this.search_2}
        }else {
          data={"page":this.currentPage_7,"pagesize":10,"address":this.search_2,"phone":""}
        }
        this.get_data_3(data, 0)
      },
      /*part_3 查询*/
      search_ad_ph_2() {
        console.log('22')
        this.currentPage_7 = 1
        let data
        if(this.search_2.length==11){
          data={"page":1,"pagesize":10,"address":"","phone":this.search_2}
        }else {
          data={"page":1,"pagesize":10,"address":this.search_2,"phone":""}
        }

        this.get_data_3(data, 1)
      },
      /*part_3 单个批准*/
      part_3_untied() {
        this.alert_1_9 = true
      },
      /*part_3 取消单个批准*/
      alert_1_9_cancel() {
        this.alert_1_9 = false
      },
      /*part_3 确认单个批准*/
      alert_1_9_sure(e) {
        let data={"address":e}
        approvalbind(data).then(response=>{
          if(response.eCode==200){
            this.Initialization_data_3()
            this.$message({
              message: '已提交批准解绑！',
              type: 'success'
            });
          }else {

            this.$message({
              message: '提交批准解绑失败！',
              type: 'error'
            });
          }
        })
        this.alert_1_9 = false
      },
      /*part_3 全部批准*/
      part3_approve() {
        this.alert_1_10 = true
      },
      /*part_3 取消全部批准*/
      alert_1_10_cancel() {
        this.alert_1_10 = false
      },
      /*part_3 确认全部批准*/
      alert_1_10_sure() {
        allApprovalbind().then(response=>{
          if(response.eCode==200){
            this.Initialization_data_3()
            this.$message({
              message: '已提交全部批准解绑！',
              type: 'success'
            });
          }else {
            this.$message({
              message: '提交全部批准解绑失败！',
              type: 'error'
            });
          }
        })
        this.alert_1_10 = false
      },
      /*==================================================*/
      // transactionRecordScreen
      // /*级别匹配*/
      // level_matching(e){
      //
      // },
      /*part_4 初始化数据*/
      get_data_4(e,q){
        transactionRecordScreen(e).then(response=>{
          if(response.dataList==[]){
            this.tableData_8=[]
            this.totla_8=0
            this.all_mo=0
          }else {
            this.tableData_8=response.dataList
            this.totla_8=response.total
            this.all_mo=response.allNodePledgeAmount
            if(q==1){
              this.part_4_phone=''
            }
          }
        })
      },
      /*part_4 获取初始化数据*/
      Initialization_data_4() {
        this.currentPage_8 = 1
        let data={"page":1,"pagesize":10,"address":"","phone":"","type":"","in":""}
        this.get_data_4(data, 0)
      },
      /*part_4分页查询*/
      currentPageChange_8(e) {
        this.currentPage_8 = e
        let data
        if(this.search_3.length==11){
          data={"page":this.currentPage_8,"pagesize":10,"address":"","phone":this.search_3,"type":this.select_value_3,"in":this.select_value_4.toString()}
        }else {
          data={"page":this.currentPage_8,"pagesize":10,"address":this.search_3,"phone":"","type":this.select_value_3,"in":this.select_value_4.toString()}
        }
        this.get_data_4(data, 0)
      },
      /*part_4 查询*/
      search_ad_ph_3() {
        this.select_value_3=''
        this.select_value_4=''
        this.currentPage_8 = 1
        let data
        if(this.search_3.length==11){
         data={"page":1,"pagesize":10,"address":"","phone":this.search_3,"type":"","in":""}
        }else {
          data={"page":1,"pagesize":10,"address":this.search_3,"phone":"","type":"","in":""}
        }
        this.get_data_4(data, 1)
      },
      /*part_4 改变用户来源*/
      change_user_source_2() {
        this.currentPage_8 = 1
        let data
        if(this.search_3.length==11){
          data={"page":1,"pagesize":10,"address":"","phone":this.search_3,"type":this.select_value_3,"in":this.select_value_4.toString()}
        }else {
          data={"page":1,"pagesize":10,"address":this.search_3,"phone":"","type":this.select_value_3,"in":this.select_value_4.toString()}
        }
        this.get_data_4(data, 0)
      },
      /*part_4 改变交易类型*/
      change_tr_type() {
        this.currentPage_8 = 1
        let data
        if(this.search_3.length==11){
          data={"page":1,"pagesize":10,"address":"","phone":this.search_3,"type":this.select_value_3,"in":this.select_value_4.toString()}
        }else {
          data={"page":1,"pagesize":10,"address":this.search_3,"phone":"","type":this.select_value_3,"in":this.select_value_4.toString()}
        }
        this.get_data_4(data, 0)
      },
      /*交易类别*/
      tr_macth(e){
        let a
        if(e==true){
          a='质押'
        }else {
          a='赎回'
        }
        return a
      },
      /*==================================================*/
      /*part_5 获取数据公共接口*/
      get_data_5(e) {
        equitypool(e).then(response => {
          console.log(response)
          if (response.datalist == []) {
            this.tableData_9 = []
            this.totla_9 = 0
          } else {
            this.tableData_9 = response.datalist
            this.totla_9 = response.total
          }
        })
      },
      /*part_5 初始化*/
      Initialization_data_5() {
        this.currentPage_9 = 1
        let data = {"page": 1, "pageSize": 10}
        this.get_data_5(data)
      },
      /*part_5分页查询*/
      currentPageChange_9(e) {
        this.currentPage_9 = e
        let data = {"page": this.currentPage_9, "pageSize": 10}
        this.get_data_5(data)
      },
    },
    created() {
      this.Initialization_data_1()
      this.get_public()
    }

  }
</script>
<style>
  .af_all .con_search_div input {
    outline: none;
    border: none;
  }
</style>
<style scoped>
  .af_all {
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
    width: 40%;
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

  .con_search {
    position: relative;
    width: 70%;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }
  .con_search_div {
    display: flex;
    width:35%;
    background-color: #ffffff;
  }

  .us_search2_1_input_icon {
    position: relative;
    left: 26px;
    margin-top: 12px;
    z-index: 1;
  }

  .con_search_submit {
    margin-left: 5%;
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
    right: 20%;
    color: #800080;
    padding: 0 5px;
    /*margin: 0 10px;*/
  }
  .input_fath {
    width: 80%;
    position: relative;
    left: 30px;
  }
</style>
