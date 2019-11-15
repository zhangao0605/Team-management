<template>
  <div class="wr_all">
    <div class="index_table_swith">
      <div class="table_item" @click="swich_tab_1(index)" v-for="(list,index) in table_items"
           :class="index== isactive?item_active:'item_default'">{{list.name}}
      </div>
    </div>

    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>是否确认进行该批次提现，请确认！</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_cancel()">取 消</el-button>
    <el-button type="primary" @click="dialog_sure()">确 定</el-button>
       </span>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="dialogVisible_1"
      width="30%"
    >
      <span>您正在修改用户提现到XX交易所的地址，修改后该记录将重新进入未审核状态，需要重新审核后才能进行打款</span>
      <br>
      <el-input style="width: 70%;margin-top: 30px" v-model="verify_phone_number_1"
                placeholder="请输入用户新的交易所地址"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_cancel_1()">取 消</el-button>
    <el-button type="primary" @click="dialog_sure_1()">确 定</el-button>
       </span>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="dialogVisible_3"
      width="30%"
    >
      <span>您正在修改用户提现到XX交易所的地址，修改后该记录将重新进入未审核状态，需要重新审核后才能进行打款</span>
      <br>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_cancel_3()">取 消</el-button>
    <el-button type="primary" @click="dialog_sure_3()">确 定</el-button>
       </span>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="dialogVisible_2"
      width="30%"
    >
      <span>退款后，该笔提现请求会被取消，用户会在钱包中收到返还的转账金额，请与用户确认后再进行退款操作</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_cancel_2()">取 消</el-button>
    <el-button type="primary" @click="dialog_sure_2()">确 定</el-button>
       </span>
    </el-dialog>


    <el-dialog
      title=""
      :visible.sync="dialogVisible_4"
      width="30%"
    >
      <span>您提交的提现审核里有交易会使得虎符地址<br>
        <span style="margin-top: 10px;display: inline-block" v-for="item in res_list ">{{item.wDAddress}}</span><br>
        <span style="margin-top: 10px;display: inline-block">达到当日提现限额，是否继续?</span>
      </span>
      <br>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_cancel_4()">暂不审批</el-button>
    <el-button type="primary" @click="dialog_sure_4()">仍要审批</el-button>
       </span>
    </el-dialog>

    <div class="part_1" v-show="part_show[0].is_true">
      <div class="con_table">
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            label="提现时间"
            align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.timestamp)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="绑定的手机号"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现交易所"
            align="center">
            <template slot-scope="scope">
              <span>{{match_exchange(scope.row.exchangeType)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.wDAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现数量"
            align="center">
            <template slot-scope="scope">
              <span>{{scientificCounting(scope.row.balance)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="审核时间"
            align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.auditTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现状态"
            align="center">
            <template slot-scope="scope">
              <span>{{tradingStatus(scope.row.status)}}</span>
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
    <div class="part_2" v-show="part_show[1].is_true">
      <el-button type="primary" class="con_search_submit_2" style="float: right" @click="batch_review()">批量审核
      </el-button>
      <div class="con_search" style="width: 30%">
        <div class="con_search_div" style="width: 78%">
          <span class="el-icon-search us_search2_1_input_icon"></span>
          <div class="input_fath">
            <el-input v-model="search_more_vlue_3"
                      placeholder="请输入手机号/用户地址/提现地址进行检索">
            </el-input>
          </div>
        </div>
        <el-button type="primary" style="position: relative;left: 0%" class="con_search_submit"
                   @click="search_more_review()">
          搜索
        </el-button>
      </div>
      <div class="con_table">
        <el-table
          :data="tableData_2"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
          @selection-change="handleSelectionChange"
          ref="multipleTable"
        >
          <el-table-column
            type="selection"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            label="提现时间"
            align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.timestamp)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="绑定的手机号"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现交易所"
            align="center">
            <template slot-scope="scope">
              <span>{{match_exchange(scope.row.exchangeType)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.wDAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现数量"
            align="center">
            <template slot-scope="scope">
              <span>{{scientificCounting(scope.row.balance)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="暂不审核名单"
            align="center">
            <template slot-scope="scope">
              <span class="item_active_click" @click="join_without_review(scope.row.Id)">加入暂不审核</span>
            </template>
          </el-table-column>
          <el-table-column
            label="审核原因"
            align="center">
            <template slot-scope="scope">
              <span >{{scope.row.note}}</span>
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
    <div class="part_3" v-show="part_show[2].is_true">
      <div class="con_table">
        <el-table
          :data="tableData_3"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            label="审核批次"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.reviewBatch}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="审核时间"
            align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.auditTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提审数量"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.auditCount}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="成功数量"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.successCount}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="失败数量"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.faildCount}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="currentPageChange_2"
          :current-page="currentPage_2"
          :page-size="pagesize_2"
          layout="total,prev, pager, next"
          :total="totla_2">
        </el-pagination>
      </div>
    </div>
    <div class="part_4" v-show="part_show[3].is_true">
      <div class="con_search">
        <div class="con_search_div">
          <span class="el-icon-search us_search2_1_input_icon"></span>
          <div class="input_fath">
            <el-input v-model="search_more_vlue"
                      placeholder="请输入用户手机号/用户地址/提现地址进行检索">
            </el-input>
          </div>
        </div>
        <el-button type="primary" style="position: relative;left: -3%" class="con_search_submit" @click="search_more()">
          搜索
        </el-button>
        <el-select style="margin-left: 5%" v-model="select_value1" @change="pa_search_4_1()" placeholder="请选择提现交易所">
          <el-option
            v-for="item_1 in options"
            :key="item_1.typeId"
            :label="item_1.typeName"
            :value="item_1.typeId">
          </el-option>
        </el-select>
        <el-select style="margin-left: 5%" v-model="select_value2" @change="pa_search_4_2()" placeholder="请选择审核批次">
          <el-option
            v-for="item_2 in options_1"
            :key="item_2.batch"
            :label="item_2.batchName"
            :value="item_2.batch">
          </el-option>
        </el-select>
      </div>
      <div class="con_table">
        <el-table
          :data="tableData_4"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            label="提现时间"
            align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.timestamp)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="绑定的手机号"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现交易所"
            align="center">
            <template slot-scope="scope">
              <span>{{match_exchange(scope.row.exchangeType)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.wDAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现数量"
            align="center">
            <template slot-scope="scope">
              <span>{{scientificCounting(scope.row.balance)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="审核时间"
            align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.auditTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="审核批次"
            align="center">
            <template slot-scope="scope">
              <span>{{match_batch(scope.row.reviewBatch)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现状态"
            align="center">
            <template slot-scope="scope">
              <span>{{tradingStatus(scope.row.status)}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="currentPageChange_3"
          :current-page="currentPage_3"
          :page-size="pagesize_3"
          layout="total,prev, pager, next"
          :total="totla_3">
        </el-pagination>
      </div>
    </div>
    <div class="part_5" v-show="part_show[4].is_true">
      <div class="con_search">
        <div class="con_search_div">
          <span class="el-icon-search us_search2_1_input_icon"></span>
          <div class="input_fath">
            <el-input v-model="search_more_vlue_1"
                      placeholder="请输入用户手机号/用户地址/提现地址进行检索">
            </el-input>
          </div>
        </div>
        <el-button type="primary" style="position: relative;left: -3%" class="con_search_submit"
                   @click="search_more_1()">搜索
        </el-button>
        <el-select style="margin-left: 5%" v-model="select_value1_1" @change="pa_search_5_1()" placeholder="请选择提现交易所">
          <el-option
            v-for="item_3 in options"
            :key="item_3.typeId"
            :label="item_3.typeName"
            :value="item_3.typeId">
          </el-option>
        </el-select>
        <el-select style="margin-left: 5%" v-model="select_value2_1" @change="pa_search_5_2()" placeholder="请选择审核批次">
          <el-option
            v-for="item_4 in options_1"
            :key="item_4.batch"
            :label="item_4.batchName"
            :value="item_4.batch">
          </el-option>
        </el-select>
      </div>
      <div class="con_table">
        <el-table
          :data="tableData_5"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            label="提现时间"
            align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.timestamp)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="绑定的手机号"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现交易所"
            align="center">
            <template slot-scope="scope">
              <span>{{match_exchange(scope.row.exchangeType)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.wDAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现数量"
            align="center">
            <template slot-scope="scope">
              <span>{{scientificCounting(scope.row.balance)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="审核时间"
            align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.auditTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="审核批次"
            align="center">
            <template slot-scope="scope">
              <span>{{match_batch(scope.row.reviewBatch)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现状态"
            align="center">
            <template slot-scope="scope">
              <span>{{tradingStatus(scope.row.status)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <!--<span class="operating" @click="change_address()">修改地址</span>-->
              <span class="operating" @click="refund(scope.row.hash,scope.row.Id)">退款</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="currentPageChange_4"
          :current-page="currentPage_4"
          :page-size="pagesize_4"
          layout="total,prev, pager, next"
          :total="totla_4">
        </el-pagination>
      </div>
    </div>
    <div class="part_6" v-show="part_show[5].is_true">
      <div class="con_search">
        <div class="con_search_div">
          <span class="el-icon-search us_search2_1_input_icon"></span>
          <div class="input_fath">
            <el-input v-model="search_more_vlue_2"
                      placeholder="请输入用户手机号/用户地址/提现地址进行检索">
            </el-input>
          </div>
        </div>
        <el-button type="primary" style="position: relative;left:-15.4%" class="con_search_submit"
                   @click="search_more_2()">搜索
        </el-button>
        <el-select style="left: -25.7%;position: relative" v-model="select_value1_2" @change="pa6_select()"
                   placeholder="请选择提现交易所">
          <el-option
            v-for="item_5 in options"
            :key="item_5.typeId"
            :label="item_5.typeName"
            :value="item_5.typeId">
          </el-option>
        </el-select>
      </div>
      <div class="con_table">
        <el-table
          :data="tableData_6"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            label="提现时间"
            align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.timestamp)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="绑定的手机号"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现交易所"
            align="center">
            <template slot-scope="scope">
              <span>{{match_exchange(scope.row.exchangeType)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.wDAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现数量"
            align="center">
            <template slot-scope="scope">
              <span>{{scientificCounting(scope.row.balance)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="审核时间"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.auditTime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="审核批次"
            align="center">
            <template slot-scope="scope">
              <span>{{match_batch(scope.row.reviewBatch)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现状态"
            align="center">
            <template slot-scope="scope">
              <span>{{tradingStatus(scope.row.status)}}</span>
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
    <div class="part_7" v-show="part_show[6].is_true">
      <div class="con_search" style="width: 30%">
        <div class="con_search_div" style="width: 78%">
          <span class="el-icon-search us_search2_1_input_icon"></span>
          <div class="input_fath">
            <el-input v-model="search_more_vlue_7"
                      placeholder="请输入手机号/用户地址/提现地址进行检索">
            </el-input>
          </div>
        </div>
        <el-button type="primary" style="position: relative;left: 0%" class="con_search_submit"
                   @click="search_without_review()">
          搜索
        </el-button>
      </div>
      <div class="con_table">
        <el-table
          :data="tableData_7"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            label="提现时间"
            align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.timestamp)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="绑定的手机号"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现交易所"
            align="center">
            <template slot-scope="scope">
              <span>{{match_exchange(scope.row.exchangeType)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.wDAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="提现数量"
            align="center">
            <template slot-scope="scope">
              <span>{{scientificCounting(scope.row.balance)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="暂不审核名单"
            align="center">
            <template slot-scope="scope">
              <span class="item_active_click" @click="join_review(scope.row.Id)">恢复审核</span>
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
  </div>
</template>

<script>
  import {
    getWithdrawalRecord,
    getExchangeType,
    reviewBatch,
    auditWithdrawalRecord,
    getALLReviewBatch,
    withdrawalRefund,
    getRedeemRecordCeiling,
    withholdAudit
  } from '../api/interface'

  export default {
    name: "withdrawalsRecord",
    data() {
      return {
        multipleSelection: [],
        verify_phone_number: '',
        verify_phone_number_1: '',
        dialogVisible: false,
        dialogVisible_1: false,
        dialogVisible_2: false,
        dialogVisible_3: false,
        dialogVisible_4: false,
        isactive: 0,
        item_active: 'item_active',
        item_default: 'item_default',
        table_items: [
          {"name": ' 全部 '},
          {"name": ' 未审核 '},
          {"name": ' 审批批次 '},
          {"name": ' 提现成功 '},
          {"name": ' 提现失败 '},
          {"name": ' 已退款 '},
          {"name": ' 暂不审核 '},
        ],
        is_show: [
          {"is_true": true},
          {"is_true": false},
          {"is_true": false},
          {"is_true": false},
          {"is_true": false},
          {"is_true": false},
          {"is_true": false},
        ],
        part_show: [
          {"is_true": true},
          {"is_true": false},
          {"is_true": false},
          {"is_true": false},
          {"is_true": false},
          {"is_true": false},
          {"is_true": false},
        ],
        options: [{
          address: "",
          typeId: "",
          typeName: "请选择提现交易所"
        }],
        options_1: [{
          batch: "",
          batchName: "请选择审核批次",
        }],
        search_more_vlue: '',
        search_more_vlue_1: '',
        search_more_vlue_2: '',
        search_more_vlue_3: '',
        search_more_vlue_7: '',
        select_value1: '',
        select_value2: '',
        select_value1_1: '',
        select_value2_1: '',
        select_value1_2: '',
        tableData: [],
        tableData_2: [],
        tableData_3: [],
        tableData_4: [],
        tableData_5: [
          {"groupNo": 'asdasd'}
        ],
        tableData_6: [
          {"groupNo": 'asdasd'}
        ],
        tableData_7: [],
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
        currentPage_7: 1,
        pagesize_7: 10,
        totla_7: 0,
        part_4_recording: '',
        part_5_recording: '',
        part_6_recording: '',
        part_7_recording: '',
        refund_value: '',
        refund_value_id: '',
        res_list:[],
      }
    },
    methods: {
      get_data_1(e) {
        getWithdrawalRecord(e).then(response => {
          if (response.data.dataList == []) {
            this.tableData = []
            this.totla = 0
          } else {
            this.tableData = response.data.dataList
            this.totla = response.data.total
          }
        })
      },
      get_data_2(e) {
        getWithdrawalRecord(e).then(response => {
          if (response.data.dataList == []) {
            this.tableData_2 = []
            this.totla_1 = 0
          } else {
            this.tableData_2 = response.data.dataList
            this.totla_1 = response.data.total
          }
        })
      },
      get_data_3(e) {
        getALLReviewBatch(e).then(response => {
          if (response.data.dataList == [] || response.data.dataList == null) {
            this.tableData_3 = []
            this.totla_2 = 0
          } else {
            this.tableData_3 = response.data.dataList
            this.totla_2 = response.data.total
          }
        })
      },
      get_data_5(e, q) {
        getWithdrawalRecord(e).then(response => {
          if (response.data.dataList == []) {
            this.tableData_5 = []
            this.totla_4 = 0
          } else {
            this.tableData_5 = response.data.dataList
            this.totla_4 = response.data.total
            if (q == 1) {
              this.part_5_recording = this.search_more_vlue_1
            }
          }
        })
      },
      get_data_4(e, q) {
        getWithdrawalRecord(e).then(response => {
          if (response.data.dataList == []) {
            this.tableData_4 = []
            this.totla_3 = 0
          } else {
            this.tableData_4 = response.data.dataList
            this.totla_3 = response.data.total
            if (q == 1) {
              this.part_4_recording = this.search_more_vlue
            }
          }
        })
      },
      get_data_6(e, q) {
        getWithdrawalRecord(e).then(response => {
          if (response.data.dataList == []) {
            this.tableData_6 = []
            this.totla_5 = 0
          } else {
            this.tableData_6 = response.data.dataList
            this.totla_5 = response.data.total
            if (q == 1) {
              this.part_6_recording = this.search_more_vlue_2
            }
          }
        })
      },
      get_data_7(e, q) {
        getWithdrawalRecord(e).then(response => {
          if (response.data.dataList == []) {
            this.tableData_7 = []
            this.totla_7 = 0
          } else {
            this.tableData_7 = response.data.dataList
            this.totla_7 = response.data.total
            if (q == 1) {
              this.part_7_recording = this.search_more_vlue_7
            }
          }
        })
      },
      match_exchange(e) {
        let a = ''
        if (e == '' || e == undefined) {
          a = ''
        } else {
          this.options.forEach((item, index, self) => {
            if (e == item.typeId) {
              a = item.typeName
            } else {

            }
          })
        }
        return a
      },
      match_status(e) {
        let a = ''
        if (e == 1) {
          a = '成功'
        } else if (e == 0) {
          a = '失败'
        } else if (e == -1) {
          a = '未验证'
        } else {
          a = '退款'
        }
        return a
      },
      match_batch(e) {
        let a = ''
        if (e == '' || e == undefined) {
          a = ''
        } else {
          this.options_1.forEach((item, index, self) => {
            if (e == item.batch) {
              a = item.batchName
            } else {

            }
          })
        }
        return a
      },
      getdata_public() {
        getExchangeType().then(response => {
          this.options = this.options.concat(response.data)
        })
        reviewBatch().then(response => {
          this.options_1 = this.options_1.concat(response.data)
        })
      },
      Initialization_data_1() {
        this.currentPage = 1
        let data = {
          "phone": "",
          "address": "",
          "exchangeType": "",
          "page": 1,
          "pagesize": 10,
          "reviewBatch": "",
          "status": ""
        }
        this.get_data_1(data)
      },
      Initialization_data_4() {
        this.currentPage_3 = 1
        this.search_more_vlue = ''
        this.select_value1 = ''
        this.select_value2 = ''
        let data = {
          "phone": "",
          "address": "",
          "exchangeType": "",
          "page": 1,
          "pagesize": 10,
          "reviewBatch": "",
          "status": "102"
        }
        this.get_data_4(data, 0)
      },
      Initialization_data_5() {
        this.currentPage_4 = 1
        this.search_more_vlue_1 = ''
        this.select_value1_1 = ''
        this.select_value2_1 = ''
        let data = {
          "phone": "",
          "address": "",
          "exchangeType": "",
          "page": 1,
          "pagesize": 10,
          "reviewBatch": "",
          "status": "103"
        }
        this.get_data_5(data, 0)
      },
      Initialization_data_6() {
        this.currentPage_5 = 1
        this.search_more_vlue_2 = ''
        this.select_value1_2 = ''
        let data = {
          "phone": "",
          "address": "",
          "exchangeType": "",
          "page": 1,
          "pagesize": 10,
          "reviewBatch": "",
          "status": "2"
        }
        this.get_data_6(data, 0)
      },
      Initialization_data_7() {
        this.currentPage_7 = 1
        this.search_more_vlue_7 = ''
        let data = {
          "phone": "",
          "address": "",
          "exchangeType": "",
          "page": 1,
          "pagesize": 10,
          "reviewBatch": "",
          "status": "105"
        }
        this.get_data_7(data, 0)
      },
      Initialization_data_2() {
        this.currentPage_1 = 1
        let data = {
          "phone": "",
          "address": "",
          "exchangeType": "",
          "page": 1,
          "pagesize": 10,
          "reviewBatch": "",
          "status": "1"
        }
        this.get_data_2(data)
      },
      Initialization_data_3() {
        this.currentPage_2 = 1
        let data = {"page": 1, "pageSize": 10}
        this.get_data_3(data)
      },
      swich_tab_1(e) {
        this.isactive = e
        this.is_show.forEach((item, index, self) => {
          if (index == e) {
            item.is_true = true
          } else {
            item.is_true = false
          }
        })
        this.part_show.forEach((item, index, self) => {
          if (index == e) {
            item.is_true = true
          } else {
            item.is_true = false
          }
        })
        if (e == 0) {
          this.Initialization_data_1()
        }
        else if (e == 1) {
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
        else if (e == 5) {
          this.Initialization_data_6()
        }
        else if (e == 6) {
          this.Initialization_data_7()
        }

      },
      currentPageChange(e) {
        this.currentPage = e
        let data = {
          "phone": "",
          "address": "",
          "exchangeType": "",
          "page": this.currentPage,
          "pagesize": 10,
          "reviewBatch": "",
          "status": ''
        }
        this.get_data_1(data)
      },
      currentPageChange_1(e) {
        this.currentPage_1 = e
        let data = {
          "phone": "",
          "address": "",
          "exchangeType": "",
          "page": this.currentPage_1,
          "pagesize": 10,
          "reviewBatch": "",
          "status": "1"
        }
        this.get_data_2(data)
      },
      currentPageChange_2(e) {
        this.currentPage_2 = e
        let data = {"page": this.currentPage_2, "pageSize": 10}
        this.get_data_3(data)
      },
      currentPageChange_3(e) {
        this.currentPage_3 = e
        if (this.part_4_recording.length == 11) {
          let data = {
            "phone": this.part_4_recording,
            "address": "",
            "exchangeType": this.select_value1,
            "page": this.currentPage_3,
            "pagesize": 10,
            "reviewBatch": this.select_value2.toString(),
            "status": '102'
          }
          this.get_data_4(data, 0)
        } else {
          let data = {
            "phone": "",
            "address": this.part_4_recording,
            "exchangeType": this.select_value1,
            "page": this.currentPage_3,
            "pagesize": 10,
            "reviewBatch": this.select_value2.toString(),
            "status": '102'
          }
          this.get_data_4(data, 0)
        }

      },
      currentPageChange_4(e) {
        this.currentPage_4 = e
        let data
        if (this.part_4_recording.length == 11) {
          data = {
            "phone": this.part_4_recording,
            "address": "",
            "exchangeType": this.select_value1_1,
            "page": this.currentPage_4,
            "pagesize": 10,
            "reviewBatch": this.select_value2_1.toString(),
            "status": "103"
          }
          this.get_data_5(data, 0)
        } else {
          data = {
            "phone": '',
            "address": this.part_4_recording,
            "exchangeType": this.select_value1_1,
            "page": this.currentPage_4,
            "pagesize": 10,
            "reviewBatch": this.select_value2_1.toString(),
            "status": "103"
          }
          this.get_data_5(data, 0)
        }

      },
      currentPageChange_5(e) {
        this.currentPage_5 = e
        let data
        if (this.part_6_recording.length == 11) {
          data = {
            "phone": this.part_6_recording,
            "address": "",
            "exchangeType": this.select_value1_2,
            "page": this.currentPage_5,
            "pagesize": 10,
            "reviewBatch": "",
            "status": "2"
          }
        } else {
          data = {
            "phone": '',
            "address": this.part_6_recording,
            "exchangeType": this.select_value1_2,
            "page": this.currentPage_5,
            "pagesize": 10,
            "reviewBatch": "",
            "status": "2"
          }
        }
        this.get_data_6(data, 0)
      },
      currentPageChange_7(e) {
        this.currentPage_7 = e
        if (this.search_more_vlue_7.length == 11) {
          let data = {
            "phone": this.part_7_recording,
            "address": "",
            "exchangeType": "",
            "page": this.currentPage_7,
            "pagesize": 10,
            "reviewBatch": "",
            "status": "105"
          }
          this.get_data_7(data, 0)
        } else {
          let data = {
            "phone": "",
            "address": this.part_7_recording,
            "exchangeType": "",
            "page": this.currentPage_7,
            "pagesize": 10,
            "reviewBatch": "",
            "status": "105"
          }
          this.get_data_7(data, 0)
        }
      },
      batch_review() {

        // console.log(this.multipleSelection)
        if (this.multipleSelection.length == 0) {
          this.$message({
            type: 'error',
            message: '请选择批量处理的数据后，再次重试！'
          });
        } else {
          this.dialogVisible = true
        }

      },
      dialog_cancel() {
        this.dialogVisible = false
        this.verify_phone_number = ''
      },
      dialog_sure() {
        let ids_str = ''
        this.multipleSelection.forEach((item, index, self) => {
          if (self.length - 1 == index) {
            ids_str += item.Id
          } else {
            ids_str += item.Id + ','
          }

        })
        let data = {"ids": ids_str}
        this.res_list=[]
        getRedeemRecordCeiling(data).then(response => {
          // console.log('1111')
          if (response.data.length == 0) {
            auditWithdrawalRecord(data).then(response => {
              // console.log('2222222')
              this.search_more_vlue_3=''
              if (response.eCode == 200) {
                this.$message({
                  type: 'success',
                  message: '批量审核已提交！'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: response.eMsg
                });
              }
              this.dialogVisible = false
              this.Initialization_data_2()
            })
          } else {
            this.res_list=response.data
            this.dialogVisible_4 = true
            this.dialogVisible = false
          }
        })

      },
      dialog_cancel_4() {
        this.dialogVisible_4 = false
      },
      dialog_sure_4() {
        let ids_str = ''
        this.multipleSelection.forEach((item, index, self) => {
          if (self.length - 1 == index) {
            ids_str += item.Id
          } else {
            ids_str += item.Id + ','
          }

        })
        let data = {"ids": ids_str}
        auditWithdrawalRecord(data).then(response => {
          this.search_more_vlue_3=''
          if (response.eCode == 200) {
            this.$message({
              type: 'success',
              message: '批量审核已提交！'
            });
          } else {
            this.$message({
              type: 'error',
              message: response.eMsg
            });
          }
          this.dialogVisible_4 = false
          this.Initialization_data_2()
        })
      },
      join_without_review(e) {

        let data = {'id': e, 'flag': 0}
        withholdAudit(data).then(response => {
          if (response.eCode == 200) {
            this.$message({
              type: 'success',
              message: '加入暂不审核已提交！'
            });
          } else {
            this.$message({
              type: 'error',
              message: response.eMsg
            });
          }
          if (this.tableData_2.length == 1) {
            if (this.currentPage_1 == 1) {
              this.currentPageChange_1(this.currentPage_1)
            } else {
              this.currentPageChange_1(this.currentPage_1 - 1)
            }

          } else {
            this.currentPageChange_1(this.currentPage_1)
          }

        })
      },
      search_more_review() {
        this.currentPage_1 = 1
        if (this.search_more_vlue_3.length == 11) {
          let data = {
            "phone": this.search_more_vlue_3,
            "address": "",
            "exchangeType": "",
            "page": 1,
            "pagesize": 10,
            "reviewBatch": "",
            "status": "1"
          }
          this.get_data_2(data, 1)
        } else {
          let data = {
            "phone": "",
            "address": this.search_more_vlue_3,
            "exchangeType": "",
            "page": 1,
            "pagesize": 10,
            "reviewBatch": "",
            "status": "1"
          }
          this.get_data_2(data, 1)
        }
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      search_more() {
        this.select_value1 = ''
        this.select_value2 = ''
        if (this.search_more_vlue.length == 11) {
          let data = {
            "phone": this.search_more_vlue,
            "address": "",
            "exchangeType": "",
            "page": 1,
            "pagesize": 10,
            "reviewBatch": "",
            "status": "102"
          }
          this.get_data_4(data, 1)
        } else {
          let data = {
            "phone": "",
            "address": this.search_more_vlue,
            "exchangeType": "",
            "page": 1,
            "pagesize": 10,
            "reviewBatch": "",
            "status": "102"
          }
          this.get_data_4(data, 1)
        }
      },
      pa_search_4_1() {
        let data
        if (this.part_4_recording.length == 11) {
          data = {
            "phone": this.part_4_recording,
            "address": "",
            "exchangeType": this.select_value1,
            "page": 1,
            "pagesize": 10,
            "reviewBatch": this.select_value2.toString(),
            "status": "102"
          }
        } else {
          data = {
            "phone": '',
            "address": this.part_4_recording,
            "exchangeType": this.select_value1,
            "page": 1,
            "pagesize": 10,
            "reviewBatch": this.select_value2.toString(),
            "status": "102"
          }
        }
        this.get_data_4(data, 0)
      },
      pa_search_4_2() {
        let data
        if (this.part_4_recording.length == 11) {
          data = {
            "phone": this.part_4_recording,
            "address": "",
            "exchangeType": this.select_value1,
            "page": 1,
            "pagesize": 10,
            "reviewBatch": this.select_value2.toString(),
            "status": "102"
          }
        } else {
          data = {
            "phone": '',
            "address": this.part_4_recording,
            "exchangeType": this.select_value1,
            "page": 1,
            "pagesize": 10,
            "reviewBatch": this.select_value2.toString(),
            "status": "102"
          }
        }
        this.get_data_4(data, 0)
      },
      pa_search_5_1() {
        let data
        if (this.part_5_recording.length == 11) {
          data = {
            "phone": this.part_5_recording,
            "address": "",
            "exchangeType": this.select_value1_1,
            "page": 1,
            "pagesize": 10,
            "reviewBatch": this.select_value2_1.toString(),
            "status": "103"
          }
        } else {
          data = {
            "phone": '',
            "address": this.part_5_recording,
            "exchangeType": this.select_value1_1,
            "page": 1,
            "pagesize": 10,
            "reviewBatch": this.select_value2_1.toString(),
            "status": "103"
          }
        }
        this.get_data_5(data, 0)
      },
      pa_search_5_2() {
        let data
        if (this.part_5_recording.length == 11) {
          data = {
            "phone": this.part_5_recording,
            "address": "",
            "exchangeType": this.select_value1_1,
            "page": 1,
            "pagesize": 10,
            "reviewBatch": this.select_value2_1.toString(),
            "status": "103"
          }
        } else {
          data = {
            "phone": '',
            "address": this.part_5_recording,
            "exchangeType": this.select_value1_1,
            "page": 1,
            "pagesize": 10,
            "reviewBatch": this.select_value2_1.toString(),
            "status": "103"
          }
        }
        this.get_data_5(data, 0)
      },
      search_more_1() {
        this.select_value1_1 = ''
        this.select_value2_1 = ''
        if (this.search_more_vlue_1.length == 11) {
          let data = {
            "phone": this.search_more_vlue_1,
            "address": "",
            "exchangeType": "",
            "page": 1,
            "pagesize": 10,
            "reviewBatch": "",
            "status": "103"
          }
          this.get_data_5(data, 1)
        } else {
          let data = {
            "phone": "",
            "address": this.search_more_vlue_1,
            "exchangeType": "",
            "page": 1,
            "pagesize": 10,
            "reviewBatch": "",
            "status": "103"
          }
          this.get_data_5(data, 1)
        }
      },
      change_address() {
        this.dialogVisible_1 = true
      },
      dialog_cancel_1() {
        this.dialogVisible_1 = false
        this.verify_phone_number_1 = ''
      },
      dialog_sure_1() {
        this.dialogVisible_1 = false
        this.dialogVisible_3 = true
      },
      dialog_cancel_3() {
        this.dialogVisible_3 = false
      },
      dialog_sure_3() {
        this.dialogVisible_3 = false
      },
      refund(e, q) {
        this.refund_value = e
        this.refund_value_id = q
        this.dialogVisible_2 = true
      },
      dialog_cancel_2() {
        this.dialogVisible_2 = false
      },
      dialog_sure_2() {
        let data = {"hash": this.refund_value, "id": this.refund_value_id}
        withdrawalRefund(data).then(response => {
          if (response.eCode == 200) {
            this.$message({
              message: '退款操作已提交！',
              type: 'success'
            });
            this.Initialization_data_5()
          } else {
            this.$message({
              message: '退款操作提交失败！',
              type: 'error'
            });
          }
        })
        this.dialogVisible_2 = false
      },
      search_more_2() {
        this.select_value1_2 = ''
        if (this.search_more_vlue_2.length == 11) {
          let data = {
            "phone": this.search_more_vlue_2,
            "address": "",
            "exchangeType": "",
            "page": 1,
            "pagesize": 10,
            "reviewBatch": "",
            "status": "2"
          }
          this.get_data_6(data, 1)
        } else {
          let data = {
            "phone": "",
            "address": this.search_more_vlue_2,
            "exchangeType": "",
            "page": 1,
            "pagesize": 10,
            "reviewBatch": "",
            "status": "2"
          }
          this.get_data_6(data, 1)
        }
      },
      pa6_select() {
        let data
        if (this.part_6_recording.length == 11) {
          data = {
            "phone": this.part_6_recording,
            "address": "",
            "exchangeType": this.select_value1_2,
            "page": 1,
            "pagesize": 10,
            "reviewBatch": "",
            "status": "2"
          }
        } else {
          data = {
            "phone": '',
            "address": this.part_6_recording,
            "exchangeType": this.select_value1_2,
            "page": 1,
            "pagesize": 10,
            "reviewBatch": "",
            "status": "2"
          }
        }
        this.get_data_6(data, 0)
      },
      tradingStatus(e) {
        let a
        if (e == -1) {
          a = '等待链内完成'
        } else if (e == 0) {
          a = '链内转账失败'
        } else if (e == 1) {
          a = '未审核'
        } else if (e == 2) {
          a = '退款'
        } else if (e == 102) {
          a = '成功'
        } else if (e == 103) {
          a = '失败'
        }
        return a
      },
      join_review(e) {
        let data = {'id': e, 'flag': 1}
        withholdAudit(data).then(response => {
          if (response.eCode == 200) {
            this.$message({
              type: 'success',
              message: '加入暂不审核已提交！'
            });
          } else {
            this.$message({
              type: 'error',
              message: response.eMsg
            });
          }
          if (this.tableData_7.length == 1) {
            if (this.currentPage_7 == 1) {
              this.currentPageChange_7(this.currentPage_7)
            } else {
              this.currentPageChange_7(this.currentPage_7 - 1)
            }

          } else {
            this.currentPageChange_7(this.currentPage_7)
          }
        })
      },
      search_without_review() {
        this.currentPage_7 = 1
        if (this.search_more_vlue_7.length == 11) {
          let data = {
            "phone": this.search_more_vlue_7,
            "address": "",
            "exchangeType": "",
            "page": 1,
            "pagesize": 10,
            "reviewBatch": "",
            "status": "105"
          }
          this.get_data_7(data, 1)
        } else {
          let data = {
            "phone": "",
            "address": this.search_more_vlue_7,
            "exchangeType": "",
            "page": 1,
            "pagesize": 10,
            "reviewBatch": "",
            "status": "105"
          }
          this.get_data_7(data, 1)
        }
      },


    },
    created() {
      this.getdata_public()
      this.Initialization_data_1()

    }
  }
</script>
<style>
  .wr_all .con_search_div input {
    outline: none;
    border: none;
  }
</style>
<style scoped>
  .el-pagination {
    position: relative;
    float: right;
    margin-right: 3%;
    margin-top: 30px;
    margin-bottom: 50px;
  }

  .item_active {
    color: #800080;
    /*border-bottom: 2px solid #800080 ;*/
    /*padding-bottom: 5px;*/
  }

  .item_active_click {
    color: #800080;
    cursor: pointer;
    /*border-bottom: 2px solid #800080 ;*/
    /*padding-bottom: 5px;*/
  }

  .item_default {
    color: #000000;
  }

  .wr_all {
    width: 100%;
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

  .con_search {
    position: relative;
    width: 70%;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }

  .con_search_div {
    display: flex;
    border-radius: 3px;
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

  .input_fath {
    width: 80%;
    position: relative;
    left: 3%;
  }
</style>
