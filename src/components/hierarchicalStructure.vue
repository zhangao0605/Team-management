<template>
    <div>
      <el-button type="warning" @click="change_url()"> 获取数据 </el-button>
      <br/>
      <span style="margin-top: 20px;color: red;display: inline-block">若无此需求请勿点击！由于数据量较大耗时较长，有可能使页面卡顿影响使用！</span>
      <iframe :src=url width="100%" height="700px" style="margin-top: 20px" frameborder="0"></iframe>
    </div>
</template>

<script>
    export default {
        name: "hierarchicalStructure",
      data(){
          return{
            url:''
          }

      },
      methods:{
          change_url(){
            this.url='../../static/web/Tree.html'
          }
      }
    }
</script>

<style scoped>

</style>
