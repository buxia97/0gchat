<template>
  <div class="chat">
    <div class="chat-wap-header">
        <i class="el-icon-arrow-left"></i>
        <div class="chat-wap-title">测试的征文标题内容</div>
        <div class="chat-wap-chat-avatar">
          <el-image src="/avatar/2.jfif"></el-image>
          <i class="el-icon-caret-bottom"></i>
        </div>
    </div>
    <div class="chat-header">
      <div class="chat-avatar">
        <el-image src="/avatar/2.jfif"></el-image>
      </div>
      <div class="chat-info">
        <div class="chat-info-name">
          测试的征文标题内容<span>热度100</span>
        </div>
        <div class="chat-intro">
          这是聊天频道的介绍信息，方便用来介绍。这是聊天频道的介绍信息，方便用来介绍。这是聊天频道的介绍信息，方便用来介绍。这是聊天频道的介绍信息，方便用来介绍。这是聊天频道的介绍信息，方便用来介绍。
        </div>
      </div>
    </div>
    <div class="chat-msg">
      <msg/>
    </div>
    <div class="chat-input">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入消息内容"
        v-model="msg">
      </el-input>
      <div class="chat-btn">
        <el-button type="text" size="small" icon="el-icon-picture"></el-button>
        <el-button type="text" size="small" icon="el-icon-paperclip"></el-button>
        <el-button type="primary" icon="el-icon-position" size="small">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: ''
      }
    }
  }
</script>

<style>
</style>
