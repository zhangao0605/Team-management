<template>
  <div class="cc_con">
    <div class="index_table_swith">
      <div class="table_item" @click="swich_tab(index)" v-for="(list, index) in table_items"
           :class="index== isactive ? item_active :'item_default'">{{list.name}}
      </div>
    </div>
    <div class="ws_con_1" v-show="is_show[0].is_true">
      <div class="con_search">
        <div class="con_search_div">
          <span class="el-icon-search us_search2_1_input_icon"></span>
          <div class="input_fath">
            <el-input v-model="search_phone_1"
                      placeholder="请输入用户手机号进行检索">
            </el-input>
          </div>
        </div>
        <el-button type="primary" class="con_search_submit" @click="search_phone1()">搜索
        </el-button>
      </div>
      <div class="con_table">
        <el-table
          :data="tableData_1"
          border
          style="width: 65%;margin-bottom: 30px;margin-top: 20px;min-height: 253px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            label="绑定时间"
            align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.time)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.value}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="芯客手机号"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.value}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        @current-change="currentPageChange_1"
        :current-page="currentPage_1"
        :page-size="pagesize_1"
        layout="total,prev, pager, next"
        :total="totla_1">
      </el-pagination>
    </div>
    <div class="ws_con_2" v-show="is_show[1].is_true">
      <div class="con_search">
        <div class="con_search_div">
          <span class="el-icon-search us_search2_1_input_icon"></span>
          <div class="input_fath">
            <el-input v-model="search_phone_2"
                      placeholder="请输入用户手机号/用户地址进行检索">
            </el-input>
          </div>
        </div>
        <el-button type="primary" class="con_search_submit" @click="search_phone2()">搜索
        </el-button>
      </div>
      <div class="con_table">
        <el-table
          :data="tableData_2"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 20px;min-height: 253px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            label="充值时间"
            align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.time)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.value}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户手机号"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.value}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="充值数量"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.value}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="是否返回成功"
            align="center">
            <template slot-scope="scope">
              <span>{{is_success(scope.row.issuccess)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        @current-change="currentPageChange_2"
        :current-page="currentPage_2"
        :page-size="pagesize_2"
        layout="total,prev, pager, next"
        :total="totla_2">
      </el-pagination>
    </div>
    <div class="ws_con_3" v-show="is_show[2].is_true">
      <div class="index_table_swith_1">
        <div class="table_item" @click="swich_tab_1(index)" v-for="(list, index) in table_items_1"
             :class="index== isactive_1 ? item_active :'item_default'">{{list.name}}
        </div>
      </div>
      <div class="ws_con_1" v-show="is_show_1[0].is_true">
        <div class="con_search">
          <div class="con_search_div">
            <span class="el-icon-search us_search2_1_input_icon"></span>
            <div class="input_fath">
              <el-input v-model="search_phone_3"
                        placeholder="请输入用户手机号进行检索">
              </el-input>
            </div>
          </div>
          <el-button type="primary" class="con_search_submit" @click="search_phone3()">搜索
          </el-button>
        </div>
        <div class="con_table">
          <el-table
            :data="tableData_3"
            border
            style="width: 100%;margin-bottom: 30px;margin-top: 20px;min-height: 253px"
            :header-cell-style="this.tableHeaderColor"
          >
            <el-table-column
              label="提现时间"
              align="center">
              <template slot-scope="scope">
                <span>{{timestampToTime(scope.row.time)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="用户手机号"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="在我方的对应地址"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="提现数量"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="是否已到账"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="是否已重试"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          @current-change="currentPageChange_3"
          :current-page="currentPage_3"
          :page-size="pagesize_3"
          layout="total,prev, pager, next"
          :total="totla_3">
        </el-pagination>
      </div>
      <div class="ws_con_2" v-show="is_show_1[1].is_true">
        <div class="con_search">
          <div class="con_search_div">
            <span class="el-icon-search us_search2_1_input_icon"></span>
            <div class="input_fath">
              <el-input v-model="search_phone_4"
                        placeholder="请输入用户手机号进行检索">
              </el-input>
            </div>
          </div>
          <el-button type="primary" class="con_search_submit" @click="search_phone4()">搜索
          </el-button>
        </div>
        <div class="con_table">
          <el-table
            :data="tableData_4"
            border
            style="width: 100%;margin-bottom: 30px;margin-top: 20px;min-height: 253px"
            :header-cell-style="this.tableHeaderColor"
          >
            <el-table-column
              label="提现时间"
              align="center">
              <template slot-scope="scope">
                <span>{{timestampToTime(scope.row.time)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="用户手机号"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="在我方的对应地址"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="提现数量"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="是否已到账"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          @current-change="currentPageChange_4"
          :current-page="currentPage_4"
          :page-size="pagesize_4"
          layout="total,prev, pager, next"
          :total="totla_4">
        </el-pagination>
      </div>
      <div class="ws_con_3" v-show="is_show_1[2].is_true">
        <div class="con_search">
          <div class="con_search_div">
            <span class="el-icon-search us_search2_1_input_icon"></span>
            <div class="input_fath">
              <el-input v-model="search_phone_5"
                        placeholder="请输入用户手机号进行检索">
              </el-input>
            </div>
          </div>
          <el-button type="primary" class="con_search_submit" @click="search_phone5()">搜索
          </el-button>
        </div>
        <div class="con_table">
          <el-table
            :data="tableData_5"
            border
            style="width: 100%;margin-bottom: 30px;margin-top: 20px;min-height: 253px"
            :header-cell-style="this.tableHeaderColor"
          >
            <el-table-column
              label="提现时间"
              align="center">
              <template slot-scope="scope">
                <span>{{timestampToTime(scope.row.time)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="用户手机号"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="在我方的对应地址"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="提现数量"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="是否已到账"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center">
              <template slot-scope="scope">
                <span class="is_ac" @click="edit_rule(0)">重试</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
    <div class="ws_con_4" v-show="is_show[3].is_true">
      <div class="index_table_swith_1">
        <div class="table_item" @click="swich_tab_2(index)" v-for="(list, index) in table_items_2"
             :class="index== isactive_2 ? item_active :'item_default'">{{list.name}}
        </div>
      </div>
      <div class="ws_con_1" v-show="is_show_2[0].is_true">
        <div class="con_search">
          <div class="con_search_div">
            <span class="el-icon-search us_search2_1_input_icon"></span>
            <div class="input_fath">
              <el-input v-model="search_phone_6"
                        placeholder="请输入用户手机号进行检索">
              </el-input>
            </div>
          </div>
          <el-button type="primary" class="con_search_submit" @click="search_phone6()">搜索
          </el-button>
        </div>
        <div class="con_table">
          <el-table
            :data="tableData_6"
            border
            style="width: 100%;margin-bottom: 30px;margin-top: 20px;min-height: 253px"
            :header-cell-style="this.tableHeaderColor"
          >
            <el-table-column
              label="提现时间"
              align="center">
              <template slot-scope="scope">
                <span>{{timestampToTime(scope.row.time)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="请求ID"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="请求币种"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="请求数量"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="是否同意"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="内部转账是否完成"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="转账hash"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center">
              <template slot-scope="scope">
                <span class="is_ac" @click="marketing_retry(0)">转账重试</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          @current-change="currentPageChange_6"
          :current-page="currentPage_6"
          :page-size="pagesize_6"
          layout="total,prev, pager, next"
          :total="totla_6">
        </el-pagination>
      </div>
      <div class="ws_con_2" v-show="is_show_2[1].is_true">
        <div class="con_search">
          <div class="con_search_div">
            <span class="el-icon-search us_search2_1_input_icon"></span>
            <div class="input_fath">
              <el-input v-model="search_phone_7"
                        placeholder="请输入用户手机号进行检索">
              </el-input>
            </div>
          </div>
          <el-button type="primary" class="con_search_submit" @click="search_phone7()">搜索
          </el-button>
        </div>
        <div class="con_table">
          <el-table
            :data="tableData_7"
            border
            style="width: 100%;margin-bottom: 30px;margin-top: 20px;min-height: 253px"
            :header-cell-style="this.tableHeaderColor"
          >
            <el-table-column
              label="请求时间"
              align="center">
              <template slot-scope="scope">
                <span>{{timestampToTime(scope.row.time)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="请求ID"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="请求数量"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="是否同意"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="内部转账是否完成"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="转账hash"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center">
              <template slot-scope="scope">
                <span class="is_ac" @click="rebate(0)">转账重试</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
  export default {
    name: "coreCustomer",
    data() {
      return {
        table_items: [
          {"name": ' 芯客绑定 '},
          {"name": ' 向芯客充值 '},
          {"name": ' 从芯客提现 '},
          {"name": ' 芯客营销及返利费用 '},
        ],
        table_items_1: [
          {"name": ' 总表 '},
          {"name": ' 已到账 '},
          {"name": ' 未到账 '},
        ],
        table_items_2: [
          {"name": ' 营销费用请求 '},
          {"name": ' 返利费用请求 '},
        ],
        isactive: 0,
        isactive_1: 0,
        isactive_2: 0,
        item_active: 'item_active',
        item_default: 'item_default',
        is_show: [
          {"is_true": true},
          {"is_true": false},
          {"is_true": false},
          {"is_true": false},
        ],
        is_show_1: [
          {"is_true": true},
          {"is_true": false},
          {"is_true": false},
        ],
        is_show_2: [
          {"is_true": true},
          {"is_true": false},
        ],
        search_phone_1: '',
        search_phone_2: '',
        search_phone_3: '',
        search_phone_4: '',
        search_phone_5: '',
        search_phone_6: '',
        search_phone_7: '',
        tableData_1: [
          {'name': 'za', 'value': '1111111', 'time': '1573197990'},
        ],
        tableData_2: [
          {'name': 'za', 'value': '1111111', 'time': '1573197990', 'issuccess': 0},
        ],
        tableData_3: [
          {'name': 'za', 'value': '1111111', 'time': '1573197990', 'issuccess': 0},
        ],
        tableData_4: [
          {'name': 'za', 'value': '1111111', 'time': '1573197990', 'issuccess': 0},
        ],
        tableData_5: [
          {'name': 'za', 'value': '1111111', 'time': '1573197990', 'issuccess': 0},
        ],
        tableData_6: [
          {'name': 'za', 'value': '1111111', 'time': '1573197990', 'issuccess': 0},
        ],
        tableData_7: [
          {'name': 'za', 'value': '1111111', 'time': '1573197990', 'issuccess': 0},
        ],
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
      }
    },
    methods: {
      swich_tab(e) {
        this.isactive = e
        if (e == 0) {
          this.Initialization_data_1()
        } else if (e == 1) {

        }
        this.is_show.forEach((item, index, self) => {
          if (index == e) {
            item.is_true = true
          } else {
            item.is_true = false
          }
        })

      },
      getdata_1(e) {
        // getNodeSettingNew(e).then(response => {
        //   if (response.data == []) {
        //     this.tableData_1 = []
        //   } else {
        //     this.tableData_1 = response.data
        //   }
        // })
      },
      Initialization_data_1() {
        this.currentPage_1 = 1
        this.search_phone_1 = ''
        // let data = {"status": "", "page": 1, "pageSize": 10}
        // this.getdata_1(data)
      },
      search_phone1() {
        this.currentPage_1 = 1
        console.log(this.search_phone_1)
        let data = {'phone': this.search_phone_1}
      },
      currentPageChange_1(e) {
        this.currentPage_1 = e
      },
      search_phone2() {

      },
      currentPageChange_2(e) {
        this.currentPage_2 = e
      },
      is_success(e) {
        let a = ''
        if (e == 0) {
          a = '失败'
        } else {
          a = '成功'
        }
        return a
      },
      swich_tab_1(e) {
        this.isactive_1 = e
        this.is_show_1.forEach((item, index, self) => {
          if (index == e) {
            item.is_true = true
          } else {
            item.is_true = false
          }
        })
      },


      search_phone3() {

      },
      currentPageChange_3(e) {
        this.currentPage_3 = e
      },
      search_phone4() {

      },
      currentPageChange_4(e) {
        this.currentPage_4 = e
      },
      search_phone5() {

      },
      currentPageChange_5(e) {
        this.currentPage_5 = e
      },
      retry(e) {

      },
      swich_tab_2(e) {
        this.isactive_2 = e
        this.is_show_2.forEach((item, index, self) => {
          if (index == e) {
            item.is_true = true
          } else {
            item.is_true = false
          }
        })
      },
      search_phone6() {
        // this.search_phone6
      },
      currentPageChange_6(e) {
        this.currentPage_6 = e
        // this.search_phone6
      },
      marketing_retry(e) {

      },
      search_phone7() {
        // this.search_phone7
      },
      currentPageChange_7(e) {
        this.currentPage_7 = e
        // this.search_phone6
      },
      rebate(e) {
      },
      rebates(e) {
      }
    }
  }
</script>
<style>
  .cc_con .con_search_div input {
    outline: none;
    border: none;
  }
</style>
<style scoped>

  .input_fath {
    width: 80%;
    position: relative;
    left: 3%;
  }

  .con_search_div {
    border-radius: 3px;
    display: flex;
    width: 75%;
    background-color: #ffffff;
  }

  .con_search {
    position: relative;
    width: 30%;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }

  .us_search2_1_input_icon {
    position: relative;
    left: 16px;
    margin-top: 12px;
    z-index: 1;
  }

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

  .is_ac {
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
    width: 45%;
    display: flex;
    justify-content: space-between;
  }

  .index_table_swith_1 {
    width: 20%;
    display: flex;
    justify-content: space-between;
  }
</style>
