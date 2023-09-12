<template>
  <div class="sf">
    <div class="sf-bg">
      <el-image src="/bg.jpg" fit="cover"></el-image>
    </div>
    <div class="noUser" v-if="userInfo==null">
      <div class="noUser-title">
        作者匿名聊天室
      </div>
      <div class="noUser-version">
        v1.0 beta
      </div>
      <div class="noUser-welcome">
        欢迎来到作者匿名讨论区，请点击下方按钮，确认随机生成的匿名账户，开始进行愉快的讨♂论吧！
      </div>
      <div class="userInfo" v-if="beforUserInfo!=null">
        <div class="userInfo-avatar">
          <el-image :src="'/avatar/'+beforUserInfo.avatar+'.webp'"></el-image>
        </div>
        <div class="userInfo-name">
          {{beforUserInfo.userName}}
        </div>
      </div>
      <div class="userInfo-footer">
        <el-button type="success" size="small" @click="confirmUser()">确认用户</el-button>
        <el-button type="primary" size="small" @click="reloadUser()">重新生成</el-button>
      </div>
    </div>
    <div class="sf-main" v-else>
        <div class="sf-header">
          <div class="user" @click="userVisible=true">
            <el-image :src="'/avatar/'+userInfo.avatar+'.webp'"></el-image>
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
                <div class="sf-chatList-type-box" :class="chatStatus==1?'cur':''" @click="setChatStatus(1)">
                  <span>进行中</span>
                </div>
                <div class="sf-chatList-type-box" :class="chatStatus==0?'cur':''" @click="setChatStatus(0)">
                  <span>已关闭</span>
                </div>
              </div>
              <chatList :chatList="chatList"/>
            </div>
            <div class="sf-chat">
              <template v-if="curChat==0">
                <div class="sf-chat-no">
                  <div class="sf-chat-no-concent">
                    <i class="el-icon-chat-line-square"></i>
                    <p>暂无进行中聊天</p>
                  </div>
                </div>
              </template>
              <template v-else>
                <chat :chatId="curChat" :chatInfo="curChatInfo"/>
              </template>

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
      <div class="userInfo" v-if="userInfo!=null">
        <div class="userInfo-avatar">
          <el-image :src="'/avatar/'+userInfo.avatar+'.webp'"></el-image>
        </div>
        <div class="userInfo-name">
          {{userInfo.userName}}
        </div>
      </div>
      <div slot="footer" class="userInfo-footer">
        <el-button type="danger" size="medium" @click="deleteUser()">销毁用户</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'index',
  data() {
    return {
      operateType:0,
      chatList:[],
      chatStatus:1,
      pageInterval:null,
      userVisible:false,
      beforUserInfo:null,

      curChatInfo:null,
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
    if(that.userInfo == null){
      that.reloadUser();
    }else{
      that.getChatList();
      that.pageInterval = setInterval(function(){

      }, 3000);
    }

  },
  methods: {
    setType(type){
    	const that = this;
      that.operateType = type;
    },
    deleteUser(){
      const that = this;
      localStorage.removeItem("0gsf_userinfo");
      that.$store.commit('setUserInfo', null);
      that.userVisible = false;
      that.reloadUser();
    },
    reloadUser(){
      const that = this;
      var nameList = that.$api.getNameList();
      var randNameIndex = Math.floor(Math.random() * nameList.length);
      var userName = nameList[randNameIndex];
      var randAvatarIndex = Math.floor(Math.random() * 80);
      var avatar = randAvatarIndex;
      var userKey = that.generateRandomString(10);
      var userInfo = {
        "userName":userName,
        "avatar":avatar,
        "userKey":userKey,
      }
      that.beforUserInfo = userInfo;
    },
    confirmUser(){
      const that = this;
      var userInfo = that.beforUserInfo;
      localStorage.setItem("0gsf_userinfo",JSON.stringify(userInfo));
      that.$store.commit('setUserInfo', userInfo);
      that.beforUserInfo = null;
    },
    setChatStatus(type){
      const that = this;
      that.chatStatus = type;
      that.chatList = [];
      that.getChatList();
    },
    generateRandomString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let randomString = '';
    
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
      }
    
      return randomString;
    },
    getChatList(){
      const that = this;
      var chatStatus = that.chatStatus;
      var params = {
      	"status":chatStatus
      }
      var data = {
      	"searchParams":JSON.stringify(that.$api.removeObjectEmptyKey(params)),
      	"limit":20,
      }
      that.$axios.$post(that.$api.chatList(),this.qs.stringify(data),{progress: false }).then(function (res) {
        if(res.code==1){
          var list = res.data;
          if(list.length>0){
        		that.chatList = list;
        	}else{
        		that.chatList = [];
        	}
        }
      })
      .catch(function (error) {
        console.log(error)
        that.$message({
          message: "接口请求异常，请检查网络！",
          type: 'error'
        })
      })
    }
  }
}
</script>
