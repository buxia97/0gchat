<template>
  <div class="msg">
    <el-scrollbar style="height: 100%;" ref="msgScroll">
    <div class="msg-box" v-for="(item,index) in msgList" :class="userKey==item.userKey?'my':''">
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
            <div class="msg-text" v-html="replaceNewlinesWithBr(item.text)">
            </div>
          </div>
        </div>
      </div>
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
        userInfo: state => state.userInfo
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
      }
    },

  }
</script>

<style>
</style>
