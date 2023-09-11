<template>
  <div class="sf">
    <div class="sf-bg">
      <el-image src="/bg.jpg" fit="cover"></el-image>
    </div>
    <div class="sf-main">
        <div class="sf-header">
          <div class="user">
            <el-image src="/avatar/1.jpg"></el-image>
          </div>
          <div class="tips">
            本平台为纯公益项目，请遵守国家法律，禁止发布违法违规内容
          </div>
          <div class="website">
            <a href="https://www.0gsf.com/" target="_blank"><i class="el-icon-link"></i>零重力科幻</a>
          </div>
        </div>
        <div class="sf-operate">
          <div class="sf-operate-box" :class="operateType==0?'cur':''" @click="setType(0)">
            <div class="sf-operate-main">
              <i class="el-icon-s-comment"></i>
              频道
            </div>
          </div>
          <div class="sf-operate-box" :class="operateType==1?'cur':''" @click="setType(1)">
            <div class="sf-operate-main">
              <i class="el-icon-s-promotion"></i>
              社交
            </div>
          </div>
          <div class="sf-operate-box" :class="operateType==2?'cur':''" @click="setType(2)">
            <div class="sf-operate-main">
              <i class="el-icon-question"></i>
              关于
            </div>
          </div>
          <div class="sf-operate-box" :class="operateType==3?'cur':''" @click="setType(3)">
            <div class="sf-operate-main">
              <i class="el-icon-menu"></i>
              管理
            </div>
          </div>
        </div>
        <div class="sf-concent">
          <template v-if="operateType==0">
            <div class="sf-chatList">
              <div class="sf-chatList-type">
                <div class="sf-chatList-type-box cur">
                  <span>进行中</span>
                </div>
                <div class="sf-chatList-type-box">
                  <span>已关闭</span>
                </div>
              </div>
              <chatList/>
            </div>
            <div class="sf-chat">
              <chat/>
            </div>
          </template>
          <template v-if="operateType==1">
            <metas/>
          </template>
          <template v-if="operateType==2">
            <about/>
          </template>
          <template v-if="operateType==3">
            <system/>
          </template>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      operateType:0,
      chatList:null,
      pageInterval:null,
    }
  },
  created() {
    let that = this;
  },
  mounted(){
    let that = this;
    that.pageInterval = setInterval(function(){

    }, 3000);
  },
  methods: {
    setType(type){
    	const that = this;
      that.operateType = type;
    },
  }
}
</script>
