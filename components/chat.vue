<template>
  <div class="chat">
    <div class="chat-wap-header" v-if="chatInfo!=null">
        <i class="el-icon-arrow-left" @click="chatBack()"></i>
        <div class="chat-wap-title">{{chatInfo.name}}</div>
        <div class="chat-wap-chat-avatar" @click="isShow=!isShow">
          <el-image :src="'/chatAvatar/'+chatInfo.pic+'.jpg'"></el-image>
          <i class="el-icon-caret-bottom"></i>
        </div>
    </div>
    <div class="chat-header" v-if="chatInfo!=null" :class="isShow?'show':''">
      <div class="chat-avatar">
        <el-image :src="'/chatAvatar/'+chatInfo.pic+'.jpg'"></el-image>
      </div>
      <div class="chat-info">
        <div class="chat-info-name">
          {{chatInfo.name}}<span>热度{{chatInfo.totalMsg}}</span>
          <template v-if="chatInfo.status==1">
            <span class="open">进行中</span>
          </template>
          <template v-if="chatInfo.status==0">
            <span class="close">已关闭</span>
          </template>
        </div>
        <div class="chat-intro" v-html="chatInfo.intro"></div>
      </div>
    </div>
    <div class="chat-msg">

      <template v-if="msgList==null">
        <div class="chat-msg-loading">
          <div class="chat-msg-loading-main">
            <i class="el-icon-loading"></i>
          </div>
        </div>
      </template>
      <template v-else>
       <msg :msgList="msgList" ref="msg"/>
      </template>
    </div>
    <div class="chat-input">
      <template v-if="chatInfo.status==0">
        <div class="chat-input-close">
          频道已关闭
        </div>
      </template>
      <template v-else>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入消息内容"
          v-model="msg">
        </el-input>
        <div class="chat-btn">
          <!-- <el-button type="text" size="small" icon="el-icon-picture"></el-button> -->
          <el-button type="text" size="small" icon="el-icon-paperclip" @click="linksVisible=true"></el-button>
          <el-button type="primary" icon="el-icon-position" size="small" @click="sendMsg()">发送</el-button>
        </div>
      </template>
    </div>
    <el-dialog
      title="发送链接"
      :visible.sync="linksVisible"
      :modal="false"
      width="330px">
      <div class="dialog-form">
        <el-form ref="form"  label-position="top">
          <el-form-item label="链接名称">
            <el-input
              type="text"
              placeholder="请输入链接名称"
              v-model="linkForm.name">
            </el-input>
          </el-form-item>
          <el-form-item label="链接地址">
            <el-input
              type="text"
              placeholder="请输入链接地址(http://)"
              v-model="linkForm.url">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="success" size="medium" @click="sendLink()">确认发送</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    props: {
        chatInfo: {
            type: Object
        },
        chatId: {
            type: Number,
            default: 0
        }
    },
    data() {
      return {
        msg: '',
        msgList:null,
        lastTime:0,
        msgInterval:null,
        linksVisible:false,
        linkForm:{
          "name":"",
          "url":""
        },
        isShow:false,
        isSysMsg:0,
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo,
        curChat: state => state.curChat
      })
    },
    watch: {
      curChat(newValue, oldValue){
        const that = this;
        that.isSysMsg = 0;
        that.msgList = null;
        that.lastTime = 0;
        that.loadMsg(false);
        clearInterval(that.msgInterval);
        that.msgInterval = null;

        that.msgInterval = setInterval(function(){
          if(that.chatId!=0){
            that.loadMsg(true);
          }
        }, 3000);
      }
    },
    beforeDestroy(){
      let that = this;
      clearInterval(that.msgInterval);
      that.msgInterval = null;
    },
    mounted() {
      let that = this;
      that.loadMsg(false);
      //销毁定时器（管够）
      that.$once('hook:beforeDestroy', () => {
        clearInterval(that.msgInterval);
        that.msgInterval = null;
      })
      clearInterval(that.msgInterval);
      that.msgInterval = null;

      that.msgInterval = setInterval(function(){
        if(that.userInfo==null){
          return false;
        }
        if(that.chatId!=0){
          that.loadMsg(true);
        }else{
          clearInterval(that.msgInterval);
          that.msgInterval = null;
        }
      }, 3000);
    },
    methods: {
      chatBack(){
        const that = this;
        that.$store.commit('setCurChat', 0);
      },
      loadMsg(isLoad){
        const that = this;
        if(!isLoad){
          try{
            if(localStorage.getItem("0gsf_msgList_"+that.chatId)){
              var msgList = JSON.parse(localStorage.getItem("0gsf_msgList_"+that.chatId));
              that.lastTime = msgList[msgList.length-1].created;
              that.msgList = msgList;
              if(msgList.length>0){
                setTimeout(function(){
                  that.$nextTick(() => {
                    that.$refs['msg'].$refs['msgScroll'].wrap.scrollTop = that.$refs['msg'].$refs['msgScroll'].wrap.scrollHeight
                  })
                }, 100);
              }
            }
          }catch(e){
            console.log(e);
            that.lastTime = 0;
            that.msgList = [];
          }
        }
        if(that.lastTime==0){
          that.getMsgList();
        }else{
          that.getLastMsgs();
        }
      },
      sendLink(){
        const that = this;
        if(that.linkForm.name==""||that.linkForm.url==""){
          return false;
        }
        var userInfo = that.userInfo;
        var params = userInfo;
        params.chatid = that.chatId;
        params.text = that.linkForm.name;
        params.url = that.linkForm.url;
        params.type = 3;
        var data = {
        	"params":JSON.stringify(that.$api.removeObjectEmptyKey(params)),
        }
        that.linkForm = {
          "name":"",
          "url":""
        };
        that.linksVisible = false;
        that.$axios.$post(that.$api.sendMsg(),this.qs.stringify(data),{progress: false }).then(function (res) {
          if(res.code==1){
            that.getLastMsgs();
            setTimeout(function(){
              that.$nextTick(() => {
                that.$refs['msg'].$refs['msgScroll'].wrap.scrollTop = that.$refs['msg'].$refs['msgScroll'].wrap.scrollHeight
              })
            }, 100);
          }else{
            that.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message({
            message: "接口请求异常，请检查网络！",
            type: 'error'
          })
        })
      },
      sendMsg(){
        const that = this;
        if(that.msg==""){
          return false;
        }
        if(that.chatId==0){
          that.$message({
            message: "请选择聊天室",
            type: 'error'
          })
          return false;
        }
        var userInfo = that.userInfo;
        var params = userInfo;
        params.chatid = that.chatId;
        params.text = that.msg;
        params.type = 0;
        var data = {
        	"params":JSON.stringify(that.$api.removeObjectEmptyKey(params)),
        }
        that.msg = "";
        that.$axios.$post(that.$api.sendMsg(),this.qs.stringify(data),{progress: false }).then(function (res) {
          if(res.code==1){
            that.getLastMsgs();
            setTimeout(function(){
              that.$nextTick(() => {
                that.$refs['msg'].$refs['msgScroll'].wrap.scrollTop = that.$refs['msg'].$refs['msgScroll'].wrap.scrollHeight
              })
            }, 100);
          }else{
            that.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message({
            message: "接口请求异常，请检查网络！",
            type: 'error'
          })
        })
      },
      getMsgList(){
        const that = this;
        var params = {
        	"chatid":that.chatId
        }
        var data = {
        	"searchParams":JSON.stringify(that.$api.removeObjectEmptyKey(params)),
        	"limit":800,
        }
        that.$axios.$post(that.$api.msgList(),this.qs.stringify(data),{progress: false }).then(function (res) {
          if(res.code==1){
            var list = res.data;

            if(list.length>0){
              that.lastTime = list[0].created;
          		that.msgList = list.reverse();
              setTimeout(function(){
                that.$nextTick(() => {
                  that.$refs['msg'].$refs['msgScroll'].wrap.scrollTop = that.$refs['msg'].$refs['msgScroll'].wrap.scrollHeight
                })
              }, 100);
          	}else{
          		that.msgList = [];
          	}
            var localMsg = that.msgList;
            localStorage.setItem("0gsf_msgList_"+that.chatId,JSON.stringify(localMsg));
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message({
            message: "接口请求异常，请检查网络！",
            type: 'error'
          })
        })
      },
      getLastMsgs(){
        const that = this;
        var data = {
        	"chatid":that.chatId,
          "time":that.lastTime
        }
        that.$axios.$post(that.$api.lastMsgs(),this.qs.stringify(data),{progress: false }).then(function (res) {
          if(res.code==1){
            var list = res.data;

            if(list.length>0){

              if(that.isSysMsg==0){
                //如果存在系统消息，则刷新整个列表
                var type = list[0].type;
                if(type==2){
                  that.isSysMsg = 1;
                  that.getMsgList();
                  return false;
                }
              }
              if(that.lastTime!=list[0].created){
                that.lastTime = list[0].created;
                setTimeout(function(){
                  that.$nextTick(() => {
                    that.$refs['msg'].$refs['msgScroll'].wrap.scrollTop = that.$refs['msg'].$refs['msgScroll'].wrap.scrollHeight
                  })
                }, 100);
              }


              var msgList = list.reverse()
          		that.msgList = that.msgList.concat(msgList);
          	}
            var localMsg = that.msgList;
            localStorage.setItem("0gsf_msgList_"+that.chatId,JSON.stringify(localMsg));
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

<style>
</style>
