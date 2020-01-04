<template>
  <div class="pos_m">
    <el-dialog width="50%" center title="累计收益明细" :visible.sync="dialogTableVisible">
      <el-table
        :data="alert_tabledate"
        :header-cell-style="this.tableHeaderColor"
        style="margin-bottom:30px"
      >
        <el-table-column align="center" label="收益发放时间">
          <template slot-scope="scope">
            <span>{{scientificCounting(scope.row.value)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="收益发放理由">
          <template slot-scope="scope">
            <span>{{scientificCounting(scope.row.value)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="出块数">
          <template slot-scope="scope">
            <span>{{scientificCounting(scope.row.value)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="收益金额">
          <template slot-scope="scope">
            <span>{{timestampToTime(scope.row.timestamp)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="交易hash">
          <template slot-scope="scope">
            <span>{{scientificCounting(scope.row.value)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <div class="con_search" style="width: 60%">
      <div class="con_search_div">
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
      <el-select
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
      </el-select>
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
            <span>{{timestampToTime(scope.row.timestamp)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="节点类型" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.exchangeTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否已绑定账户" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column label="绑定时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.amount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="绑定地址" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.amount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="绑定合约" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.amount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否已锁定资金" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.amount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="锁定时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.amount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="锁定数量" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.amount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="累计收益（TUE）" align="center">
          <template slot-scope="scope">
            <span class="table_item" @click="see_detail(scope.row.id)">{{scope.row.amount}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="currentPageChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total,prev, pager, next"
        :total="totla"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "pos",
  components: {},
  data() {
    return {
      dialogTableVisible: false,
      currentPage: 1,
      pagesize: 10,
      totla: 0,
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
      tableData: [
        { amount: 10 },
        { amount: 10 },
        { amount: 10 },
        { amount: 10 }
      ],
      alert_tabledate: [
        { amount: 10 },
        { amount: 10 },
        { amount: 10 },
        { amount: 10 }
      ]
    };
  },
  methods: {
    getdata(e) {
      nodeInfo(e).then(response => {
        if (response.dataList == []) {
          this.tableData = [];
          this.totla = 0;
        } else {
          this.tableData = response.dataList;
          this.totla = response.total;
          if (arguments.length == 2) {
            this.search_ip_recode = this.search_ip;
          }
        }
      });
    },
    currentPageChange(e) {
      this.currentPage = e;
      let data = {};
      this.getdata(data);
    },
    sea_ip() {
      let data = {};
      console.log(this.search_ip);
      this.getdata(data, 1);
    },
    filter() {
      console.log(this.select_value);
    },
    see_detail() {
      this.dialogTableVisible = true;
    }
  },
  created() {},
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