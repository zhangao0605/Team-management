<template>
  <div class="pos_m">
    <el-dialog width="50%" center title="累计收益明细" :visible.sync="dialogTableVisible">
      <el-table
        :data="alert_tabledate"
        :header-cell-style="this.tableHeaderColor"
        style="margin-bottom:50px"
      >
        >
        <el-table-column align="center" label="收益发放时间">
          <template slot-scope="scope">
            <span>{{timestampToTime(scope.row.timestamp)}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="收益发放理由">
          <template slot-scope="scope">
            <span>{{scientificCounting(scope.row.value)}}</span>
          </template>
        </el-table-column>-->
        <el-table-column align="center" label="出块数">
          <template slot-scope="scope">
            <span>{{scope.row.height}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="收益金额">
          <template slot-scope="scope">
            <span>{{scientificCounting(scope.row.value)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="交易hash">
          <template slot-scope="scope">
            <span>{{slice_hash(scope.row.hash)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="currentPageChange_1"
        :current-page="currentPage_1"
        :page-size="pagesize_1"
        layout="total,prev, pager, next"
        :total="total_1"
        style="margin-top:-30px"
      ></el-pagination>
    </el-dialog>
    <div class="con_search" style="width: 30%">
      <div class="con_search_div" style="width:70%">
        <span class="el-icon-search us_search2_1_input_icon"></span>
        <div class="input_fath">
          <el-input v-model="search_ip" placeholder="请输入节点IP进行检索"></el-input>
        </div>
      </div>
      <el-button
        type="primary"
        class="con_search_submit"
        style="margin-left: -15%"
        @click="sea_ip()"
      >搜索</el-button>
      <!-- <el-select
        style="left: -12%;position: relative"
        v-model="select_value"
        @change="filter()"
        placeholder="请选择用户来源"
      >
        <el-option
          v-for="item in options"
          :key="item.typeId"
          :label="item.typeName"
          :value="item.typeId"
        ></el-option>
      </el-select>-->
    </div>
    <div class="con_table">
      <el-table
        :data="tableData"
        border
        style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
        :header-cell-style="this.tableHeaderColor"
      >
        <el-table-column label="节点IP" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.ip}}</span>
          </template>
        </el-table-column>
        <el-table-column label="节点类型" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.nodeType=='0'?'共识节点':'数据节点'}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="是否已绑定账户" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.phone}}</span>
          </template>
        </el-table-column>-->
        <el-table-column label="绑定时间" align="center">
          <template slot-scope="scope">
            <span>{{timestampToTime(scope.row.bindTimestamp)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="绑定地址" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column label="合约地址" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.contractAddress}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="绑定合约" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.amount}}</span>
          </template>
        </el-table-column>-->
        <!-- <el-table-column label="是否已锁定资金" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.amount}}</span>
          </template>
        </el-table-column>-->
        <el-table-column label="锁定时间" align="center">
          <template slot-scope="scope">
            <span>{{timestampToTime(scope.row.lockTimestamp)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="锁定数量" align="center">
          <template slot-scope="scope">
            <span>{{scientificCounting(scope.row.balance)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="累计收益（TUE）" align="center">
          <template slot-scope="scope">
            <span
              class="table_item"
              @click="see_detail(scope.row.address)"
            >{{scientificCounting(scope.row.miningEarnings)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="currentPageChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total,prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getposnodeinfo, getblocktxlist } from "../api/interface";
export default {
  name: "pos",
  components: {},
  data() {
    return {
      dialogTableVisible: false,
      currentPage: 1,
      pagesize: 10,
      total: 0,
      currentPage_1: 1,
      pagesize_1: 10,
      total_1: 0,
      search_ip: "",
      search_ip_recode: "",
      select_value: "",
      options: [
        {
          typeId: "",
          typeName: "全部MTO"
        },
        {
          typeId: "0",
          typeName: "未发行MTO"
        },
        {
          typeId: "1",
          typeName: "已发行MTO"
        }
      ],
      tableData: [],
      alert_tabledate: [],
      detail_address: ""
    };
  },
  methods: {
    getdata(e) {
      getposnodeinfo(e).then(response => {
        if (response.data.dataList == []) {
          this.tableData = [];
          this.total = 0;
        } else {
          this.tableData = response.data.dataList;
          this.total = response.data.total;
          if (arguments.length == 2) {
            this.search_ip_recode = this.search_ip;
          }
        }
      });
    },
    Initialization_data() {
      let data = { page: 1, pageSize: 10, ip: "", address: "" };
      this.getdata(data);
    },
    currentPageChange(e) {
      this.currentPage = e;
      let data = {
        page: this.currentPage,
        pageSize: 10,
        ip: this.search_ip_recode,
        address: ""
      };
      this.getdata(data);
    },

    sea_ip() {
      this.currentPage = 1;
      let data = {
        page: 1,
        pageSize: 10,
        ip: this.search_ip,
        address: ""
      };
      this.getdata(data, 1);
    },

    currentPageChange_1(e) {
      this.currentPage_1 = e;
      let data = {
        page: this.currentPage_1,
        pageSize: 10,
        address: this.detail_address
      };
      getblocktxlist(data).then(response => {
        if (response.data.dataList == []) {
          this.alert_tabledate = [];
          this.total_1 = 0;
        } else {
          this.alert_tabledate = response.data.dataList;
          this.total_1 = response.data.total;
        }
      });
    },
    see_detail(e) {
      this.detail_address = e;
      this.currentPage_1 = 1;
      let data = {
        page: 1,
        pageSize: 10,
        address: e
      };
      getblocktxlist(data).then(response => {
        if (response.data.dataList == []) {
          this.alert_tabledate = [];
          this.total_1 = 0;
        } else {
          this.alert_tabledate = response.data.dataList;
          this.total_1 = response.data.total;
        }
        this.dialogTableVisible = true;
      });
    }
  },
  created() {
    this.Initialization_data();
  },
  mounted() {},
  computed: {}
};
</script>

<style>
.pos_m .con_search_div input {
  outline: none;
  border: none;
}
</style>
<style  scoped>
.pos_m {
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
  color: #800080;
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

.con_search_div {
  border-radius: 3px;
  display: flex;
  width: 40%;
  background-color: #ffffff;
}

.con_search {
  position: relative;
  width: 70%;
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
}

.us_search2_1_input_icon {
  position: relative;
  left: 14px;
  margin-top: 12px;
  z-index: 1;
}

.input_fath {
  width: 90%;
  position: relative;
  left: 3%;
}
</style>