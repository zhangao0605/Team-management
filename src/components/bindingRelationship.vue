<template>
  <div class="br_con">
    <div class="con_search">
      <div class="con_search_div">
        <span class="el-icon-search us_search2_1_input_icon"></span>
        <div class="input_fath">
          <el-input v-model="search"
                    placeholder="请输入用户手机号/用户地址进行检索">
          </el-input>
        </div>
      </div>
      <el-button type="primary" class="con_search_submit" @click="search_address()">搜索
      </el-button>
    </div>
    <div class="con_table">
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
          label="绑定的手机号"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户钱数"
          align="center">
          <template slot-scope="scope">
            <span>{{scientificCounting(scope.row.balance)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="锁定钱数"
          align="center">
          <template slot-scope="scope">
            <span>{{scientificCounting(scope.row.pledgeBalance)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="可流通代币数"
          align="center">
          <template slot-scope="scope">
            <span>{{scientificCounting(scope.row.token)}}</span>
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
</template>

<script>
  import {getPersonInfo} from '../api/interface'

  export default {
    name: "bindingRelationship",
    data() {
      return {
        tableData: [],
        search: '',
        currentPage: 1,
        pagesize: 10,
        totla: 0,
        search_value:''
      }
    },
    methods: {
      /*检索*/
      search_address() {
        this.currentPage=1
        let data
        if (this.search.length == 11) {
          data = {"phone": this.search, "address": "", "page": 1, "pageSize": 10}
        } else {
          data = {"phone": "", "address": this.search, "page": 1, "pageSize": 10}
        }
        this.getdata(data,1)
      },
      /*分页*/
      currentPageChange(e) {
        this.currentPage=e
        let data
        if (this.search.length == 11) {
          data = {"phone": this.search_value, "address": "", "page": this.currentPage, "pageSize": 10}
        } else {
          data = {"phone": "", "address": this.search_value, "page": this.currentPage, "pageSize": 10}
        }
        this.getdata(data,0)
      },
      /*获取数据公共方法*/
      getdata(e,q) {
        getPersonInfo(e).then(response => {
          if (response.data.dataList == []) {
            this.tableData = []
          } else {
            this.tableData = response.data.dataList
            this.totla = response.data.total
            if(q==1){
              this.search_value= this.search
            }
          }
        })
      },
      /*获取数据*/
      initialization_data() {
        let data = {"phone": "", "address": "", "page": 1, "pageSize": 10}
        this.getdata(data,0)
      }
    },
    created() {
      this.initialization_data()
    }
  }
</script>
<style>
  .br_con .con_search_div input {
    outline: none;
    border: none;
  }
</style>
<style scoped>
  .br_con {
    width: 100%;
  }

  .el-pagination {
    position: relative;
    float: right;
    margin-right: 3%;
    margin-top: 30px;
    margin-bottom: 50px;
  }





  .con_search_div {
    border-radius: 3px;
    display: flex;
    width: 70%;
    background-color: #ffffff;
  }

  .con_search {
    position: relative;
    width: 40%;
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

  .input_fath {
    width: 80%;
    position: relative;
    left: 3%;
  }
</style>
