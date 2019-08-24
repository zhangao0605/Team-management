<template>
  <div class="all">
    <div class="con">
      <div class="con_search">
        <div class="con_search_div">
          <span class="el-icon-search us_search2_1_input_icon"></span>
          <el-input style="text-indent: 30px" v-model="search"
                    placeholder="请输入地址进行搜索">
          </el-input>
        </div>
        <el-button type="primary" class="con_search_submit" @click="search_address()">搜索
        </el-button>
      </div>
      <div class="con_select">
        <el-checkbox size="mini " v-model="checked"><span style="font-size: 16px">是否质押</span></el-checkbox>
        <el-select style="margin-left: 10%" v-model="value1" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.groupNoTmp"
            :label="item.groupNo"
            :value="item.groupNoTmp">
          </el-option>
        </el-select>

        <el-select style="margin-left: 10%" v-model="value2" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.roleNameTmp"
            :label="item.roleName"
            :value="item.roleNameTmp">
          </el-option>
        </el-select>
        <el-button type="primary" class="con_search_submit_1" @click="sure_filter()">筛选</el-button>
        <el-button type="primary" class="con_search_submit_2" @click="export_file()">导出报表</el-button>
      </div>
      <div class="con_table">
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            label="编号"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.groupNo}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="我方地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户手机号"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="虎符交易所地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.bourseAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="所在战队"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.groupName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="质押金额"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.balance}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="奖励比例"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.interestRate}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="活动身份"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.groupRole}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="赎回金额"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.redeemBalance}}</span>
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
  // import {getMainInfo,selectGroup,selectGroupRole,exportResult} from '../../api/interface'

  export default {
    name: 'Home',
    data() {
      return {
        search: '',
        checked: false,
        tableData: [],
        options1: [
          {
          "groupNo": "全部战队",
          "groupName":'',
          "groupCreator":'',
          "total": '',
          "personCount": '',
          "groupNoTmp": " "
        }],
        options2: [
          {
          "roleName": "全部身份",
          "roleNameTmp": " "
        }],
        value1: ' ',
        value2: ' ',
        loading: false,
        currentPage: 1,
        pagesize: 10,
        totla: 0,
      }
    },
    methods: {
      /*page切换*/
      currentPageChange(e) {
        this.currentPage=e
        let data = {
          "address": "",
          "groupNo": "",
          "groupRole": "",
          "page": this.currentPage,
          "pageSize": this.pagesize,
          "isPledge":0}
        getMainInfo(data).then(response => {
          this.totla=response.data.total
          if(response.data.dataList==[]){
            this.tableData=[]
          }else {
            this.tableData=response.data.dataList
          }
        })
      },
      /*初始化数据*/
      initialization_data() {
        let data = {
          "address": "",
          "groupNo": "",
          "groupRole": "",
          "page": 1,
          "pageSize": this.pagesize,
          "isPledge":0}
        getMainInfo(data).then(response => {
          this.totla=response.data.total
          if(response.data.dataList==[]){
            this.tableData=[]
          }else {
            this.tableData=response.data.dataList
          }
        })
        selectGroup().then(response => {
          if(response.data==[]){
            this.options1=[
              {
                "groupNo": "全部",
                "groupName":'',
                "groupCreator":'',
                "total": '',
                "personCount": '',
                "groupNoTmp": " "
              }]
          }else {
            this.options1=this.options1.concat(response.data)
          }
        })
        selectGroupRole().then(response => {
          if(response.data==[]){
            this.options2=[{
              "roleName": "全部身份",
              "roleNameTmp": " "
            }]
          }else {
            this.options2=this.options2.concat(response.data)

          }
        })
      },
      /*筛选*/
      sure_filter(){
        let ischick=0
        if(this.checked==true){
          ischick=1
        }else {
          ischick=0
        }
        let data = {
          "address": this.search,
          "groupNo": this.value1,
          "groupRole": this.value2,
          "page": 1,
          "pageSize": this.pagesize,
          "isPledge":ischick}
        getMainInfo(data).then(response => {
          this.totla=response.data.total
          if(response.data.dataList==[]){
            this.tableData=[]
          }else {
            this.tableData=response.data.dataList
          }
        })
      },
      /*地址搜索*/
      search_address(){
        if(this.search==''){
          this.$message.error('查询地址不能为空！');
        }else {
          let ischick=0
          if(this.checked==true){
            ischick=1
          }else {
            ischick=0
          }
          let data = {
            "address": this.search,
            "groupNo": "",
            "groupRole": "",
            "page": 1,
            "pageSize":10,
            "isPledge":0}
          getMainInfo(data).then(response => {
            this.totla=response.data.total
            if(response.data.dataList==[]){
              this.tableData=[]
            }else {
              this.tableData=response.data.dataList
            }
          })
        }
      },
      /*导出列表*/
      export_file(){
        let data={
          "address": "",
          "groupNo": "",
          "groupRole": "",
          "isPledge":0}
        exportResult(data).then(response=>{

        })
      }
    },
    mounted() {
    },
    created() {
      this.initialization_data()
    }
  };
</script>
<style>
  .con_search_div input {
    text-indent: 30px;
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

  .con_search_submit_2 {
    float: right;
  }

  .con_search_submit_1 {
    margin-left: 5%;
  }

  .con_select {
    margin-top: 40px;
  }

  .con_search_div {
    display: flex;
    width: 70%;

  }

  .all {
    width: 100%;
  }

  .con_search {
    position: relative;
    left: -30px;
    width: 40%;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }

  .con {
    padding: 30px 5%;
  }

  .con_search_input {
    display: flex;
    width: 70%;
  }

  .us_search2_1_input_icon {
    position: absolute;
    margin-left: 46px;
    margin-top: 12px;
    z-index: 1;
  }
</style>

