<template>
  <div class="af_all">
    <div class="index_table_swith">
      <div class="table_item" @click="swich_tab(index)" v-for="(list, index) in table_items"
           :class="index== isactive ? item_active :'item_default'">{{list.name}}
      </div>
    </div>
    <el-dialog width="35%" title="节点详情" :visible.sync="alert_1">
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
                <span>{{timestampToTime(scope.row.timestamp)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="节点类型"
              align="center">
              <template slot-scope="scope">
                <span>{{node_level_matching_2(scope.row.identity)}}</span>
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
                <span>{{scope.row.balance==''?0:scope.row.balance}} TUE</span>
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
                <span>{{scientificCounting(scope.row.balance==''?0:scope.row.balance)}} TUE</span>
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
      <el-dialog
        width="70%"
        title="节点下属全部节点详情"
        :visible.sync="alert_1_3"
        append-to-body>
        <div>
          共 {{nodeAllCheck_peoples==''?0:nodeAllCheck_peoples}} 人，质押
          {{scientificCounting(nodeAllCheck_tue==''?0:nodeAllCheck_tue)}} TUE
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
                <span>{{scientificCounting(scope.row.nodeamount==''?0:scope.row.nodeamount)}} TUE</span>
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
          <span>{{node_level_matching_2(detailes.nodetype)}}<span class="operating"
                                                                  @click="see_de_all_1(detailes.nodeaddress)">历史记录</span></span>
        </el-form-item>
        <el-form-item label="节点地址：" :label-width="formLabelWidth_1">
          <span>{{detailes.nodeaddress}}</span>
        </el-form-item>
        <el-form-item label="节点绑定手机号：" :label-width="formLabelWidth_1">
          <span>{{detailes.bindphone}}</span>
        </el-form-item>
        <el-form-item label="节点质押金额：" :label-width="formLabelWidth_1">
          <span><span>{{scientificCounting(detailes.currentpledgeamount==''?0:detailes.currentpledgeamount)}}</span> TUE <span
            class="operating"
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
          <span><span>{{scientificCounting(detailes.allnodepledgeamount==''?0:detailes.allnodepledgeamount)}}</span> TUE  </span>
        </el-form-item>
        <el-form-item label="节点累计收益：" :label-width="formLabelWidth_1">
          <span><span>{{scientificCounting(detailes.nodecumulativebenefits==''?0:detailes.nodecumulativebenefits)}}</span> TUE<span
            class="operating"
            @click="see_de_all_4(detailes.nodeaddress)">查看详情</span></span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog class="his_dialog" width="25%" title="累计收益" :visible.sync="dialogTableVisible">
      <el-table :data="tableData_10" :header-cell-style="this.tableHeaderColor">
        <el-table-column align="center" label="收益">
          <template slot-scope="scope">
            <span>{{scientificCounting(scope.row.value)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="时间">
          <template slot-scope="scope">
            <span>{{timestampToTime(scope.row.timestamp)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
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
    <el-dialog width="35%" title="节点详情" :visible.sync="alert_1_7">
      <el-dialog
        width="70%"
        title="节点下属全部节点详情"
        :visible.sync="alert_1_8"
        append-to-body>
        <div>
          共 {{nodeAllCheck_peoples_1==''?0:nodeAllCheck_peoples_1}} 人，质押
          {{scientificCounting(nodeAllCheck_tue_1==''?0:nodeAllCheck_tue_1)}} TUE
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
                <span>{{scientificCounting(scope.row.nodeamount)}}</span>
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
          <span>{{scientificCounting(Number(form_node_de.currentpledgeamount))}}</span>
        </el-form-item>
        <el-form-item label="节点下属一级节点数量：" :label-width="formLabelWidth_1">
          <span>{{form_node_de.onenodenum}}</span>
        </el-form-item>
        <el-form-item label="节点下属全部节点数量：" :label-width="formLabelWidth_1">
          <span>{{form_node_de.allNodeNum}}<span class="operating"
                                                 @click="part_2_see_1(form_node_de.nodeaddress)">查看详情</span></span>
        </el-form-item>
        <el-form-item label="节点下属全部节点质押数量：" :label-width="formLabelWidth_1">
          <span>{{scientificCounting(form_node_de.allnodepledgeamount)}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
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
    <el-dialog
      :title="details_name"
      :visible.sync="historical_details"
      width="40%"
    >
      <div class="block">
        <el-date-picker
          value-format="timestamp"
          v-model="picker_value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="chooseTimeRange"
          format="yyyy-MM-dd"
        >
        </el-date-picker>
        <div class="con_table">
          <el-table
            :data="data_record_4"
            border
            style="width: 100%;margin-bottom: 30px;margin-top: 40px;"
            :header-cell-style="this.tableHeaderColor">
            <el-table-column
              label="时间"
              align="center">
              <template slot-scope="scope">
                <span v-show="!is_show_mi">{{timestampToTime(scope.row.timestamp)}}</span>
                <span v-show="is_show_mi">{{timestampToTime_1(scope.row.timestamp)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="数值"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>

          </el-table>
          <el-pagination
            background
            @current-change="change_currentPage_record_1"
            :current-page="currentPage_record_1"
            :page-size="pagesize_record_1"
            layout="total,prev, pager, next"
            :total="totla_record_1">
          </el-pagination>
        </div>
      </div>

    </el-dialog>
    <el-dialog width="40%" title="数值设置修改" :visible.sync="dialogTableVisible_1">
      <el-form :model="table_form">
        <el-form-item label="节点地址：" :label-width="formLabelWidth_2">
          <span>{{table_form.address}}</span>
        </el-form-item>
        <el-form-item label="绑定手机号：" :label-width="formLabelWidth_2">
          <span>{{table_form.phone}}</span>
        </el-form-item>
        <el-form-item label="修改节点名称：" :label-width="formLabelWidth_2">
          <el-select v-model="no_ty_select" placeholder="">
            <el-option
              v-for="item in no_ty_selects"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改身份：" :label-width="formLabelWidth_2">
          <el-select v-model="nodety_select" placeholder="">
            <el-option
              v-for="item in nodety_selects"
              :key="item.typeid"
              :label="item.typename"
              :value="item.typeid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改新身份：" :label-width="formLabelWidth_2">
          <el-select v-model="nodety_select_1" placeholder="">
            <el-option
              v-for="item in nodety_selects"
              :key="item.typeid"
              :label="item.typename"
              :value="item.typeid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改质押金额：" :label-width="formLabelWidth_2">
          <el-input v-model="table_form.pledgeBalance" style="width: 55%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="接收验证码手机号：" :label-width="formLabelWidth_2">
          <el-input v-model="table_form.user_phone" style="width: 55%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="短信验证：" :label-width="formLabelWidth_2">
          <el-input v-model="table_form.code" style="width: 30%" autocomplete="off"></el-input>
          <el-button @click="get_code()" type="primary" size="small" style="margin-left: 13%">获取</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogcancle_nusi()">取 消</el-button>
        <el-button type="primary" @click="dialogsure_nusi()">确 定</el-button>
      </div>
    </el-dialog>


    <div class="part_1" v-show="part_show[0].isShow">
      <div class="con_search" style="width: 60%">
        <div class="con_search_div">
          <span class="el-icon-search us_search2_1_input_icon"></span>
          <div class="input_fath">
            <el-input v-model="search_1"
                      placeholder="请输入绑定手机号/节点地址进行检索">
            </el-input>
          </div>
        </div>
        <el-button type="primary" class="con_search_submit" style="position: relative;left: 0%"
                   @click="search_ad_ph_1()">搜索
        </el-button>
        <el-select style="left: 5%;position: relative" v-model="select_value" @change="change_user_source_1()"
                   placeholder="请选择节点类型">
          <el-option
            v-for="item in part2_options1"
            :key="item.typeid"
            :label="item.typename"
            :value="item.typeid">
          </el-option>
        </el-select>
        <el-select style="left: 10%;position: relative" v-model="sorting" @change="change_order()"
                   placeholder="请选择节点类型">
          <el-option
            v-for="item in order_options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="con_table">
        <el-table
          :data="tableData"
          v-loading="loading"
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
          >
            <template slot-scope="scope">
              <span>{{scientificCounting(scope.row.currentpledgeamount==''?0:scope.row.currentpledgeamount)}} <span> TUE</span></span>
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
            align="center"
          >
            <template slot-scope="scope">
              <span class="operating_2" @click="tue_income_his(scope.row.nodeaddress,0)">{{scientificCounting(scope.row.nodecumulativebenefits==''?0:scope.row.nodecumulativebenefits)}}<span> USDT</span></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="nodecurrentrevenue"
            label="节点当前收益"
            align="center">
            <template slot-scope="scope">
              <span>{{scientificCounting(scope.row.nodecurrentrevenue==''?0:scope.row.nodecurrentrevenue)}} <span> WED/h</span></span>
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
              <span>{{scientificCounting(scope.row.allnodepledgeamount==''?0:scope.row.allnodepledgeamount)}} <span> TUE</span></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="currentwed"
            label="节点累计收益（TUE）"
            align="center">
            <template slot-scope="scope">
              <span class="operating_2" @click="tue_income_his(scope.row.nodeaddress,1)">{{scientificCounting(scope.row.accumulatedincometue)}} </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="currentwed"
            label="符合王者解锁"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.whether==0?'否':'是'}} </span>
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

    <div class="part_3" v-show="part_show[2].isShow">
      <div class="con_search" style="width: 60%">
        <div class="con_search_div">
          <span class="el-icon-search us_search2_1_input_icon"></span>
          <div class="input_fath">
            <el-input v-model="search_2"
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
              <span>{{scientificCounting(scope.row.currentpledgeamount==''?0:scope.row.currentpledgeamount)}} TUE</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="节点累计收益"
            align="center">
            <template slot-scope="scope">
              <span>{{scientificCounting(scope.row.nodeCumulativebenefits==''?0:scope.row.nodeCumulativebenefits)}} TUE</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="节点当前收益"
            align="center">
            <template slot-scope="scope">
              <span>{{scientificCounting(scope.row.nodeCurrentrevenue==''?0:scope.row.nodeCurrentrevenue)}} WED/h</span>
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
              <span>{{scientificCounting(scope.row.allnodepledgeamount==''?0:scope.row.allnodepledgeamount)}} TUE</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="number"
            label="申请解绑金额"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{scientificCounting(scope.row.applyBindingAmount==''?0:scope.row.applyBindingAmount)}} TUE</span>
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

    <div class="part_4" v-show="part_show[3].isShow">
      <div class="con_search" style="width: 60%">
        <div class="con_search_div">
          <span class="el-icon-search us_search2_1_input_icon"></span>
          <div class="input_fath">
            <el-input v-model="search_3"
                      placeholder="请输入绑定手机号/节点地址进行检索">
            </el-input>
          </div>
        </div>
        <el-button type="primary" class="con_search_submit" style="position: relative;left: -13%"
                   @click="search_ad_ph_3()">搜索
        </el-button>
        <!--<el-select style="left: 5%" v-model="select_value_3" @change="change_user_source_2()" placeholder="请选择节点类型">-->
        <!--<el-option-->
        <!--v-for="item in part2_options1"-->
        <!--:key="item.typeid"-->
        <!--:label="item.typename"-->
        <!--:value="item.typeid">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <el-select style="left: -20%" v-model="select_value_4" @change="change_tr_type()" placeholder="请选择交易类型">
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
        <span>{{scientificCounting(all_mo==''?0:all_mo)}}  </span> TUE
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
              <span>{{scope.row.transactionaddress}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="绑定手机号"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column-->
          <!--label="节点级别"-->
          <!--align="center">-->
          <!--<template slot-scope="scope">-->
          <!--<span>{{node_level_matching_2(scope.row.nodelevel)}}</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
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
              <span>{{scientificCounting(scope.row.transactionAmount==''?0:scope.row.transactionAmount)}} TUE</span>
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
    <div>
      <!--<div class="con_table">-->
      <!--<el-table-->
      <!--:data="tableData_9"-->
      <!--border-->
      <!--style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"-->
      <!--:header-cell-style="this.tableHeaderColor"-->
      <!--&gt;-->
      <!--<el-table-column-->
      <!--label="记录时间"-->
      <!--align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{timestampToTime(scope.row.time)}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--label="权益池金额"-->
      <!--align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{scientificCounting(scope.row.tvp)}} USDT</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--</el-table>-->
      <!--<el-pagination-->
      <!--background-->
      <!--@current-change="currentPageChange_9"-->
      <!--:current-page="currentPage_9"-->
      <!--:page-size="pagesize_9"-->
      <!--layout="total,prev, pager, next"-->
      <!--:total="totla_9">-->
      <!--</el-pagination>-->
      <!--</div>-->
    </div>
    <div class="part_4" v-show="part_show[4].isShow">
      <div class="part_4_time">
        时间：{{timestampToTime(time_hi_1)}}
      </div>
      <div class="con_table">
        <el-table
          :data="data_record_1"
          border
          style="width: 40%;margin-bottom: 30px;margin-top: 40px;"
          :header-cell-style="this.tableHeaderColor">
          <el-table-column
            label="当日充值量"
            align="center">
            <template slot-scope="scope">
              <span class="select_active" @click="get_historical_details(0,0,99)">{{scope.row.acceptRecord}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="当日提现量"
            align="center">
            <template slot-scope="scope">
              <span class="select_active" @click="get_historical_details(0,1,99)">{{scope.row.redeemRecord}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="累计充值量"
            align="center">
            <template slot-scope="scope">
              <span class="select_active" @click="get_historical_details(0,2,99)">{{scope.row.acceptRecordSum}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="累计提现量"
            align="center">
            <template slot-scope="scope">
              <span class="select_active" @click="get_historical_details(0,3,99)">{{scope.row.redeemRecordSum}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="part_4_time">
        结算时间：{{timestampToTime(time_hi_2)}}
      </div>
      <div class="con_table">
        <el-table
          :data="data_record_2"
          border
          style="width: 60%;margin-bottom: 30px;margin-top: 40px;"
          :header-cell-style="this.tableHeaderColor">
          <el-table-column
            label="当前币价"
            align="center">
            <template slot-scope="scope">
              <span class="select_active" @click="get_historical_details(1,0,99)">$ {{scope.row.price}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="结算币价"
            align="center">
            <template slot-scope="scope">
              <span class="select_active"
                    @click="get_historical_details(1,1,99)">$ {{scope.row.settlementPrice}} USDT</span>
            </template>
          </el-table-column>
          <el-table-column
            label="UV"
            align="center">
            <template slot-scope="scope">
              <span class="select_active" @click="get_historical_details(1,2,99)">{{scientificCounting(scope.row.uv)}} USDT</span>
            </template>
          </el-table-column>
          <el-table-column
            label="PVT"
            align="center">
            <template slot-scope="scope">
              <span class="select_active" @click="get_historical_details(1,3,99)">{{scientificCounting(scope.row.tvp)}} USDT</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="con_table">
        <el-table
          :data="data_record_3"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;"
          :header-cell-style="this.tableHeaderColor">
          <el-table-column
            label=""
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.identity_name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="数量"
            align="center">
            <template slot-scope="scope">
              <span class="select_active"
                    @click="get_historical_details(2,0,scope.row.identity)">{{scope.row.num}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="质押总额（TUE）"
            align="center">
            <template slot-scope="scope">
              <span class="select_active" @click="get_historical_details(2,1,scope.row.identity)">{{scientificCounting(scope.row.totalamountpledge)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="上期WED数量"
            align="center">
            <template slot-scope="scope">
              <span class="select_active"
                    @click="get_historical_details(2,2,scope.row.identity)">{{scientificCounting(scope.row.lastwednum)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="N值"
            align="center">
            <template slot-scope="scope">
              <span class="select_active"
                    @click="get_historical_details(2,3,scope.row.identity)">{{scope.row.nvalue}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="当期派息USDT数量"
            align="center">
            <template slot-scope="scope">
              <span
                class="select_active" @click="get_historical_details(2,4,scope.row.identity)">{{scientificCounting(scope.row.usdtnum)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="当期TUE结算数量"
            align="center">
            <template slot-scope="scope">
              <span
                class="select_active" @click="get_historical_details(2,5,scope.row.identity)">{{scientificCounting(scope.row.curtue)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="总计USDT"
            align="center">
            <template slot-scope="scope">
              <span
                class="select_active" @click="get_historical_details(2,6,scope.row.identity)">{{scientificCounting(scope.row.totalusdt)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="总计TUE"
            align="center">
            <template slot-scope="scope">
              <span
                class="select_active" @click="get_historical_details(2,7,scope.row.identity)">{{scientificCounting(scope.row.totaltue)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="part_5" v-show="part_show[5].isShow">
      <div class="part_5_title">
        请正确输入需要进行相关修改的用户手机号！
      </div>
      <el-input style="width: 20%" v-model="search_phone_use" placeholder="请正确输入手机号">
      </el-input>
      <el-button style="margin-left: 30px" type="primary" @click="sea_userinfo()">搜索</el-button>
      <div class="con_table">
        <el-table
          :data="tableData_11"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 380px"
          :header-cell-style="this.tableHeaderColor"
        >
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
            label="节点名称"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="身份"
            align="center">
            <template slot-scope="scope">
              <span>{{node_level_matching_2(scope.row.identity)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="新身份"
            align="center">
            <template slot-scope="scope">
              <span>{{node_level_matching_2(scope.row.newidentity)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="质押金额"
            align="center">
            <template slot-scope="scope">
              <span>{{scientificCounting(scope.row.pledgeBalance)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <span class="select_active"
                    @click="edit_user_info(scope.row.Id,scope.row.address,scope.row.phone,scope.row.identity,scope.row.newidentity,scope.row.name,scope.row.pledgeBalance)">修改</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    nodeInfo,
    nodeType,
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
    getAcceptAndRedeemLogNew,
    getAcceptAndRedeemLog,
    nodeReport,
    getEarningsLog,
    getNowSettlement,
    getnodeusdthistory,
    getnodetuehistory,
    getNickNameInfo,
    updateNodeInfo,
    getphonecodeinvalid,
    getPersonDetails,
    getphonecode,
  } from '../api/interface'

  export default {
    name: "accountInformation",
    data() {
      return {

        search_phone_use: '',
        loading: false,
        is_show_mi: false,
        dialogTableVisible: false,
        time_hi_1: '',
        time_hi_2: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        picker_value1: '',
        details_name: "",
        historical_details: false,
        data_record_1: [],
        data_record_2: [],
        data_record_3: [],
        data_record_4: [],
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
        order_options: [
          {
            'label': '倒序',
            'value': '-1',
          },
          {
            'label': '正序',
            'value': '1',
          },
        ],
        sorting: '-1', /*倒序-1正序1*/
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
          {"name": ' 用户信息修改 '},
        ],
        part_show: [
          {"isShow": true},
          {"isShow": false},
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
        tableData_10: [],
        tableData_11: [],
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
        currentPage_record_1: 1,
        pagesize_record_1: 10,
        totla_record_1: 0,
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
        approvalbind_value: '',
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
        part_3_phone: '',
        part_4_phone: '',
        all_mo: 0,
        hist_list: [
          {"name": '当日充值量', "value": 'acceptRecord'},
          {"name": '当日提现量', "value": 'redeemRecord'},
          {"name": '累计充值量', "value": 'acceptRecordSum'},
          {"name": '累计提现量', "value": 'redeemRecordSum'},
        ],
        hist_list_2: [
          {"name": '当前币价', "value": 'price'},
          {"name": '结算币价', "value": 'settlementPrice'},
          {"name": 'UV', "value": 'uv'},
          {"name": 'PVT', "value": 'tvp'},
        ],
        hist_list_3: [
          {"name": '数量 ', "value": 'num'},
          {"name": '质押金额 ', "value": 'pledgebalance'},
          {"name": '上期WED数量', "value": 'wed'},
          {"name": 'N值', "value": 'n'},
          {"name": '当期派息USDT数量 ', "value": 'usdt'},
          {"name": '当期TUE结算数量', "value": 'balance'},
          {"name": '总计USDT', "value": 'totalusdt'},
          {"name": '总计TUE', "value": 'totaltue'},
        ],
        record_field_1: '',
        identity_value: 0,
        record_list: {
          "table": 0,
          "value": 0,
          "type": 0,
        },
        pick_data: null,
        no_ty_select: 0,
        no_ty_selects: [],
        nodety_select: '',
        nodety_select_1: '',
        nodety_selects: [],
        formLabelWidth_2: '220px',
        table_form: {
          'address': '',
          'phone': '',
          'identity': '',
          'name': '',
          'pledgeBalance': '',
          'user_phone': '',
          'newidentity': '',
          'code': '',
          'id': '',
        },
        dialogTableVisible_1: false,
        old_ident: ''
      }
    },
    methods: {
      get_public() {
        let data = {}
        nodeType(data).then(response => {
          this.part2_options1 = this.part2_options1.concat(response)
        })
      },
      get_data_1(e, q) {
        this.loading = true
        nodeInfo(e).then(response => {
          this.loading = false
          if (response.dataList == []) {
            this.tableData = []
            this.totla = 0
          } else {
            response.dataList.forEach((item, index, self) => {
              item.currentpledgeamount = Number(item.currentpledgeamount)
              item.nodecumulativebenefits = Number(item.nodecumulativebenefits)
              item.currentwed = Number(item.currentwed)
            })
            this.tableData = response.dataList
            this.totla = response.total
            if (q == 1) {
              this.part_1_recording = this.search_1
            }
          }
        })
      },
      Initialization_data_1() {
        this.search_1 = ''
        this.sorting = '-1'
        this.currentPage = 1
        this.select_value = ''
        let data = {"phone": "", "address": "", "type": "", "page": 1, "pagesize": 10, "sorting": '-1'}
        this.get_data_1(data, 0)
      },
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
        } else if (e == 2) {
          this.Initialization_data_3()
        } else if (e == 3) {
          this.Initialization_data_4()
        } else if (e == 4) {
          this.Initialization_data_5()
        }

      },
      search_ad_ph_1() {
        this.currentPage = 1
        this.sorting = '-1'
        this.select_value = ''
        if (this.search_1.length == 11) {
          let data = {
            "phone": this.search_1,
            "address": "",
            "type": "",
            "page": 1,
            "pagesize": 10,
            "sorting": this.sorting
          }
          this.get_data_1(data, 1)
        } else {
          let data = {
            "phone": "",
            "address": this.search_1,
            "type": "",
            "page": 1,
            "pagesize": 10,
            "sorting": this.sorting
          }
          this.get_data_1(data, 1)
        }
      },
      change_order() {
        let data

        this.currentPage = 1
        if (this.part_1_recording.length == 11) {
          data = {
            "phone": this.part_1_recording,
            "address": "",
            "type": this.select_value,
            "page": 1,
            "pagesize": 10,
            "sorting": this.sorting
          }
        } else {
          data = {
            "phone": "",
            "address": this.part_1_recording,
            "type": this.select_value,
            "page": 1,
            "pagesize": 10,
            "sorting": this.sorting
          }
        }
        this.get_data_1(data, 0)
      },
      change_user_source_1() {
        let data
        this.currentPage = 1
        if (this.part_1_recording.length == 11) {
          data = {
            "phone": this.part_1_recording,
            "address": "",
            "type": this.select_value,
            "page": 1,
            "pagesize": 10,
            "sorting": this.sorting
          }
        } else {
          data = {
            "phone": "",
            "address": this.part_1_recording,
            "type": this.select_value,
            "page": 1,
            "pagesize": 10,
            "sorting": this.sorting
          }
        }
        this.get_data_1(data, 0)
      },
      currentPageChange(e) {
        this.currentPage = e
        let data
        if (this.part_1_recording.length == 11) {
          data = {
            "phone": this.part_1_recording,
            "address": "",
            "type": this.select_value,
            "page": this.currentPage,
            "pagesize": 10,
            "sorting": this.sorting
          }
        } else {
          data = {
            "phone": "",
            "address": this.part_1_recording,
            "type": this.select_value,
            "page": this.currentPage,
            "pagesize": 10,
            "sorting": this.sorting

          }
        }
        this.get_data_1(data, 0)
      },
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
      see_de_all_3(e) {
        this.currentPage_1_3 = 1
        this.hi_re_3 = e
        let data = {"page": 1, "pagesize": 10, "address": e, "level": ""}
        let data_1 = {"address": e}
        nodeLevel(data_1).then(response => {
          this.select_value_1 = ''
          this.node_options = [
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
      tue_income_his(address, type) {
        if (type == 0) {
          let data = {"address": address}
          getnodeusdthistory(data).then(response => {
            this.dialogTableVisible = true
            if (response.eCode == 200) {
              this.tableData_10 = response.data.dataList
            } else {
              this.tableData_10 = []
            }
          })
        } else {
          let data = {"address": address}
          getnodetuehistory(data).then(response => {
            this.dialogTableVisible = true
            if (response.eCode == 200) {
              this.tableData_10 = response.data.dataList
            } else {
              this.tableData_10 = []
            }
          })
        }

      },
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
      Initialization_data_2() {
        this.currentPage_5 = 1
        let data = {"page": 1, "pageSize": 10}
        this.get_data_2(data)
      },
      currentPageChange_5(e) {
        this.currentPage_5 = e
        let data = {"page": this.currentPage_5, "pageSize": 10}
        this.get_data_2(data)
      },
      approved_for_promotion(e) {
        this.promotionAuditExe = e
        this.alert_1_5 = true
      },
      promotion_cancel() {
        this.alert_1_5 = false
      },
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
      batch_approval() {
        this.alert_1_6 = true
      },
      batch_approval_cancel() {
        this.alert_1_6 = false
      },
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
            this.form_node_de = response.dataList[0]
          }
        })
        this.alert_1_7 = true
      },
      part_2_see_1(e) {
        this.currentPage_6 = 1
        this.hi_re_5 = e
        let data = {"page": 1, "pagesize": 10, "address": e, "level": ""}
        let data_1 = {"address": e}
        nodeLevel(data_1).then(response => {
          this.select_value_2 = ''
          this.node_options_1 = [
            {
              "typeid": '',
              "typename": "请选择节点级别"
            }
          ]
          this.node_options_1 = this.node_options_1.concat(response)
          subordinateNodeAllCheck(data).then(response => {
            if (response.data.dataList == []) {
              this.tableData_6 = []
              this.totla_6 = 0
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
      currentPageChange_6(e) {
        this.currentPage_6 = e
        let data = {
          "page": this.currentPage_6,
          "pagesize": 10,
          "address": this.hi_re_5,
          "level": this.select_value_2.toString()
        }
        subordinateNodeAllCheck(data).then(response => {
          if (response.data.dataList == []) {
            this.tableData_6 = []
            this.totla_6 = 0
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
      change_nodeLevel_1() {
        this.currentPage_6 = 1
        let data = {"page": 1, "pagesize": 10, "address": this.hi_re_5, "level": this.select_value_2.toString()}
        subordinateNodeAllCheck(data).then(response => {
          if (response.data.dataList == []) {
            this.tableData_6 = []
            this.totla_6 = 0
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
      get_data_3(e, q) {
        // let data={"page":1,"pagesize":10,"address":"","phone":""}
        unbindingAudit(e).then(response => {
          if (response.data.dataList == []) {
            this.tableData_7 = []
            this.totla_7 = 0
          } else {
            this.tableData_7 = response.data.dataList
            this.totla_7 = response.data.total
            if (q == 1) {
              this.part_3_phone = ''
            }
          }
        })
      },
      Initialization_data_3() {
        this.currentPage_7 = 1
        let data = {"page": 1, "pagesize": 10, "address": "", "phone": ""}
        this.get_data_3(data, 0)
      },
      currentPageChange_7(e) {
        this.currentPage_7 = e
        let data
        if (this.part_3_phone.length == 11) {
          data = {"page": this.currentPage_7, "pagesize": 10, "address": "", "phone": this.search_2}
        } else {
          data = {"page": this.currentPage_7, "pagesize": 10, "address": this.search_2, "phone": ""}
        }
        this.get_data_3(data, 0)
      },
      search_ad_ph_2() {
        this.currentPage_7 = 1
        let data
        if (this.search_2.length == 11) {
          data = {"page": 1, "pagesize": 10, "address": "", "phone": this.search_2}
        } else {
          data = {"page": 1, "pagesize": 10, "address": this.search_2, "phone": ""}
        }

        this.get_data_3(data, 1)
      },
      part_3_untied(e) {
        this.approvalbind_value = e
        this.alert_1_9 = true
      },
      alert_1_9_cancel() {
        this.approvalbind_value = ''
        this.alert_1_9 = false
      },
      alert_1_9_sure() {
        let data = {"address": this.approvalbind_value}
        approvalbind(data).then(response => {
          if (response.eCode == 200) {
            this.Initialization_data_3()
            this.$message({
              message: '已提交批准解绑！',
              type: 'success'
            });
          } else {

            this.$message({
              message: '提交批准解绑失败！',
              type: 'error'
            });
          }
        })
        this.alert_1_9 = false
      },
      part3_approve() {
        this.alert_1_10 = true
      },
      alert_1_10_cancel() {
        this.alert_1_10 = false
      },
      alert_1_10_sure() {
        allApprovalbind().then(response => {
          if (response.eCode == 200) {
            this.Initialization_data_3()
            this.$message({
              message: '已提交全部批准解绑！',
              type: 'success'
            });
          } else {
            this.$message({
              message: '提交全部批准解绑失败！',
              type: 'error'
            });
          }
        })
        this.alert_1_10 = false
      },
      get_data_4(e, q) {
        transactionRecordScreen(e).then(response => {
          if (response.dataList == []) {
            this.tableData_8 = []
            this.totla_8 = 0
            this.all_mo = 0
          } else {
            this.tableData_8 = response.dataList
            this.totla_8 = response.total
            this.all_mo = response.allNodePledgeAmount
            if (q == 1) {
              this.part_4_phone = ''
            }
          }
        })
      },
      Initialization_data_4() {
        this.currentPage_8 = 1
        this.select_value_3 = ''
        this.select_value_4 = ''
        let data = {"page": 1, "pagesize": 10, "address": "", "phone": "", "type": "", "in": ""}
        this.get_data_4(data, 0)
      },
      currentPageChange_8(e) {
        this.currentPage_8 = e
        let data
        if (this.search_3.length == 11) {
          data = {
            "page": this.currentPage_8,
            "pagesize": 10,
            "address": "",
            "phone": this.search_3,
            "type": this.select_value_3,
            "in": this.select_value_4.toString()
          }
        } else {
          data = {
            "page": this.currentPage_8,
            "pagesize": 10,
            "address": this.search_3,
            "phone": "",
            "type": this.select_value_3,
            "in": this.select_value_4.toString()
          }
        }
        this.get_data_4(data, 0)
      },
      search_ad_ph_3() {
        this.select_value_3 = ''
        this.select_value_4 = ''
        this.currentPage_8 = 1
        let data
        if (this.search_3.length == 11) {
          data = {"page": 1, "pagesize": 10, "address": "", "phone": this.search_3, "type": "", "in": ""}
        } else {
          data = {"page": 1, "pagesize": 10, "address": this.search_3, "phone": "", "type": "", "in": ""}
        }
        this.get_data_4(data, 1)
      },
      change_user_source_2() {
        this.currentPage_8 = 1
        let data
        if (this.search_3.length == 11) {
          data = {
            "page": 1,
            "pagesize": 10,
            "address": "",
            "phone": this.search_3,
            "type": this.select_value_3,
            "in": this.select_value_4.toString()
          }
        } else {
          data = {
            "page": 1,
            "pagesize": 10,
            "address": this.search_3,
            "phone": "",
            "type": this.select_value_3,
            "in": this.select_value_4.toString()
          }
        }
        this.get_data_4(data, 0)
      },
      change_tr_type() {
        this.currentPage_8 = 1
        let data
        if (this.search_3.length == 11) {
          data = {
            "page": 1,
            "pagesize": 10,
            "address": "",
            "phone": this.search_3,
            "type": this.select_value_3,
            "in": this.select_value_4.toString()
          }
        } else {
          data = {
            "page": 1,
            "pagesize": 10,
            "address": this.search_3,
            "phone": "",
            "type": this.select_value_3,
            "in": this.select_value_4.toString()
          }
        }
        this.get_data_4(data, 0)
      },
      tr_macth(e) {
        let a
        if (e == '' || e == undefined) {
          a = ''
        } else {
          if (e == true) {
            a = '质押'
          } else {
            a = '赎回'
          }
        }


        return a
      },
      identity_type(e) {
        let a = ''
        if (e == -1) {
          a = '总计'
        } else if (e == 0) {
          a = '创世王者节点'
        } else if (e == 1) {
          a = '王者节点'
        } else if (e == 2) {
          a = '青铜节点'
        } else if (e == 4) {
          a = '白银节点'
        }
        return a
      },
      Initialization_data_5() {
        getAcceptAndRedeemLogNew().then(response => {
          if (response.eCode == 200) {
            this.data_record_1 = response.data
            this.time_hi_1 = this.data_record_1[0].timestamp
          } else {
            this.data_record_1 = []
          }
        })
        nodeReport().then(response => {
          if (response.eCode == 200) {
            this.data_record_3 = response.data.dataList

          } else {
            this.data_record_3 = []
          }
        })
        getNowSettlement().then(response => {
          if (response.eCode == 200) {
            this.data_record_2 = response.data
            this.time_hi_2 = this.data_record_2[0].timestamp

          } else {
            this.data_record_2 = []
          }
        })
      },
      get_historical_details(table, value, type) {
        this.pick_data = null
        this.currentPage_record_1 = 1
        this.record_list.table = table
        this.record_list.value = value
        this.record_list.type = type
        this.is_show_mi = false
        if (table == 0) {
          this.is_show_mi = true
          this.details_name = this.hist_list[value].name + '历史记录'
          this.record_field_1 = this.hist_list[value].value
          let data = {"page": 1, "pageSize": 10, "startTime": 0, "endTime": 0, "columnName": this.record_field_1}
          getAcceptAndRedeemLog(data).then(response => {
            this.picker_value1 = ''
            this.historical_details = true
            if (response.data.dataList == []) {
              this.data_record_4 = []
              this.totla_record_1 = 0
            } else {
              response.data.dataList.forEach((item, index, self) => {
                item.value = this.scientificCounting(item.value)
              })
              this.data_record_4 = response.data.dataList
              this.totla_record_1 = response.data.total
            }
          })
        } else if (table == 1) {
          this.details_name = this.hist_list_2[value].name + '历史记录'
          this.record_field_1 = this.hist_list_2[value].value
          let data = {
            "page": 1,
            "pageSize": 10,
            "startTime": 0,
            "endTime": 0,
            "columnName": this.record_field_1,
            "identity": ''
          }
          getEarningsLog(data).then(response => {
            this.picker_value1 = ''
            this.historical_details = true
            if (response.data.dataList == []) {
              this.data_record_4 = []
              this.totla_record_1 = 0
            } else {
              if (value == 2 || value == 3) {
                response.data.dataList.forEach((item, index, self) => {
                  item.value = this.scientificCounting(item.value)
                })
              }
              this.data_record_4 = response.data.dataList
              this.totla_record_1 = response.data.total
            }
          })
        } else {
          this.identity_value = type
          let type_name = this.identity_type(type)
          this.details_name = this.hist_list_3[value].name + '（' + type_name + '）' + '历史记录'
          this.record_field_1 = this.hist_list_3[value].value
          let data = {
            "page": 1,
            "pageSize": 10,
            "startTime": 0,
            "endTime": 0,
            "columnName": this.record_field_1,
            "identity": this.identity_value
          }
          getEarningsLog(data).then(response => {
            this.picker_value1 = ''
            this.historical_details = true
            if (response.data.dataList == []) {
              this.data_record_4 = []
              this.totla_record_1 = 0
            } else {
              if (value == 1 || value == 2 || value == 4 || value == 5 || value == 6 || value == 7) {
                response.data.dataList.forEach((item, index, self) => {
                  item.value = this.scientificCounting(item.value)
                })
              }
              this.data_record_4 = response.data.dataList
              this.totla_record_1 = response.data.total
            }
          })
        }

      },
      change_historical_details(starttime, endtime, currpage) {
        if (currpage == 1) {
          this.currentPage_record_1 = 1
        }
        let table = this.record_list.table
        let value = this.record_list.value
        let type = this.record_list.type
        if (table == 0) {
          this.details_name = this.hist_list[value].name + '历史记录'
          this.record_field_1 = this.hist_list[value].value
          let data = {
            "page": currpage,
            "pageSize": 10,
            "startTime": starttime,
            "endTime": endtime,
            "columnName": this.record_field_1
          }
          getAcceptAndRedeemLog(data).then(response => {
            this.historical_details = true
            if (response.data.dataList == []) {
              this.data_record_4 = []
              this.totla_record_1 = 0
            } else {
              response.data.dataList.forEach((item, index, self) => {
                item.value = this.scientificCounting(item.value)
              })
              this.data_record_4 = response.data.dataList
              this.totla_record_1 = response.data.total
            }
          })
        } else if (table == 1) {
          this.details_name = this.hist_list_2[value].name + '历史记录'
          this.record_field_1 = this.hist_list_2[value].value
          let data = {
            "page": currpage,
            "pageSize": 10,
            "startTime": starttime,
            "endTime": endtime,
            "columnName": this.record_field_1,
            "identity": ''
          }
          getEarningsLog(data).then(response => {
            this.historical_details = true
            if (response.data.dataList == []) {
              this.data_record_4 = []
              this.totla_record_1 = 0
            } else {
              if (value == 2 || value == 3) {
                response.data.dataList.forEach((item, index, self) => {
                  item.value = this.scientificCounting(item.value)
                })
              }
              this.data_record_4 = response.data.dataList
              this.totla_record_1 = response.data.total
            }
          })
        } else {
          this.identity_value = type
          let type_name = this.identity_type(type)
          this.details_name = this.hist_list_3[value].name + '（' + type_name + '）' + '历史记录'
          this.record_field_1 = this.hist_list_3[value].value
          let data = {
            "page": currpage,
            "pageSize": 10,
            "startTime": starttime,
            "endTime": endtime,
            "columnName": this.record_field_1,
            "identity": this.identity_value
          }
          getEarningsLog(data).then(response => {
            this.historical_details = true
            if (response.data.dataList == []) {
              this.data_record_4 = []
              this.totla_record_1 = 0
            } else {
              if (value == 1 || value == 2 || value == 4 || value == 5) {
                response.data.dataList.forEach((item, index, self) => {
                  item.value = this.scientificCounting(item.value)
                })
              }
              this.data_record_4 = response.data.dataList
              this.totla_record_1 = response.data.total
            }
          })
        }

      },
      change_currentPage_record_1(e) {
        this.currentPage_record_1 = e
        if (this.pick_data == null) {
          this.change_historical_details(0, 0, this.currentPage_record_1)
        } else {
          this.change_historical_details(this.pick_data[0], this.pick_data[1], this.currentPage_record_1)
        }
      },
      chooseTimeRange(e) {
        this.pick_data = e
        if (this.pick_data == null) {
          this.change_historical_details(0, 0, 1)
        } else {
          this.change_historical_details(this.pick_data[0] / 1000, this.pick_data[1] / 1000, 1)
        }

      },
      sea_userinfo() {
        let data = {'phone': this.search_phone_use, 'address': ''}
        getPersonDetails(data).then(response => {
          if (response.eCode === 200) {
            if (response.data.length === 0) {
              this.$message.error('查询结果为空，请输入正确手机号！');
              this.tableData_11 = []
            } else {
              this.tableData_11 = response.data
            }
          } else {
            this.$message.error('查询结果为空，请输入正确手机号！');
          }
        })
      },
      get_code() {
        if (this.table_form.user_phone == '') {
          this.$message({
            message: '手机号不能为空，请输入正确手机号！',
            type: 'error'
          });
        } else {
          let data = {'phone': this.table_form.user_phone}
          getphonecode(data).then(response => {
            if (response.eCode === 200) {
              this.$message({
                message: '验证信息已下发，请注意查收！',
                type: 'success'
              });
            } else {
              this.$message({
                message: response.eMsg,
                type: 'error'
              });
            }
          })
        }

      },
      edit_user_info(id, address, phone, identity, newidentity, name, pledgeBalance) {
        // this.old_ident = identity
        this.table_form = {
          'address': address,
          'phone': phone,
          'identity': identity,
          'newidentity': newidentity,
          'name': name,
          'user_phone': '',
          'pledgeBalance': this.scientificCounting(pledgeBalance),
          'code': '',
          'id': id,
        }
        getNickNameInfo().then(response => {
          if (response.eCode === 200) {
            response.data.forEach((item, index, self) => {
              item.value = index + 1
            })
            this.no_ty_selects = response.data
            let aa = {'name': name, 'value': 0}
            this.no_ty_selects.unshift(aa)
            let send_data = {}
            this.nodety_select = identity.toString()
            this.nodety_select_1 = newidentity.toString()
            nodeType(send_data).then(response => {
              this.nodety_selects = response
              this.dialogTableVisible_1 = true
            })
          } else {

          }
        })

      },
      dialogcancle_nusi() {
        this.table_form = {
          'address': '',
          'phone': '',
          'identity': '',
          'newidentity': '',
          'name': '',
          'pledgeBalance': '',
          'user_phone': '',
          'code': '',
          'id': '',
        }
        this.dialogTableVisible_1 = false
      },
      dialogsure_nusi() {
        if (this.table_form.user_phone == '' || this.table_form.code == '') {
          this.$message({
            message: '手机号与验证码不能为空',
            type: 'error'
          });
        } else {
          let send_data = {'phone': this.table_form.user_phone, 'code': this.table_form.code}
          getphonecodeinvalid(send_data).then(response => {
            if (response.eCode == 200) {
              let send_data1 = {
                "id": this.table_form.id,
                "pledgebalance": this.table_form.pledgeBalance,
                "name": this.no_ty_selects[this.no_ty_select].name,
                "identity": this.nodety_select,
                "newidentity": this.nodety_select_1,
                "updateuserphone": this.table_form.user_phone
              }
              updateNodeInfo(send_data1).then(response => {
                if (response.eCode == 200) {
                  this.$message({
                    message: '用户信息修改成功！',
                    type: 'success'
                  });
                  this.sea_userinfo()
                  this.dialogTableVisible_1 = false
                } else {
                  this.$message({
                    message: '用户信息修改失败，请稍后重试！',
                    type: 'success'
                  });
                }
              })
            } else {
              this.$message({
                message: '手机号与验证码匹配失败！请检查手机号，验证码后重试！',
                type: 'error'
              });
            }
          })
        }

      }
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
  .af_all {
    width: 100%;
  }

  .item_active {
    color: #800080;
    /*border-bottom: 2px solid #800080 ;*/
    /*padding-bottom: 5px;*/
  }

  .part_5_title {
    color: #800080;
    font-size: 16px;
    margin-bottom: 30px;
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
    width: 50%;
    display: flex;
    justify-content: space-between;
  }

  .el-pagination {
    position: relative;
    float: right;
    margin-right: 3%;
    /*margin-top: 30px;*/
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
    width: 35%;
    background-color: #ffffff;
  }

  .us_search2_1_input_icon {
    position: relative;
    left: 14px;
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

  .operating_2 {
    cursor: pointer;
    color: #800080;
  }

  .input_fath {
    width: 80%;
    position: relative;
    left: 3%;
  }

  .block {
    padding-bottom: 30px;
  }

  .select_active {
    color: #800080;
    cursor: pointer;
    /*border-bottom: 2px solid #800080 ;*/
    /*padding-bottom: 5px;*/
  }
</style>
