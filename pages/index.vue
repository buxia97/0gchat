<template>
  <div class="sf">
    <div class="sf-bg">
      <el-image src="/bg.jpg" fit="cover"></el-image>
    </div>
    <div class="sf-main">
        <div class="sf-header">
          <div class="user" @click="userVisible=true">
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
              <chatList :chatList="chatList"/>
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
    <el-dialog
      title="用户信息"
      :visible.sync="userVisible"
      width="330px">
      <div class="userInfo">
        <div class="userInfo-avatar">
          <el-image src="/avatar/2.jfif"></el-image>
        </div>
        <div class="userInfo-name">
          小黑子
        </div>
      </div>
      <div slot="footer" class="userInfo-footer">
        <el-button type="danger" size="medium" @click="deleteUser()">销毁用户</el-button>
        <el-button type="primary" size="medium" @click="reloadUser()">重新生成</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      operateType:0,
      chatList:[],
      pageInterval:null,
      userVisible:false
    }
  },
  computed: {
    ...mapState({
      curChat: state => state.curChat,
      token: state => state.token,
      userInfo: state => state.userInfo
    })
  },
  created() {
    let that = this;
  },
  mounted(){
    let that = this;
    if(localStorage.getItem("0gsf_userinfo")){
      try{
        var userInfo = localStorage.getItem("0gsf_userinfo");
        userInfo = JSON.parse(userInfo);
        that.$store.commit('setUserInfo', userInfo);
      }catch(e){
        that.$store.commit('setUserInfo', null);
      	console.log(e);
      }
    }else{
      that.$store.commit('setUserInfo', null);
    }
    if(localStorage.getItem("0gsf_token")){
      var token = localStorage.getItem("0gsf_token");
      that.$store.commit('setToken', token);
    }
    that.pageInterval = setInterval(function(){

    }, 3000);
  },
  methods: {
    setType(type){
    	const that = this;
      that.operateType = type;
    },
    deleteUser(){
      const that = this;

    },
    reloadUser(){
      const that = this;
      
    }
  }
}
</script>
