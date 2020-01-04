<template>
  <div class="rr_all">
    <div class="index_table_swith">
      <div
        class="table_item"
        @click="swich_tab(index)"
        v-for="(list, index) in table_items"
        :class="index== isactive ? item_active :'item_default'"
      >{{list.name}}</div>
    </div>
    <div class="part_1" v-show="part_show[0].isShow">
      <div class="con_search">
        <div class="con_search_div">
          <span class="el-icon-search us_search2_1_input_icon"></span>
          <div class="input_fath">
            <el-input v-model="search" placeholder="请输入用户手机号进行检索"></el-input>
          </div>
        </div>
        <el-button type="primary" class="con_search_submit" @click="search_phone()">搜索</el-button>
        <el-select
          style="margin-left: 5%"
          v-model="value1"
          @change="change_user_source()"
          placeholder="请选择用户来源"
        >
          <el-option
            v-for="item in options1"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId"
          ></el-option>
        </el-select>

        <el-select
          style="margin-left: 5%"
          v-model="value2"
          @change="change_arrive()"
          placeholder="请选择是否到账"
        >
          <el-option
            v-for="item in options2"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId"
          ></el-option>
        </el-select>
        <el-select
          style="margin-left: 5%"
          v-model="value3"
          @change="change_backstage_payment()"
          placeholder="请选择是否后台打款"
        >
          <el-option
            v-for="item in options3"
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
          <el-table-column label="打款时间" align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.timestamp)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户来源" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.exchangeTypeName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户手机号" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column label="充值数量" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.amount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否已到账" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.status==1?'是':'否'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否重试过" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.reTry==1?'是':'否'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否后台打款" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.backgroundPlay==1?'是':'否'}}</span>
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
    <div class="part_2" v-show="part_show[1].isShow">
      <div class="con_search" style="width: 60%">
        <div class="con_search_div">
          <span class="el-icon-search us_search2_1_input_icon"></span>
          <div class="input_fath">
            <el-input v-model="search_1" placeholder="请输入用户手机号进行检索"></el-input>
          </div>
        </div>
        <el-button
          type="primary"
          class="con_search_submit"
          style="margin-left: -15%"
          @click="search_phone_1()"
        >搜索</el-button>
        <el-select
          style="left: -12%;position: relative"
          v-model="select_value"
          @change="change_user_source_1()"
          placeholder="请选择用户来源"
        >
          <el-option
            v-for="item in part2_options1"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId"
          ></el-option>
        </el-select>
      </div>
      <div class="con_table">
        <el-table
          :data="tableData_1"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column label="打款时间" align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.timestamp)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户来源" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.exchangeTypeName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户手机号" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column label="充值数量" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.amount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否已到账" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.status==1?'是':'否'}}</span>
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
        ></el-pagination>
      </div>
    </div>
    <div class="part_3" v-show="part_show[2].isShow">
      <div class="con_search" style="width: 60%">
        <div class="con_search_div">
          <span class="el-icon-search us_search2_1_input_icon"></span>
          <div class="input_fath">
            <el-input v-model="search_2" placeholder="请输入用户手机号进行检索"></el-input>
          </div>
        </div>
        <el-button
          type="primary"
          class="con_search_submit"
          style="margin-left: -15%"
          @click="search_phone_2()"
        >搜索</el-button>
        <el-select
          style="left: -12%;position: relative"
          v-model="select_value_1"
          @change="change_user_source_2()"
          placeholder="请选择用户来源"
        >
          <el-option
            v-for="item in part2_options2"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId"
          ></el-option>
        </el-select>
      </div>
      <div class="con_table">
        <el-table
          :data="tableData_2"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column label="打款时间" align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.timestamp)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户来源" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.exchangeTypeName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户手机号" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column label="充值数量" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.amount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否已到账" align="center">
            <template slot-scope="scope">
              <span>{{status_is_one(scope.row.status)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <span
                class="operating"
                v-show="scope.row.status===0"
                @click="retry(scope.row.hash,scope.row.Id)"
              >重试</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="currentPageChange_2"
          :current-page="currentPage_2"
          :page-size="pagesize_2"
          layout="total,prev, pager, next"
          :total="totla_2"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getAcceptRecord, getExchangeType, reTryPlay } from "../api/interface";

export default {
  name: "rechargeRecord",
  data() {
    return {
      save_search_value: "",
      save_search_value_1: "",
      save_search_value_2: "",
      part_show: [{ isShow: true }, { isShow: false }, { isShow: false }],
      is_show: [{ is_true: true }, { is_true: false }, { is_true: false }],
      isactive: 0,
      item_active: "item_active",
      item_default: "item_default",
      table_items: [
        { name: " 总表 " },
        { name: " 已到账 " },
        { name: " 未到账 " }
      ],
      tableData: [],
      tableData_1: [],
      tableData_2: [],
      search: "",
      search_1: "",
      search_2: "",
      options1: [
        {
          typeId: "",
          typeName: "请选择用户来源",
          address: ""
        }
      ],
      part2_options1: [
        {
          typeId: "",
          typeName: "请选择用户来源",
          address: ""
        }
      ],
      part2_options2: [
        {
          typeId: "",
          typeName: "请选择用户来源",
          address: ""
        }
      ],
      options2: [
        {
          typeId: "",
          typeName: "请选择是否到账",
          address: ""
        },
        {
          typeId: "1",
          typeName: "已到账",
          address: ""
        },
        {
          typeId: "0",
          typeName: "未到账",
          address: ""
        }
      ],
      options3: [
        {
          typeId: "",
          typeName: "请选择是否后台打款",
          address: ""
        },
        {
          typeId: "1",
          typeName: "是",
          address: ""
        },
        {
          typeId: "0",
          typeName: "否",
          address: ""
        }
      ],
      value1: "",
      value2: "",
      value3: "",
      currentPage: 1,
      pagesize: 10,
      totla: 0,
      currentPage_1: 1,
      pagesize_1: 10,
      totla_1: 0,
      currentPage_2: 1,
      pagesize_2: 10,
      totla_2: 0,
      select_value: "",
      select_value_1: "",
      repeat_click: ""
    };
  },
  methods: {
    status_is_one(e) {
      let a = "";
      if (e === -1) {
        a = "等待充值";
      } else if (e === 0) {
        a = "失败";
      } else if (e === 1) {
        a = "成功";
      } else if (e === 2) {
        a = "已充值等待验证";
      }
      return a;
    },
    change_user_source() {
      let data = {
        phone: this.save_search_value,
        address: "",
        exchangeType: this.value1,
        backgroundPlay: this.value3,
        status: this.value2,
        page: 1,
        pageSize: 10
      };
      this.getdata(data, 0);
      this.currentPage = 1;
    },
    change_arrive() {
      let data = {
        phone: this.save_search_value,
        address: "",
        exchangeType: this.value1,
        backgroundPlay: this.value3,
        status: this.value2,
        page: 1,
        pageSize: 10
      };
      this.getdata(data, 0);
      this.currentPage = 1;
    },
    change_backstage_payment() {
      let data = {
        phone: this.save_search_value,
        address: "",
        exchangeType: this.value1,
        backgroundPlay: this.value3,
        status: this.value2,
        page: 1,
        pageSize: 10
      };
      this.getdata(data, 0);
      this.currentPage = 1;
    },
    get_user_source() {
      getExchangeType().then(response => {
        this.options1 = this.options1.concat(response.data);
        this.part2_options1 = this.part2_options1.concat(response.data);
        this.part2_options2 = this.part2_options2.concat(response.data);
      });
    },
    initialization_data() {
      let data = {
        phone: "",
        address: "",
        exchangeType: "",
        backgroundPlay: "",
        status: "",
        page: 1,
        pageSize: 10
      };
      this.getdata(data, 0);
    },
    getdata(e, q, type) {
      getAcceptRecord(e).then(response => {
        if (response.data.dataList == []) {
          if (q == 0) {
            this.tableData = [];
            this.totla = response.data.total;
          } else if (q == 1) {
            this.tableData_1 = [];
            this.totla_1 = response.data.total;
          } else if (q == 2) {
            this.tableData_2 = [];
            this.totla_2 = response.data.total;
          }
        } else {
          // for (var i=0;i<response.data.dataList.length;i++){
          //   for (var e=0;e<this.options1.length;e++){
          //     if(response.data.dataList[i].exchangeType==this.options1[e].typeId){
          //       response.data.dataList[i].sourcestype=this.options1[e].typeName
          //     }
          //   }
          // }
          // console.log(response.data.dataList)
          if (q == 0) {
            this.tableData = response.data.dataList;
            this.totla = response.data.total;
            this.save_search_value = this.search;
          } else if (q == 1) {
            this.tableData_1 = response.data.dataList;
            this.totla_1 = response.data.total;
            this.save_search_value_1 = this.search_1;
          } else if (q == 2) {
            this.tableData_2 = response.data.dataList;
            this.totla_2 = response.data.total;
            this.save_search_value_2 = this.search_2;
          }
        }
      });
    },
    swich_tab(e) {
      this.is_show.forEach((item, index, self) => {
        if (index == e) {
          item.is_true = true;
        } else {
          item.is_true = false;
        }
      });
      this.part_show.forEach((item, index, self) => {
        if (index == e) {
          item.isShow = true;
        } else {
          item.isShow = false;
        }
      });
      this.isactive = e;
      if (e == 0) {
        let data = {
          phone: "",
          address: "",
          exchangeType: "",
          backgroundPlay: "",
          status: "",
          page: 1,
          pageSize: 10
        };
        this.getdata(data, 0);
      } else if (e == 1) {
        let data = {
          phone: "",
          address: "",
          exchangeType: "",
          backgroundPlay: "",
          status: "1",
          page: 1,
          pageSize: 10
        };
        this.getdata(data, 1);
      } else if (e == 2) {
        let data = {
          phone: "",
          address: "",
          exchangeType: "",
          backgroundPlay: "",
          status: "0",
          page: 1,
          pageSize: 10
        };
        this.getdata(data, 2);
      }
      this.currentPage = 1;
      this.currentPage_1 = 1;
      this.currentPage_2 = 1;
      this.search = "";
      this.search_1 = "";
      this.search_2 = "";
      this.value1 = "";
      this.value2 = "";
      this.value3 = "";
      this.select_value = "";
      this.select_value_1 = "";
    },
    search_phone() {
      this.value1 = "";
      this.value2 = "";
      this.value3 = "";
      this.currentPage = 1;
      let data = {
        phone: this.search,
        address: "",
        exchangeType: "",
        backgroundPlay: "",
        status: "",
        page: 1,
        pageSize: 10
      };
      this.getdata(data, 0);
    },
    currentPageChange(e) {
      this.currentPage = e;
      let data = {
        phone: this.save_search_value,
        address: "",
        exchangeType: this.value1,
        backgroundPlay: this.value3,
        status: this.value2,
        page: this.currentPage,
        pageSize: 10
      };
      this.getdata(data, 0);
    },
    search_phone_1() {
      this.select_value = "";
      this.currentPage_1 = 1;
      let data = {
        phone: this.search_1,
        address: "",
        exchangeType: "",
        backgroundPlay: "",
        status: "1",
        page: 1,
        pageSize: 10
      };
      this.getdata(data, 1);
    },
    currentPageChange_1(e) {
      this.currentPage_1 = e;
      let data = {
        phone: this.save_search_value_1,
        address: "",
        exchangeType: this.select_value,
        backgroundPlay: "",
        status: "1",
        page: this.currentPage_1,
        pageSize: 10
      };
      this.getdata(data, 1);
    },
    change_user_source_1() {
      let data = {
        phone: this.save_search_value_1,
        address: "",
        exchangeType: this.select_value,
        backgroundPlay: "",
        status: "1",
        page: 1,
        pageSize: 10
      };
      this.getdata(data, 1);
      this.currentPage_1 = 1;
    },
    change_user_source_2() {
      let data = {
        phone: this.save_search_value_2,
        address: "",
        exchangeType: this.select_value_1,
        backgroundPlay: "",
        status: "0",
        page: 1,
        pageSize: 10
      };
      this.getdata(data, 2);
      this.currentPage_2 = 1;
    },
    currentPageChange_2(e) {
      this.currentPage_2 = e;
      let data = {
        phone: this.save_search_value_2,
        address: "",
        exchangeType: this.select_value_1,
        backgroundPlay: "",
        status: "0",
        page: this.currentPage_2,
        pageSize: 10
      };
      this.getdata(data, 2);
    },
    retry(e, q) {
      if (this.repeat_click == "") {
        this.repeat_click = q;
        let data = { hash: e, id: q };
        reTryPlay(data).then(response => {
          if (response.eCode == 200) {
            this.repeat_click = "";
            this.$message({
              message: "已进行重试操作",
              type: "success"
            });
            let data = {
              phone: this.save_search_value_2,
              address: "",
              exchangeType: this.select_value_1,
              backgroundPlay: "",
              status: "0",
              page: this.currentPage_2,
              pageSize: 10
            };
            this.getdata(data, 2);
          } else {
            this.repeat_click = "";
            this.$message({
              message: "进行重试操作失败！",
              type: "error"
            });
          }
        });
      } else {
      }
    },
    search_phone_2() {
      this.select_value_1 = "";
      let data = {
        phone: this.search_2,
        address: "",
        exchangeType: "",
        backgroundPlay: "",
        status: "0",
        page: 1,
        pageSize: 10
      };
      this.getdata(data, 2);
      this.currentPage_2 = 1;
    }
  },
  created() {
    this.initialization_data();
    this.get_user_source();
  }
};
</script>
<style>
.rr_all .con_search_div input {
  outline: none;
  border: none;
}
</style>
<style scoped>
.rr_all {
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
