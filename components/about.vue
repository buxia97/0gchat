<template>
  <div class="about">
    <div class="about-concent">
      <div class="about-title">
        零重力作者匿名讨论区
      </div>
      <div class="about-intro">
        <p>零重力作者匿名讨论区，全称为零重力科幻征文投票环节作者匿名讨论区，简称为0gsfChat。从功能上来说，就是根据征文作为话题，并对征文本身、参与作品等进行匿名讨论。</p>
        <p>本讨论区禁止讨论任何违反国家法律内容，请各位遵守聊天规范。如出现违规，管理员将直接根据IP进行封禁，违规者将无法使用发送消息功能。</p>
        <p>最后，0gsfChat为开源免费的项目，但禁止用于任何商业目的，也禁止用于任何违法违规目的，我们不对平台的安装、部署、功能使用提供任何帮助，也不承担任何因未遵守法律法规所产生的相应的法律责任。</p>
      </div>
      <div class="about-btn">
          <el-button type="danger" icon="el-icon-download" size="small" @click="goGithub(0)">前端代码</el-button>
          <el-button type="danger" icon="el-icon-download" size="small" @click="goGithub(1)">后端代码</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    created() {
      let that = this;
    },
    methods: {
      goGithub(type){
        const that = this;
        if(type==0){
          window.open("https://github.com/buxia97/0gchat");
        }
        if(type==1){
          window.open("https://github.com/buxia97/0gchat-java");
        }
      },
    },
  }
</script>

<style>
</style>
