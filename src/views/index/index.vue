<template>
    <div class="index_con">
      <div class="index_table_swith">
        <div class="table_item" @click="swich_tab(index)"  v-for="(list, index) in table_items" :class="index== isactive ? item_active :'item_default'">{{list.name}}</div>
      </div>
      <binding-relationship v-show="is_show[0].is_true"/>
      <recharge-record v-show="is_show[1].is_true"/>
      <withdrawals-record v-show="is_show[2].is_true"/>
      <numerical-setting v-show="is_show[3].is_true"/>
      <account-information v-show="is_show[4].is_true"/>
    </div>
</template>
<script>
  import bindingRelationship from '../../components/bindingRelationship'
  import accountInformation from '../../components/accountInformation'
  import numericalSetting from '../../components/numericalSetting'
  import rechargeRecord from '../../components/rechargeRecord'
  import withdrawalsRecord from '../../components/withdrawalsRecord'
    export default {
      name: "index",
      components: {bindingRelationship,accountInformation,numericalSetting,rechargeRecord,withdrawalsRecord,},
      data(){
          return{
            is_show:[
              {"is_true":true},
              {"is_true":false},
              {"is_true":false},
              {"is_true":false},
              {"is_true":false},
            ],
            isactive:0,
            item_active:'item_active',
            item_default:'item_default',
            table_items:[
              {"name":' 绑定关系 '},
              {"name":' 充值记录 '},
              {"name":' 提现记录 '},
              {"name":' 节点大赛数值设置 '},
              {"name":' 节点大赛账户信息 '},
            ]
          }
      },
      methods:{
        swich_tab(e){
          this.isactive=e
          this.is_show.forEach((item,index,self)=>{
            if(index==e){
              item.is_true=true
            }else {
              item.is_true=false
            }
          })
        }
      }
    }
</script>

<style scoped>
  .item_active{
    color: #800080 ;
    border-bottom: 2px solid #800080 ;
    padding-bottom: 5px;
  }
  .item_default{
    color: #000000;
  }
  .table_item{
    margin-bottom:30px;
    font-size: 18px;
    user-select: none;
    cursor: pointer;
  }
  .index_table_swith{
    width: 55%;
    display: flex;
    justify-content: space-between;
  }
.index_con{
  padding: 2% 5%;
  width: 90%;
  height: 100%;
}
</style>
