<template>
  <div>
    <div>
      浏览器地址转为后台地址例：（ <span class="active">TH78***WO2H</span> 转为 <span class="active">0x88***29d9</span> ）
    </div>
    <div style="margin-top: 30px">
      <el-input style="width: 30%;" v-model="input_value1" placeholder="请输入32进制用户地址"></el-input>
      <el-button style="margin-left: 30px" type="primary" @click="to_16()">转换</el-button>
    </div>
    <div class="show_tr">
      {{value}}
    </div>
    <div style="margin-top: 50px">
      后台地址转为浏览器地址例：（ <span class="active">0x88***29d9</span> 转为 <span class="active">TH78***WO2H</span> ）
    </div>
    <div style="margin-top: 30px">
      <el-input style="width: 30%;" v-model="input_value2" placeholder="请输入16进制用户地址"></el-input>
      <el-button style="margin-left: 30px" type="primary" @click="to_32()">转换</el-button>
    </div>
    <div class="show_tr">
      {{value1}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "addressTranslation",
    data() {
      return {
        input_value1: '',
        input_value2: '',
        value: '',
        value1: '',
      }
    },methods:{
      to_16(){
        console.log(1)
        this.value=this.to_16_decimal(this.input_value1)
      },
      to_32(){
        this.value1=this.to_32_decimal(this.input_value2)
      }
    }
  }
</script>

<style scoped>
  .active {
    color: #800080;
  }
  .show_tr{
    margin-top: 30px;
    height: 50px;
  }
</style>
