<template>
  <div class="system">
    <div class="system-menu-bg" @click="menuShow=false" :class="menuShow?'show':''"></div>
    <div class="system-menu" :class="menuShow?'show':''">

      <div class="system-title">
        管理中心
      </div>
      <div class="system-menu-box" :class="type==0?'cur':''" @click="setType(0)">
        <div class="system-menu-main">
          <i class="el-icon-s-comment"></i>频道管理
        </div>
      </div>
      <div class="system-menu-box" :class="type==1?'cur':''" @click="setType(1)">
        <div class="system-menu-main">
          <i class="el-icon-s-release"></i>违禁词设置
        </div>
      </div>
      <div class="system-menu-box" :class="type==2?'cur':''" @click="setType(2)">
        <div class="system-menu-main">
          <i class="el-icon-warning"></i>黑名单
        </div>
      </div>
      <div class="system-menu-box" :class="type==3?'cur':''" @click="setType(3)">
        <div class="system-menu-main">
          <i class="el-icon-message-solid"></i>发送系统通知
        </div>
      </div>
    </div>
    <div class="system-concent">
      <div class="system-wap-header">
        <i class="el-icon-s-unfold" @click="menuShow=true"></i>管理中心
      </div>
      <template v-if="type==0">
        <div class="system-chatList">
          <div class="sf-chatList-type">
            <div class="sf-chatList-type-box" :class="chatStatus==1?'cur':''" @click="setChatStatus(1)">
              <span>进行中</span>
            </div>
            <div class="sf-chatList-type-box" :class="chatStatus==0?'cur':''" @click="setChatStatus(0)">
              <span>已关闭</span>
            </div>
          </div>
          <div class="chatAdd" @click="chatAddVisible=true">
            <i class="el-icon-plus"></i>
          </div>
          <div class="chatList">
            <div class="data-no" v-if="chatList.length==0">
              <i class="el-icon-chat-dot-square"></i>
              <p>暂无可用频道</p>
            </div>
            <div class="chatList-box"  v-for="(item,index) in chatList">
              <div class="chatList-box-main">
                <div class="chatList-box-avatar">
                  <el-image :src="'/chatAvatar/'+item.pic+'.jpg'"></el-image>
                </div>
                <div class="chatList-box-info">
                  <div class="chatList-box-name">
                     {{item.name}}
                  </div>
                  <div class="chatList-box-value">
                    <span class="num">{{item.totalMsg}}条消息</span>
                    <span @click="editChat(item)">编辑</span>
                    <template v-if="item.status==1">
                    <span @click="statusChat(item,0)">停止</span>
                    </template>
                    <template v-else>
                    <span @click="statusChat(item,1)">开启</span>
                    </template>
                    <span style="color: #F56C6C;" @click="deleteChat(item)">删除</span>
                    <span style="color: #67C23A;" @click="chatExcel(item)">导出聊天记录</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="type==1">
        <div class="system-form" v-if="configInfo!=null">

          <el-form ref="form"  label-position="top">
            <el-form-item label="违禁词(根据英文逗号分割)">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入违禁词"
                v-model="configInfo.banText">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveConfig()">保存设置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template v-if="type==2">

        <div class="system-ban">
          <div class="data-no" v-if="banList.length==0">
            <i class="el-icon-chat-dot-square"></i>
            <p>暂无封禁IP</p>
          </div>
          <div class="system-ban-box" v-for="(item,index) in banList">
            <div class="system-ban-main">
              <div class="system-ban-ip">
                {{item.ip}}
              </div>
              <div class="system-ban-btn">
                <span @click="deleteBan(item.id)">解除封禁</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="type==3">
        <div class="system-send">

          <el-form ref="form"  label-position="top">
            <el-form-item label="选择频道">
              <el-select v-model="value" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="消息内容">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入消息内容"
                v-model="systemMsg">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="sendSystemMsg()">立即发送</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </div>
    <el-dialog
      title="编辑聊天频道"
      :visible.sync="chatEditVisible"
      :modal="false"
      width="330px">
      <div class="dialog-form">
        <el-form ref="form"  label-position="top">
          <el-form-item label="频道名称">
            <el-input
              type="text"
              placeholder="请输入频道名称"
              v-model="curChatInfo.name">
            </el-input>
          </el-form-item>
          <el-form-item label="频道介绍">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入频道介绍"
              v-model="curChatInfo.intro">
            </el-input>
          </el-form-item>
          <el-form-item label="频道头像">
            <div class="chat-form-pic">
              <div class="chat-pic-box" v-for="item in 6" :class="curChatInfo.pic==item?'active':''" @click="curChatInfo.pic=item">
                <el-image :src="'/chatAvatar/'+item+'.jpg'"></el-image>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="primary" size="medium" @click="save()">保存信息</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="编辑聊天频道"
      :visible.sync="chatAddVisible"
      :modal="false"
      width="330px">
      <div class="dialog-form">
        <el-form ref="form"  label-position="top">
          <el-form-item label="频道名称">
            <el-input
              type="text"
              placeholder="请输入频道名称"
              v-model="curChatInfo.name">
            </el-input>
          </el-form-item>
          <el-form-item label="频道介绍">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入频道介绍"
              v-model="curChatInfo.intro">
            </el-input>
          </el-form-item>
          <el-form-item label="频道头像">
            <div class="chat-form-pic">
              <div class="chat-pic-box" v-for="item in 6" :class="curChatInfo.pic==item?'active':''" @click="curChatInfo.pic=item">
                <el-image :src="'/chatAvatar/'+item+'.jpg'"></el-image>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="primary" size="medium" @click="add()">确认增加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        menuShow:false,
        chatList:[],
        chatStatus:1,
        type:0,
        options: [],
        value: 1,
        systemMsg:"",

        configInfo:{
          "banText":''
        },
        curChatInfo:{
          "id":0,
          "name":"",
          "intro":"",
          "pic":0
        },
        chatEditVisible:false,
        chatAddVisible:false,

        banList:[]
      }
    },
    computed: {
      ...mapState({
        token: state => state.token
      })
    },
    created() {
      let that = this;
    },
    mounted(){
      let that = this;
      that.loadData();
    },
    methods: {
      loadData(){
        const that = this;
        var type = that.type;
        if(type==0){
          that.getChatList();
        }
        if(type==1){
          that.getConfigs();
        }
        if(type==2){
          that.getBanList();
        }
        if(type==3){
          that.getChatOptions();
        }
      },
      setType(type){
        const that = this;
        that.type = type;
        that.loadData();
      },
      setChatStatus(type){
        const that = this;
        that.chatStatus = type;
        that.chatList = [];
        that.getChatList();
      },
      getChatList(){
        const that = this;
        var chatStatus = that.chatStatus;
        var params = {
        	"status":chatStatus
        }
        var data = {
        	"searchParams":JSON.stringify(that.$api.removeObjectEmptyKey(params)),
        	"limit":100,
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
      },
      editChat(data){
        const that = this;
        that.curChatInfo = data;
        that.chatEditVisible = true;
      },
      save(){
        const that = this;
        var params = that.curChatInfo;
        var data = {
        	"params":JSON.stringify(that.$api.removeObjectEmptyKey(params)),
        	"token":that.token,
        }
        const loading = this.$loading({
          lock: true,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        that.$axios.$post(that.$api.chatUpdate(),this.qs.stringify(data),{progress: false }).then(function (res) {
          loading.close();
          if(res.code==1){
            that.chatEditVisible = false;
            that.curChatInfo ={
              "id":0,
              "name":"",
              "intro":"",
              "pic":0
            }
            that.$message({
              message:"操作成功！",
              type: 'success'
            })
            that.getChatList();
          }else{
            that.$message({
              message:res.msg,
              type: 'error'
            })
          }
        })
        .catch(function (error) {
          loading.close();
          console.log(error)
          that.$message({
            message: "接口请求异常，请检查网络！",
            type: 'error'
          })
        })
      },
      statusChat(params,type){
        const that = this;
        that.$confirm('确认要修改频道'+params.id+'的状态吗？', '操作提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          params.status = type;
          var data = {
          	"params":JSON.stringify(that.$api.removeObjectEmptyKey(params)),
          	"token":that.token,
          }
          const loading = this.$loading({
            lock: true,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          that.$axios.$post(that.$api.chatUpdate(),this.qs.stringify(data),{progress: false }).then(function (res) {
            loading.close();
            if(res.code==1){
              that.$message({
                message:"操作成功！",
                type: 'success'
              })
              that.getChatList();
            }else{
              that.$message({
                message:res.msg,
                type: 'error'
              })
            }
          })
          .catch(function (error) {
            loading.close();
            console.log(error)
            that.$message({
              message: "接口请求异常，请检查网络！",
              type: 'error'
            })
          })
        }).catch(() => {

        });
      },
      deleteChat(params){
        const that = this;
        that.$confirm('确认要删除频道'+params.id+'吗？', '操作提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {
          	"key":params.id,
          	"token":that.token,
          }
          const loading = this.$loading({
            lock: true,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          that.$axios.$post(that.$api.chatDelete(),this.qs.stringify(data),{progress: false }).then(function (res) {
            loading.close();
            if(res.code==1){
              that.$message({
                message:"操作成功！",
                type: 'success'
              })
              that.getChatList();
            }else{
              that.$message({
                message:res.msg,
                type: 'error'
              })
            }
          })
          .catch(function (error) {
            loading.close();
            console.log(error)
            that.$message({
              message: "接口请求异常，请检查网络！",
              type: 'error'
            })
          })
        }).catch(() => {

        });
      },
      add(){
        const that = this;
        var params = that.curChatInfo;
        var data = {
        	"params":JSON.stringify(that.$api.removeObjectEmptyKey(params)),
        	"token":that.token,
        }
        const loading = this.$loading({
          lock: true,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        that.$axios.$post(that.$api.chatAdd(),this.qs.stringify(data),{progress: false }).then(function (res) {
          loading.close();
          if(res.code==1){
            that.chatAddVisible = false;
            that.curChatInfo ={
              "id":0,
              "name":"",
              "intro":"",
              "pic":0
            }
            that.$message({
              message:"操作成功！",
              type: 'success'
            })
            that.getChatList();
          }else{
            that.$message({
              message:res.msg,
              type: 'error'
            })
          }
        })
        .catch(function (error) {
          loading.close();
          console.log(error)
          that.$message({
            message: "接口请求异常，请检查网络！",
            type: 'error'
          })
        })
      },
      getConfigs(){
        const that = this;
        var chatStatus = that.chatStatus;
        var data = {
        	"token":that.token,
        }
        that.$axios.$post(that.$api.getConfigs(),this.qs.stringify(data),{progress: false }).then(function (res) {
          if(res.code==1){
            that.configInfo = res.data;
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
      saveConfig(){
        const that = this;
        var params = that.configInfo;
        var data = {
        	"params":JSON.stringify(that.$api.removeObjectEmptyKey(params)),
        	"token":that.token,
        }
        const loading = this.$loading({
          lock: true,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        that.$axios.$post(that.$api.configsUpdate(),this.qs.stringify(data),{progress: false }).then(function (res) {
          loading.close();
          if(res.code==1){
            that.$message({
              message:"操作成功！",
              type: 'success'
            })
            that.getConfigs();
          }else{
            that.$message({
              message:res.msg,
              type: 'error'
            })
          }
        })
        .catch(function (error) {
          loading.close();
          console.log(error)
          that.$message({
            message: "接口请求异常，请检查网络！",
            type: 'error'
          })
        })
      },
      getBanList(){
        const that = this;
        var data = {
        	"limit":100,
          "token":that.token,
        }
        that.$axios.$post(that.$api.banList(),this.qs.stringify(data),{progress: false }).then(function (res) {
          if(res.code==1){
            var list = res.data;
            if(list.length>0){
          		that.banList = list;
          	}else{
          		that.banList = [];
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
      },
      deleteBan(id){
        const that = this;
        that.$confirm('确认要解除封禁吗？', '操作提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {
          	"key":id,
          	"token":that.token,
          }
          const loading = this.$loading({
            lock: true,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          that.$axios.$post(that.$api.banDelete(),this.qs.stringify(data),{progress: false }).then(function (res) {
            loading.close();
            if(res.code==1){
              that.$message({
                message:"操作成功！",
                type: 'success'
              })
              that.getBanList();
            }else{
              that.$message({
                message:res.msg,
                type: 'error'
              })
            }
          })
          .catch(function (error) {
            loading.close();
            console.log(error)
            that.$message({
              message: "接口请求异常，请检查网络！",
              type: 'error'
            })
          })
        }).catch(() => {

        });
      },
      getChatOptions(){
        const that = this;
        var params = {
        	"status":1
        }
        var data = {
        	"searchParams":JSON.stringify(that.$api.removeObjectEmptyKey(params)),
        	"limit":100,
        }
        that.$axios.$post(that.$api.chatList(),this.qs.stringify(data),{progress: false }).then(function (res) {
          if(res.code==1){
            var list = res.data;
            var options = [];
            for(var i in list){
              var arr = {
                value: list[i].id,
                label: list[i].name
              }
              options.push(arr);
            }
            that.options = options;
            console.log(JSON.stringify(options));
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
      sendSystemMsg(){
        const that = this;
        if(that.systemMsg==''){
          return false;
        }
        var data = {
        	"text":that.systemMsg,
          "chatid":that.value,
          "token":that.token,
        }
        const loading = this.$loading({
          lock: true,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        that.$axios.$post(that.$api.sendSystemMsg(),this.qs.stringify(data),{progress: false }).then(function (res) {
          loading.close();
          if(res.code==1){
            that.$message({
              message:"发送成功！",
              type: 'success'
            })
            that.getBanList();
          }else{
            that.$message({
              message:res.msg,
              type: 'error'
            })
          }
        })
        .catch(function (error) {
          loading.close();
          console.log(error)
          that.$message({
            message: "接口请求异常，请检查网络！",
            type: 'error'
          })
        })
      },
      chatExcel(item){
        const that = this;
        var chatid = item.id;
        var token = that.token;
        var url = that.$api.chatExcel(chatid,token);
        window.open(url);
      }
    }
  }
</script>

<style>
</style>
