<template>
  <div class="con">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0">用户树</el-menu-item>
      <el-menu-item index="1">用户列表</el-menu-item>
      <el-menu-item index="2">用户收益</el-menu-item>
      <el-menu-item index="3">投票记录</el-menu-item>
      <el-menu-item index="4">投票记录详情</el-menu-item>
      <el-menu-item index="5">数据统计</el-menu-item>
      <el-menu-item index="6">日期统计</el-menu-item>
      <el-menu-item index="7">王者解锁</el-menu-item>

    </el-menu>
    <div v-show="search_show">
      <el-input v-model="search_address" class="search" placeholder="请输入地址查询"></el-input>
      <el-button type="primary" style="margin-left: 30px" @click="search_add()">查询</el-button>
    </div>
    <div class="show_con" v-show="list[0].is_show">
      <el-button type="warning" @click="getUserTree()" :loading=loading>获取用户树数据</el-button>
      <br/>
      <span style="margin-top: 10px;color: red;display: inline-block;margin-bottom: 10px">若无此需求请勿点击！由于数据量较大耗时较长，有可能使页面卡顿影响使用！</span>
      <el-tree
        :data="tree_data"
        :props="defaultProps"
        @node-click="handleNodeClick"
        :render-content="renderContent"
        :default-expand-all=true
        style="padding: 30px 20px"
        v-loading="loading"
      >

      </el-tree>
    </div>
    <div class="show_con" v-show="list[1].is_show">
      <el-table
        :data="tableData"
        border
        style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
        :header-cell-style="this.tableHeaderColor"
      >
        <el-table-column
          label="用户地址"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户等级"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.level}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户称号"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="自投票数"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.votesSelf}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="下级贡献票数"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.votesContributed}}</span>
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
    <div class="show_con" v-show="list[2].is_show">
      <el-table
        :data="tableData_1"
        border
        style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
        :header-cell-style="this.tableHeaderColor"
      >
        <el-table-column
          label="交易hash"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.hash}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收益"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.profits}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="POS权益加成"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.nodeMultiplier}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="称号权益加成"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.titleMultiplier}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="每票价格"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.votePrice}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="票数"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.votes}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="投票用户地址"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.userAddress}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="时间"
          align="center">
          <template slot-scope="scope">
            <span>{{timestampToTime(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status==0?'创建':scope.row.status==1?'交易成功':'交易失败'}}</span>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        background
        @current-change="currentPageChange_1"
        :current-page="currentPage_1"
        :page-size="pagesize"
        layout="total,prev, pager, next"
        :total="totla_1">
      </el-pagination>
    </div>
    <div class="show_con" v-show="list[3].is_show">
      <el-table
        :data="tableData_2"
        border
        style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
        :header-cell-style="this.tableHeaderColor"
      >
        <el-table-column
          label="投票用户地址"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.userAddress}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="投票数"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.totalVotes}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="弃票数"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.totalVotesAbstained}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="时间"
          align="center">
          <template slot-scope="scope">
            <span>{{timestampToTime(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status==0?'满':scope.row.status==1?'尚有余票':'弃完所有票'}}</span>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        background
        @current-change="currentPageChange_2"
        :current-page="currentPage_2"
        :page-size="pagesize"
        layout="total,prev, pager, next"
        :total="totla_2">
      </el-pagination>
    </div>
    <div class="show_con" v-show="list[4].is_show">
      <el-table
        :data="tableData_3"
        border
        style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
        :header-cell-style="this.tableHeaderColor"
      >
        <el-table-column
          label="ID"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.voteId}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="投票用户地址"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.userAddress}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="上级地址"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.targetAddress}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="投票数"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.votes}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="弃票数"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.votesAbstained}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="应得比例"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.deserveRate}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="时间"
          align="center">
          <template slot-scope="scope">
            <span>{{timestampToTime(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status==0?'满':scope.row.status==1?'尚有余票':'弃完所有票'}}</span>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        background
        @current-change="currentPageChange_3"
        :current-page="currentPage_3"
        :page-size="pagesize"
        layout="total,prev, pager, next"
        :total="totla_3">
      </el-pagination>
    </div>
    <div class="show_con" v-show="list[5].is_show">
      <div class="king_topRow">
          <div>数据将于每日发奖结束后（约18:30）后更新</div>
          <div>
                <el-select v-model="selectKingName" class="select_sty">
                    <el-option
                    v-for="item in kingNameList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="selectNodeType"  class="select_sty">
                    <el-option
                    v-for="item in nodeTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button @click="searchClick" style="width: 100px" type="primary">筛选</el-button>
                
          </div>
      </div>

      <el-table
        :data="tableData_4"
        v-loading="getDataLoading"
        border
        style="width: 100%;margin-bottom: 30px;margin-top: 40px;"
        :header-cell-style="this.tableHeaderColor"
      >
        <el-table-column
          label=""
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.level == 'ALL' ? '总计' : scope.row.level + '级'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          align="center">
          <template slot-scope="scope">
            <span class="to_tr" @click="tkmNumClick(1,scope.row, '1')">{{scope.row.totalUserNum}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="自投票数量"
          align="center">
          <template slot-scope="scope">
            <span class="to_tr" @click="tkmNumClick(1,scope.row, '2')">{{scope.row.votesSelf}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="贡献票数量"
          align="center">
          <template slot-scope="scope">
            <span class="to_tr" @click="tkmNumClick(1,scope.row, '3')">{{scope.row.votesContributed}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="总票数"
          align="center">
          <template slot-scope="scope">
            <span class="to_tr" @click="tkmNumClick(1,scope.row, '4')">{{scope.row.totalVoteNum}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="总计发放TKM数量"
          align="center">
          <template slot-scope="scope">
            <span class="to_tr" @click="tkmNumClick(1,scope.row, '5')">{{scope.row.totalTKMNum}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="show_con" v-show="list[6].is_show">
      <div>
        <el-input v-model="search_days" class="search" placeholder="请输入查询最近天数"></el-input>
        <el-button type="primary" style="margin-left: 30px" @click="search_Days()">查询</el-button>
      </div>
      <el-table
        :data="tableData_5"
        border
        style="width: 100%;margin-bottom: 30px;margin-top: 40px;"
        :header-cell-style="this.tableHeaderColor"
      >
        <el-table-column
          label="日期"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="当日锁定人数"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.voterCount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="当日锁定总量"
          align="center">
          <template slot-scope="scope">
            <span>{{scientificCounting(scope.row.votesIn)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="当日申请提现总量"
          align="center">
          <template slot-scope="scope">
            <span>{{scientificCounting(scope.row.votesOuting)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="当日提现成功总量"
          align="center">
          <template slot-scope="scope">
            <span>{{scientificCounting(scope.row.votesOuted)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
     <div class="show_con" v-show="list[7].is_show">

      <el-table
        :data="tableData_6"
        border
        style="width: 100%;margin-bottom: 30px;margin-top: 40px;"
        :header-cell-style="this.tableHeaderColor"
      >
        <el-table-column
          label="王者地址"
          align="center">
          <template slot-scope="scope">
            <span>{{to_32_decimal(scope.row.address)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="王者手机"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="当前票数"
          align="center">
          <template slot-scope="scope">
            <span>{{parseInt(scope.row.votes)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="目标票数"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.targetVotes}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="达成情况"
          align="center">
          <template slot-scope="scope">
            <span>{{(scope.row.votes > scope.row.targetVotes)&&(scope.row.counttimes > scope.row.tagertTimes) ? '已达成': scope.row.votes > scope.row.targetVotes ?
              scope.row.counttimes + '/' + scope.row.tagertTimes : '未达成'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="解锁数量"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.pledgelockedunlocked}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="单次解锁量"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.weekUnlockVotes}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="已解锁周数"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.unlockedWeeks}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="已解锁数量"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.unlockedVotes}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="50%"
    >
        <div style="padding-bottom: 60px">

        <div class="timeRow">
          <!-- <el-date-picker
            v-model="timeValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker> -->
          <span v-show="this.dialogType == '5'">{{`总计：${this.clickItem.totalTKMNum} TKM`}}</span>
        </div>
        <el-table
          :data="dialogData"
          v-loading="dialogLoading"
          border
          style="width: 100%;margin-top: 20px;"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            label="时间"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.day}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="dialogText"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row[dialogNum]}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="numClickPage"
          :current-page="dialogCurrentPage"
          :page-size="5"
          layout="total,prev, pager, next"
          :total="dialogTotal">
        </el-pagination>
        </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getUsers, getUserTree, getUserProfit, getVote, getVoteDetail, getDataTotalApi, getTimeTotalApi,getKingUnlockApi,
  getDataHistoryApi
  } from '../api/vote'

  export default {

    data() {
      return {
        dialogData: [],
        dialogLoading: false,
        timeValue: '',
        dialogVisible: false,
        selectNodeType: '0',
        selectKingName: '0',
        kingNameList: [
          {value: '0', label: '全部'},
          {value: '普通', label: '普通'},
          {value: '专家', label: '专家'},
          {value: '委员', label: '委员'},
        ],
        nodeTypeList: [
          {value: '0', label: '全部'},
          // {value: '1', label: '普通'},
          {value: '2', label: '共识节点'},
          {value: '3', label: '数据节点'},
        ],
        loading: false,
        activeIndex: '0',
        list: [
          {is_show: true},
          {is_show: false},
          {is_show: false},
          {is_show: false},
          {is_show: false},
          {is_show: false},
          {is_show: false},
          {is_show: false},
        ],
        is_open: 0,
        tree_data: [],
        defaultProps: {
          children: 'children',
          label: 'data'
        },
        search_show: false,
        tableData: [],
        currentPage: 1,
        pagesize: 10,
        totla: 0,
        tableData_1: [],
        currentPage_1: 1,
        totla_1: 0,
        tableData_2: [],
        currentPage_2: 1,
        totla_2: 0,
        tableData_3: [],
        currentPage_3: 1,
        totla_3: 0,
        search_address: '',
        search_value: '',
        tableData_4: [],
        tableData_5: [],
        tableData_6: [],
        getDataLoading: false,
        search_days: '',
        dialogType: '1',
        dialogCurrentPage: 1,
        dialogTotal: 0,
        clickItem: '',
        dialogText: '数量',
        dialogNum: 'userCount'
      };
    },
    created() {
      // this.getUserTree()
    },

    methods: {
      handleSelect(key, keyPath) {
        this.is_open = key
        this.list.forEach((item, index, myself) => {
          if (index == key) {
            item.is_show = true
          } else {
            item.is_show = false
          }
        })
        this.search_show = true
        this.search_address = ''
        this.search_value = ''
        if (key == 0) {
          this.search_show = false
        } else if (key == 1) {
          this.getUsers(1, '')
          this.currentPage = 1
        } else if (key == 2) {
          this.getUserProfit(1)
          this.currentPage_1 = 1
        } else if (key == 3) {
          this.getVote(1)
          this.currentPage_2 = 1
        } else if (key == 4) {
          this.getVoteDetail(1)
          this.currentPage_3 = 1
        } else if (key == 5) {
          this.search_show = false
          this.getDataTotal()
        } else if (key == 6) {
          this.search_show = false
          // this.getTimeTotal()
        } else if (key == 7) {
          this.getKingUnLock()
        }
      },
      handleNodeClick(data) {

      },
      renderContent(h, {node, data}) {
        return (
          < span
      class
        = "custom-tree-node" >
          < span > 等级：<
        /span>
        < span
      class
        = 'widths_1' > {data.data.level} < /span>
          < span > 称号：<
        /span>
        < span
      class
        = 'widths_1' > {data.data.title} < /span>
          < span > 自投票数：<
        /span>
        < span
      class
        = 'widths' > {data.data.votesSelf} < /span>
          < span > 贡献票数：<
        /span>
        < span
      class
        = 'widths' > {data.data.votesContributed} < /span>
          < span > 邀请码：<
        /span>
        < span
      class
        = 'widths' > {data.data.invitecode} < /span>
          < span > 节点地址：<
        /span>
        < span
      class
        = 'widths' > {data.data.address} < /span>
          < /span>
      )
      },

      search_add() {

        if (this.is_open == 1) {
          this.currentPage = 1
          this.getUsers(1, this.search_address)
        } else if (this.is_open == 2) {
          this.currentPage_1 = 1
          this.getUserProfit(1, this.search_address)
        } else if (this.is_open == 3) {
          this.currentPage_2 = 1
          this.getVote(1, this.search_address)
        } else if (this.is_open == 4) {
          this.currentPage_3 = 1
          this.getVoteDetail(1, this.search_address)
        } else if (this.is_open == 7) {
          this.getKingUnLock(this.search_address)
        }
      },
      getUserTree() {
        this.loading = true

        getUserTree().then(response => {
          this.tree_data = response.data
          this.loading = false
        })

      },
      getUsers(e, q) {
        let data = {
          page: e,
          rows: this.pagesize,
          address: q,
        }
        getUsers(data).then(response => {
          if (response.data.data.length != 0 && q != '') {
            this.search_value = q
          } else if (q == '') {
            this.search_value = ''
          }
          this.tableData = response.data.data
          this.totla = response.data.total
        })
      },
      currentPageChange(e) {
        this.currentPage = e
        this.getUsers(this.currentPage, this.search_value)
      },
      getUserProfit(e, q) {
        let data = {
          page: e,
          rows: this.pagesize,
          userAddress: q,

        }
        getUserProfit(data).then(response => {
          if (response.data.data.length != 0 && q != '') {
            this.search_value = q
          } else if (q == '') {
            this.search_value = ''
          }
          this.tableData_1 = response.data.data
          this.totla_1 = response.data.total
        })
      },
      currentPageChange_1(e) {
        this.currentPage_1 = e
        this.getUserProfit(this.currentPage_1, this.search_value)
      },
      getVote(e, q) {
        let data = {
          page: e,
          rows: this.pagesize,
          userAddress: q,
        }
        getVote(data).then(response => {
          if (response.data.data.length != 0 && q != '') {
            this.search_value = q
          } else if (q == '') {
            this.search_value = ''
          }
          this.tableData_2 = response.data.data
          this.totla_2 = response.data.total
        })
      },
      currentPageChange_2(e) {
        this.currentPage_2 = e
        this.getVote(this.currentPage_2, this.search_value)
      },
      getVoteDetail(e, q) {
        let data = {
          page: e,
          rows: this.pagesize,
          userAddress: q,
        }
        getVoteDetail(data).then(response => {
          if (response.data.data.length != 0 && q != '') {
            this.search_value = q
          } else if (q == '') {
            this.search_value = ''
          }
          this.tableData_3 = response.data.data
          this.totla_3 = response.data.total
        })
      },
      currentPageChange_3(e) {
        this.currentPage_3 = e
        this.getVoteDetail(this.currentPage_3, this.search_value)
      },
      search_Days(){
          this.getTimeTotal()
      },
      numClickPage(e) {
        this.dialogCurrentPage = e
        this.tkmNumClick(this.dialogCurrentPage, this.clickItem, this.dialogType)
      },
      tkmNumClick(page, item, type){
        this.clickItem = item;
        this.dialogType = type;
        this.dialogText = type == '1' ? '数量' : type == '2' ? '自投票数量' : type == '3' ? '贡献票数量' : type == '4' ? '总票数' : '总计发放TKM数量';
        this.dialogNum = type == '1' ? 'userCount' : type == '2' ? 'votesSelf' : type == '3' ? 'votesContributed' : type == '4' ? 'votesTotal' : 'profit';
        this.dialogVisible = true;
        this.dialogLoading = true;
        let data = {
          level: item.level,
          page: page,
          rows: 5,
        }
        getDataHistoryApi(data).then(response => {
          this.dialogData = response.data.data;
          this.dialogTotal = response.data.total;
          this.dialogLoading = false;
        })
      },
      searchClick(){
        this.getDataTotal()
      },
      getDataTotal() {
        let title = this.selectKingName == '0' ? '' : this.selectKingName;
        let nodeType = this.selectNodeType == '2' ? 0 : this.selectNodeType == '3' ? 1 : ''
        let data = {
          title: title,
          nodeType: nodeType,
        }
        this.getDataLoading = true;
        getDataTotalApi(data).then(response => {
          this.tableData_4 = response.data;
          this.getDataLoading = false;
        })
      },
      getTimeTotal() {
        if(!this.search_days){
          return;
        }
        let data = {
          days: this.search_days,
        }
        getTimeTotalApi(data).then(response => {
          this.tableData_5 = response.data
        })
      },
      getKingUnLock(q) {
        let data = {
          address: q,
        }
        getKingUnlockApi(data).then(response => {
          if (response.data.length != 0 && q != '') {
            this.search_value = q
          } else if (q == '') {
            this.search_value = ''
          }
          this.tableData_6 = response.data
        })
      },
    }
  };
</script>
<style>
  .timeRow{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .to_tr{
    cursor: pointer;
    color: blue
  }
  .select_sty{
    margin-right: 50px;
  }
  .king_topRow{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .widths {
    display: inline-block;
    min-width: 80px;
    color: #800080;
  }

  .widths_1 {
    display: inline-block;
    min-width: 40px;
    color: #800080;
  }
</style>
<style scoped>
  .search {
    width: 30%;
    margin-top: 30px;
  }

  .con {
    /*width: 90%;*/
    /*margin: 2% 5%;*/
  }

  .show_con {
    margin-top: 30px;
  }

  .el-pagination {
    position: relative;
    float: right;
    margin-right: 3%;
    margin-top: 30px;
    margin-bottom: 50px;
  }

</style>
