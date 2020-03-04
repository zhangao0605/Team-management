<template>
  <div class="index_con">
    <el-dialog :visible.sync="is_loginout" width="25%">
      <span>请选择是否继续进行注销操作？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginout_false()">取 消</el-button>
        <el-button type="primary" @click="loginout_true()">确 定</el-button>
      </span>
    </el-dialog>
    <el-button class="login_out" type="primary" @click="login_out()">注销登录</el-button>
    <div class="index_table_swith">
      <div
        class="table_item"
        @click="swich_tab(index)"
        v-for="(list, index) in table_items"
        :class="index== isactive ? item_active :'item_default'"
      >{{list.name}}
      </div>
    </div>
    <binding-relationship v-show="is_show[0].is_true"/>
    <recharge-record v-show="is_show[1].is_true"/>
    <withdrawals-record v-show="is_show[2].is_true"/>
    <numerical-setting v-show="is_show[3].is_true"/>
    <account-information v-show="is_show[4].is_true"/>
    <service-monitoring v-show="is_show[5].is_true"/>
    <wallet-settings v-show="is_show[6].is_true"/>
    <hierarchical-structure v-show="is_show[7].is_true"/>
    <address-translation v-show="is_show[8].is_true"/>
    <core-customer v-show="is_show[9].is_true"/>
    <pos-mining v-show="is_show[10].is_true"/>
    <voting-management v-show="is_show[11].is_true"/>
  </div>
</template>
<script>
  import bindingRelationship from "../../components/bindingRelationship";
  import coreCustomer from "../../components/coreCustomer";
  import addressTranslation from "../../components/addressTranslation";
  import walletSettings from "../../components/walletSettings";
  import hierarchicalStructure from "../../components/hierarchicalStructure";
  import accountInformation from "../../components/accountInformation";
  import numericalSetting from "../../components/numericalSetting";
  import rechargeRecord from "../../components/rechargeRecord";
  import withdrawalsRecord from "../../components/withdrawalsRecord";
  import posMining from "../../components/posMining";
  import votingManagement from "../../components/votingManagement";
  import serviceMonitoring from "../home/home";

  export default {
    name: "index",
    components: {
      votingManagement,
      addressTranslation,
      hierarchicalStructure,
      bindingRelationship,
      accountInformation,
      numericalSetting,
      rechargeRecord,
      withdrawalsRecord,
      serviceMonitoring,
      walletSettings,
      coreCustomer,
      posMining
    },
    data() {
      return {
        is_show: [
          {is_true: true},
          {is_true: false},
          {is_true: false},
          {is_true: false},
          {is_true: false},
          {is_true: false},
          {is_true: false},
          {is_true: false},
          {is_true: false},
          {is_true: false},
          {is_true: false},
          {is_true: false},
        ],
        isactive: 0,
        is_loginout: false,
        item_active: "item_active",
        item_default: "item_default",
        table_items: [
          {name: " 绑定关系 "},
          {name: " 充值记录 "},
          {name: " 提现记录 "},
          {name: " 节点大赛数值设置 "},
          {name: " 节点大赛账户信息 "},
          {name: " 服务监控  "},
          {name: " 钱包设置 "},
          {name: " 节点树结构  "},
          {name: " 地址转换  "},
          {name: " 芯客  "},
          {name: " POS挖矿   "},
          {name: " 投票治理   "},
        ]
      };
    },
    methods: {
      swich_tab(e) {
        this.isactive = e;
        this.is_show.forEach((item, index, self) => {
          if (index == e) {
            item.is_true = true;
          } else {
            item.is_true = false;
          }
        });
      },
      login_out() {
        this.is_loginout = true;
      },
      loginout_false() {
        this.is_loginout = false;
      },
      loginout_true() {
        this.$store.dispatch("login/LogOut").then(() => {
          this.is_loginout = false;
          location.reload();
        });
      }
    }
  };
</script>

<style scoped>
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

  .login_out {
    /*font-size: 18px;*/
    user-select: none;
    cursor: pointer;
    float: right;
    /*color: #800080 ;*/
  }

  .index_table_swith {
    width: 82%;
    display: flex;
    justify-content: space-between;
  }

  .index_con {
    padding: 2% 5%;
    width: 90%;
    height: 100%;
  }
</style>
