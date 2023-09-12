<template>
  <div class="chatList">
    <div class="data-no" v-if="chatList.length==0">
      <i class="el-icon-chat-dot-square"></i>
      <p>暂无可用频道</p>
    </div>
    <div class="chatList-box" v-for="(item,index) in chatList" @click="goChat(item)">
      <div class="chatList-box-main">
        <div class="chatList-box-avatar">
          <el-image :src="'/chatAvatar/'+item.pic+'.jpg'"></el-image>
        </div>
        <div class="chatList-box-info">
          <div class="chatList-box-name">
            {{item.name}}
          </div>
          <div class="chatList-box-value">
            <template v-if="item.lastMsg.length > 0">
              <span class="chatList-box-lastMsg" :class="item.lastMsg[0].type==2?'sysMsg':''">{{item.lastMsg[0].userName}}：{{item.lastMsg[0].text}}</span>
              
              <span class="chatList-box-time">{{caculateTimeago(item.lastMsg[0].created)}}</span>
            </template>
            <template v-else>
              暂无消息
            </template>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
        chatList: {
            type: Array,
            default: () => []
        }
    },
     methods: {
      replaceAll(string, search, replace) {
        return string.split(search).join(replace);
      },
      replaceSpecialChar(text) {
        text = text.replace(/&quot;/g, '"');
        text = text.replace(/&amp;/g, '&');
        text = text.replace(/&lt;/g, '<');
        text = text.replace(/&gt;/g, '>');
        text = text.replace(/&nbsp;/g, ' ');
        return text;
      },
      caculateTimeago(dateTimeStamp) {
        dateTimeStamp = dateTimeStamp * 1000;
        const minute = 1000 * 60; // 把分，时，天，周，半个月，一个月用毫秒表示

        const hour = minute * 60;
        const day = hour * 24;
        const week = day * 7;
        const now = new Date().getTime(); // 获取当前时间毫秒

        const diffValue = now - dateTimeStamp; // 时间差

        let result = '';

        if (diffValue < 0) {
          return;
        }

        const minC = diffValue / minute; // 计算时间差的分，时，天，周，月

        const hourC = diffValue / hour;
        const dayC = diffValue / day;
        const weekC = diffValue / week;

        if (weekC >= 1 && weekC <= 4) {
          result = ` ${parseInt(weekC, 10)}周前`;
        } else if (dayC >= 1 && dayC <= 6) {
          result = ` ${parseInt(dayC, 10)}天前`;
        } else if (hourC >= 1 && hourC <= 23) {
          result = ` ${parseInt(hourC, 10)}小时前`;
        } else if (minC >= 1 && minC <= 59) {
          result = ` ${parseInt(minC, 10)}分钟前`;
        } else if (diffValue >= 0 && diffValue <= minute) {
          result = '刚刚';
        } else {
          const datetime = new Date();
          datetime.setTime(dateTimeStamp);
          const Nyear = datetime.getFullYear();
          const Nmonth = datetime.getMonth() + 1 < 10 ? `0${datetime.getMonth() + 1}` : datetime.getMonth() + 1;
          const Ndate = datetime.getDate() < 10 ? `0${datetime.getDate()}` : datetime.getDate();
          result = `${Nyear}-${Nmonth}-${Ndate}`;
        }

        return result;
      },
      goChat(data){
        const that = this;
        var id = data.id;
        that.$store.commit('setCurChat', id);
        that.$parent.curChatInfo = data;
      }
     }

    }
</script>

<style>
</style>
