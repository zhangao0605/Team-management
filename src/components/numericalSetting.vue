<template>
  <div class="ns_all">
    <div class="index_table_swith">
      <div class="table_item" @click="swich_tab(index)"  v-for="(list, index) in table_items" :class="index== isactive ? item_active :'item_default'">{{list.name}}</div>
    </div>
    <!--修改权益值M-->
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>M值现在为：XX</span>
      <br>
      <span>修改M值后，将会影响现在及以后的奖励计算，请确认后再进行更改</span>
      <br>
      <el-input  style="width: 70%;margin-top: 30px" v-model="verify_value" placeholder="请输入新M值"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_cancel()">取 消</el-button>
    <el-button type="primary" @click="dialog_sure()">确 定</el-button>
       </span>
    </el-dialog>
    <!--修改权益值N-->
    <el-dialog
      title=""
      :visible.sync="dialogVisible_1"
      width="30%"
    >
      <span>N值现在为：XX</span>
      <br>
      <span>修改N值后，将会影响现在及以后的奖励计算，请确认后再进行更改</span>
      <br>
      <el-input  style="width: 70%;margin-top: 30px" v-model="verify_value_1" placeholder="请输入新N值"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_cancel_1()">取 消</el-button>
    <el-button type="primary" @click="dialog_sure_1()">确 定</el-button>
       </span>
    </el-dialog>
    <!--历史记录M值-->
    <el-dialog width="30%" title="历史记录 M值" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" :header-cell-style="this.tableHeaderColor">
        <el-table-column property="value" align="center" label="M值" ></el-table-column>
        <el-table-column property="time" align="center" label="修改时间"></el-table-column>
      </el-table>
    </el-dialog>
    <!--历史记录N值-->
    <el-dialog width="30%" title="历史记录 N值" :visible.sync="dialogTableVisible_1">
      <el-table :data="gridData" :header-cell-style="this.tableHeaderColor">
        <el-table-column property="value" align="center" label="N值" ></el-table-column>
        <el-table-column property="time" align="center" label="修改时间"></el-table-column>
      </el-table>
    </el-dialog>
    <!--添加节点-->
    <el-dialog width="35%" title="添加创世王者节点" :visible.sync="dialogFormVisible">
      <el-dialog
        title=""
        :visible.sync="dialogtwo"
        width="30%"
        append-to-body
      >
        <span>您正在将地址为：XXXXXX，绑定手机号为XXXX的节点添加为创世王者节点，节点质押金额XXXXX TUE ，本次添加需要二次确认，是否确认</span>
        <span slot="footer" class="dialog-footer">
        <el-button  @click="dialogtwo_cancel()">取 消</el-button><el-button type="primary" @click="dialogtwo_sure()">确 定</el-button>
       </span>
      </el-dialog>
      <el-form :model="form">
        <el-form-item label="节点地址：" :label-width="formLabelWidth">
          <el-input v-model="form.address" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="节点绑定手机号：" :label-width="formLabelWidth">
          <el-input v-model="form.phone" style="width: 70%"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="质押金额：" :label-width="formLabelWidth">
          <el-input v-model="form.value" style="width: 70%"  autocomplete="off"></el-input><span style="margin-left: 5%;font-size: 16px">TUE</span>
        </el-form-item>
        <el-form-item label="节点所属批次：" :label-width="formLabelWidth">
          <el-select v-model="node_select" placeholder="请选择">
            <el-option
              v-for="item in node_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormcancle()">取 消</el-button>
        <el-button type="primary" @click="dialogFormsure()">确 定</el-button>
      </div>
    </el-dialog>
    <!--强制解绑-->
    <el-dialog
      title=""
      :visible.sync="dialogUntied"
      width="30%"
    >
      <span>该节点不符合创世王者节点要求，强制解绑后该节点所有质押金额会返还至Thinkey主账户，需要在线下为该节点退费。是否确认强制解绑。</span>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="dialogUntied_cancel()">取 消</el-button>
    <el-button type="primary" @click="dialogUntied_sure()">强制解绑</el-button>
       </span>
    </el-dialog>
    <!--删除节点-->
    <el-dialog
      title="删除创世节点"
      :visible.sync="dialogdelete"
      width="25%"
    >
      <div style="font-size: 15px;margin-bottom: 10px">地址:XXXX</div>
      <div style="font-size: 15px;margin-bottom: 10px">质押金额:XXX   TUE</div>
      <div style="font-size: 15px;margin-bottom: 10px">所属批次：第3批</div>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="dialogdelete_cancel()">取 消</el-button>
    <el-button type="primary" @click="dialogdelete_sure()">确 定</el-button>
       </span>
    </el-dialog>
    <!--修改节点-->
    <el-dialog width="35%" title="修改创世王者节点" :visible.sync="dialogedit">
      <el-form :model="form_1">
        <el-form-item label="节点名称：" :label-width="formLabelWidth">
          <span>sadasdaskdjaskjdkjand</span>
        </el-form-item>
        <el-form-item label="节点地址：" :label-width="formLabelWidth">
          <span>sadasdaskdjaskjdkjand</span>
        </el-form-item>
        <el-form-item label="节点绑定手机号：" :label-width="formLabelWidth">
          <el-input v-model="form_1.phone" style="width: 70%"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="质押金额：" :label-width="formLabelWidth">
          <el-input v-model="form_1.value" style="width: 70%"  autocomplete="off"></el-input><span style="margin-left: 5%;font-size: 16px">TUE</span>
        </el-form-item>
        <el-form-item label="节点所属批次：" :label-width="formLabelWidth">
          <el-select v-model="node_edit" placeholder="请选择">
            <el-option
              v-for="item in node_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogeditcancle()">取 消</el-button>
        <el-button type="primary" @click="dialogeditsure()">确 定</el-button>
      </div>
    </el-dialog>
    <!--查看节点状态详情-->
    <el-dialog width="35%" title="下属节点详情" :visible.sync="dialogseedetail">
      <el-dialog
        width="70%"
        title="节点下属全部节点详情"
        :visible.sync="dialog_de_all"
        append-to-body>
        <div>
          共XX人，质押XXXXX TUE
        </div>
        <div>
            <el-select style="margin-top: 30px" v-model="batch_of_details" placeholder="请选择">
              <el-option
                v-for="item in node_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

        </div>
        <div class="con_table" style="padding-bottom: 40px">
          <el-table
            :data="subordinate_data"
            border
            style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
            :header-cell-style="this.tableHeaderColor"
          >
            <el-table-column
              label="节点加入时间"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="节点级别"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="节点地址"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="节点绑定手机"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="节点类型"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="节点质押金额"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
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
      <el-form>
        <el-form-item label="节点名称：" :label-width="formLabelWidth_1">
          <span>XXXX</span>
        </el-form-item>
        <el-form-item label="节点状态：" :label-width="formLabelWidth_1">
          <span>符合</span>
        </el-form-item>
        <el-form-item label="节点地址：" :label-width="formLabelWidth_1">
          <span>XXXX</span>
        </el-form-item>
        <el-form-item label="节点绑定手机号：" :label-width="formLabelWidth_1">
          <span>XXXXXX</span>
        </el-form-item>
        <el-form-item label="节点质押金额：" :label-width="formLabelWidth_1">
          <span><span>70000</span> TUE <span> (满足)</span></span>
        </el-form-item>
        <el-form-item label="节点下属一级节点数量：" :label-width="formLabelWidth_1">
          <span><span>10</span>  <span> (100%)</span></span>
        </el-form-item>
        <el-form-item label="节点下属全部节点数量：" :label-width="formLabelWidth_1">
          <span><span>102</span>  <span> (满足)</span> <span class="operating" @click="see_de_all()">查看详情</span></span>
        </el-form-item>
        <el-form-item label="节点下属全部节点质押数量：" :label-width="formLabelWidth_1">
          <span><span>15000</span>  <span> (105%)</span></span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--数值设置-->
    <div class="part_1" v-show="part_show[0].isShow">
      <div class="con_table">
        <el-table
          :data="number_seting"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            label="数据名称"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="数据值"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.value}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <span class="operating" v-show="scope.row.isoperating" @click="edit(scope.row.recording)">修改</span>
              <span class="operating" v-show="scope.row.isoperating" @click="history_record(scope.row.recording)">历史记录</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--创世王者设置-->
    <div class="part_2"  v-show="part_show[1].isShow">
      <el-button type="primary" @click="add_node()">添加节点
      </el-button>
      <div class="con_table">
        <el-table
          :data="number_seting"
          border
          style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column
            label="节点名称"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="节点地址"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.value}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="节点绑定手机号"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.value}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="节点状态"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.value}}</span>
              <span class="operating_1" @click="see_details(e)">查看详情</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <span class="operating" v-show="scope.row.recording==0" @click="untied()">强制解绑</span>
              <span class="operating" v-show="!scope.row.recording==0" @click="edit_node()">修改</span>
              <span class="operating" v-show="!scope.row.recording==0" @click="delete_node()">删除</span>
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
    export default {
        name: "numericalSetting",
      data(){
          return{
            batch_of_details:1,
            dialog_de_all:false,
            formLabelWidth_1:'200px',
            dialogseedetail:false,
            dialogedit:false,
            node_edit:1,
            form:{
              "address":'',
              "phone":'',
              "value":'',
            },
            form_1:{
              "phone":'',
              "value":'',
            },
            dialogdelete:false,
            dialogtwo:false,
            dialogUntied:false,
            dialogFormVisible:false,
            formLabelWidth: '150px',
            dialogVisible:false,
            verify_value:'',
            dialogVisible_1:false,
            verify_value_1:'',
            dialogTableVisible:false,
            dialogTableVisible_1:false,
            isactive:0,
            table_items:[
              {"name":' 数值设置 '},
              {"name":' 创世王者节点设置 '},
            ],
            part_show:[
              {"isShow":true},
              {"isShow":false},
            ],
            is_show:[
              {"is_true":true},
              {"is_true":false},
            ],
            gridData:[
              {
                "time":'2019-11-3',
                "value":80,
              },
              {
                "time":'2019-11-3',
                "value":80,
              },
              {
                "time":'2019-11-3',
                "value":80,
              },
              {
                "time":'2019-11-3',
                "value":80,
              },
              {
                "time":'2019-11-3',
                "value":80,
              },
              {
                "time":'2019-11-3',
                "value":80,
              },
              {
                "time":'2019-11-3',
                "value":80,
              },
              {
                "time":'2019-11-3',
                "value":80,
              },
              {
                "time":'2019-11-3',
                "value":80,
              },
              {
                "time":'2019-11-3',
                "value":80,
              },
              {
                "time":'2019-11-3',
                "value":80,
              },
              {
                "time":'2019-11-3',
                "value":80,
              },              {
                "time":'2019-11-3',
                "value":80,
              },
              {
                "time":'2019-11-3',
                "value":80,
              },
              {
                "time":'2019-11-3',
                "value":80,
              },
              {
                "time":'2019-11-3',
                "value":80,
              },

              {
                "time":'2019-11-3',
                "value":80,
              },
              {
                "time":'2019-11-3',
                "value":80,
              },
              {
                "time":'2019-11-3',
                "value":80,
              },              {
                "time":'2019-11-3',
                "value":80,
              },              {
                "time":'2019-11-3',
                "value":80,
              },
              {
                "time":'2019-11-3',
                "value":80,
              },
              {
                "time":'2019-11-3',
                "value":80,
              },





            ],
            item_active:'item_active',
            item_default:'item_default',
            number_seting:[
              {
                "name":'青铜节点要求TUE',
                "value":'1000',
                "isoperating":false,
                "recording":0,
              },
              {
                "name":'青铜节点解绑时间',
                "value":'7',
                "isoperating":false,
                "recording":0,
              },
              {
                "name":'青铜节点一级下属数量及收益',
                "value":'5%,10%,15%,20%',
                "isoperating":false,
                "recording":0,
              },
              {
                "name":'王者节点要求TUE',
                "value":'10000000',
                "isoperating":false,
                "recording":0,
              },
              {
                "name":'王者节点解绑时间',
                "value":'30',
                "isoperating":false,
                "recording":0,
              },
              {
                "name":'王者节点收益',
                "value":'28%',
                "isoperating":false,
                "recording":0,
              },
              {
                "name":'王者节点下属一级节点、总节点数量要求及质押量要求',
                "value":'10,100,1000000',
                "isoperating":false,
                "recording":0,
              },
              {
                "name":'权益池M',
                "value":'',
                "isoperating":true,
                "recording":1,
              },
              {
                "name":'权益池N',
                "value":'',
                "isoperating":true,
                "recording":2,
              },
            ],
            subordinate_data:[
              {
                "name":'青铜节点要求TUE',
                "value":'1000',
                "isoperating":false,
                "recording":0,
              },
              {
                "name":'青铜节点解绑时间',
                "value":'7',
                "isoperating":false,
                "recording":0,
              },
              {
                "name":'青铜节点一级下属数量及收益',
                "value":'5%,10%,15%,20%',
                "isoperating":false,
                "recording":0,
              },
              {
                "name":'王者节点要求TUE',
                "value":'10000000',
                "isoperating":false,
                "recording":0,
              },
              {
                "name":'王者节点解绑时间',
                "value":'30',
                "isoperating":false,
                "recording":0,
              },
              {
                "name":'王者节点收益',
                "value":'28%',
                "isoperating":false,
                "recording":0,
              },
              {
                "name":'王者节点下属一级节点、总节点数量要求及质押量要求',
                "value":'10,100,1000000',
                "isoperating":false,
                "recording":0,
              },
              {
                "name":'权益池M',
                "value":'',
                "isoperating":true,
                "recording":1,
              },
              {
                "name":'权益池N',
                "value":'',
                "isoperating":true,
                "recording":2,
              },
            ],
            node_select:1,
            node_options:[
              {
                'label':'第1批次',
                'value':1,
              },
              {
                'label':'第2批次',
                'value':2,
              },
              {
                'label':'第3批次',
                'value':3,
              },
              {
                'label':'第4批次',
                'value':4,
              },
            ],
            currentPage: 1,
            pagesize: 10,
            totla: 0,
            currentPage_1: 1,
            pagesize_1: 10,
            totla_1: 0,
          }
      },
      methods:{
          /*part_1 table切换*/
        swich_tab(e){
          this.is_show.forEach((item,index,self)=>{
            if(index==e){
              item.is_true=true
            }else {
              item.is_true=false
            }
          })
          this.part_show.forEach((item,index,self)=>{
            if(index==e){
              item.isShow=true
            }else {
              item.isShow=false
            }
          })
          this.isactive=e
        },
        /*part_1 修改*/
        edit(e){
          if(e==1){
            this.dialogVisible=true
          }else if(e==2){
            this.dialogVisible_1=true
          }else {

          }
        },
        /*part_1 M值修改弹窗取消*/
        dialog_cancel(){
          this.dialogVisible=false
          this.verify_value=''
        },
        /*part_1 M值修改弹窗确认*/
        dialog_sure(){

        },
        /*part_1 N值修改弹窗取消*/
        dialog_cancel_1(){
          this.dialogVisible_1=false
          this.verify_value_1=''
        },
        /*part_1 N值修改弹窗确认*/
        dialog_sure_1(){

        },
        /*part_1 打开历史记录*/
        history_record(e){
          if(e==1){
            this.dialogTableVisible=true
          }else if(e==2){
            this.dialogTableVisible_1=true
          }else {

          }
        },
        /*添加节点*/
        add_node(){
          this.dialogFormVisible=true
        },
        /*添加节点取消*/
        dialogFormcancle(){
          this.form.address=''
          this.form.phone=''
          this.form.value=''
          this.dialogFormVisible=false
        },
        /*添加节点确认*/
        dialogFormsure(){
          console.log(this.form)
          this.dialogtwo=true
        },
        /*添加节点二次确认,取消操作*/
        dialogtwo_cancel(){
          this.dialogtwo=false
        },
        /*添加节点二次确认,确认操作*/
        dialogtwo_sure(){
          this.dialogtwo=false
          this.dialogFormVisible=false
        },
        /*强制解绑*/
        untied(e){
          this.dialogUntied=true
        },
        /*取消解绑*/
        dialogUntied_cancel(){
          this.dialogUntied=false
        },
        /*确认解绑*/
        dialogUntied_sure(){
          this.dialogUntied=false
        },
        /*修改节点*/
        edit_node(){
          this.dialogedit=true
        },
        /*取消修改节点*/
        dialogeditcancle(){
          this.dialogedit=false
        },
        /*确认修改节点*/
        dialogeditsure(){
          this.dialogedit=false
          console.log(this.form_1)
          this.form_1.phone=''
          this.form_1.value=''
          this.node_edit=1
        },
        /*删除节点*/
        delete_node(){
          this.dialogdelete=true
        },
        /*取消删除节点*/
        dialogdelete_cancel(){
          this.dialogdelete=false
        },
        /*确认删除节点*/
        dialogdelete_sure(){
          this.dialogdelete=false
        },
        /*查看节点状态*/
        see_details(e){
          this.dialogseedetail=true
        },
        /*查看下属节点详情*/
        see_de_all(){
          this.dialog_de_all=true
        }
      }
    }
</script>

<style scoped>
  .ns_all{
    width: 100%;
  }
  .item_active{
    color: #800080 ;
    /*border-bottom: 2px solid #800080 ;*/
    /*padding-bottom: 5px;*/
  }
  .item_default{
    color: #000000;
  }
  .table_item{
    margin-bottom:30px;
    font-size: 17px;
    user-select: none;
    cursor: pointer;
  }
  .index_table_swith{
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
  .operating{
    cursor: pointer;
    color:#800080  ;
    padding: 0 5px;
    margin: 0 10px;
    font-size: 15px;
  }
  .operating_1{
    cursor: pointer;
    float: right;
    position: relative;
    right: 20%;
    color:#800080  ;
    padding: 0 5px;
    /*margin: 0 10px;*/
  }
</style>
