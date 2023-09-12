<template>
  <div class="msg">
    <el-scrollbar style="height: 100%;" ref="msgScroll">
    <div class="msg-box" v-for="(item,index) in msgList" :class="userKey==item.userKey?'my':''">
      <template v-if="item.type!=2">
        <div class="msg-main">
          <div class="msg-avatar">
            <el-image :src="'/avatar/'+item.avatar+'.webp'"></el-image>
          </div>
          <div class="msg-concent">
            <div class="msg-concent-value">
              <span class="mag-userName">{{item.userName}}</span>
              <span class="mag-postTime">{{formatDate(item.created)}}</span>

            </div>
            <div class="msg-concent-text">
              <!--判断消息类型-->
              <template v-if="item.type==0">
                <div class="msg-text" v-html="replaceNewlinesWithBr(item.text)">
                </div>
              </template>
              <template v-if="item.type==3">
                <div class="msg-text">
                    <a :href="item.url"><i class="el-icon-link"></i>{{item.text}}</a>
                </div>
              </template>

              <div class="msg-system-btn" v-if="token!=''">
                <span @click="banIp(item)">封禁</span>
                <span @click="deleteMsg(item.id)">删除</span>
              </div>
            </div>


          </div>
        </div>
      </template>
      <template v-if="item.type==2">
        <div class="msg-system">
          <div class="msg-system-text">
          {{item.userName}} : {{item.text}}
          </div>
        </div>
      </template>
    </div>
    </el-scrollbar>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    props: {
        msgList: {
            type: Array,
            default: () => []
        }
    },
    data() {
      return {
        userKey:null,
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo,
        token: state => state.token
      })
    },
    watch: {
      userInfo(newValue, oldValue){
        const that = this;
         if(that.userInfo!=null){
           that.userKey = that.userInfo.userKey;
         }
      }
    },
    mounted() {
      let that = this;
      if(that.userInfo!=null){
        that.userKey = that.userInfo.userKey;
      }

    },
    methods: {
      formatDate(datetime) {
      	var datetime = new Date(parseInt(datetime * 1000));
      	var year = datetime.getFullYear(),
      		month = ("0" + (datetime.getMonth() + 1)).slice(-2),
      		date = ("0" + datetime.getDate()).slice(-2),
      		hour = ("0" + datetime.getHours()).slice(-2),
      		minute = ("0" + datetime.getMinutes()).slice(-2);
      	var result = year + "-" + month + "-" + date + " " + hour + ":" + minute;
      	return result;
      },
      replaceNewlinesWithBr(text) {
        return text.replace(/\n/g, '<br>');
      },
      banIp(item){
        const that = this;
        that.$confirm('确认要封禁'+item.ip+'吗？', '操作提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {
          	"ip":item.ip,
            "chatid":item.chatid,
          	"token":that.token,
          }
          const loading = this.$loading({
            lock: true,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          that.$axios.$post(that.$api.banUser(),this.qs.stringify(data),{progress: false }).then(function (res) {
            loading.close();
            if(res.code==1){
              that.$message({
                message:"操作成功！",
                type: 'success'
              })
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
      deleteMsg(id){

      }
    },

  }
</script>

<style>
</style>
