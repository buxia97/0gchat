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
          <div class="sf-operate-box cur">
            <div class="sf-operate-main">
              <i class="el-icon-s-comment"></i>
              频道
            </div>
          </div>
          <div class="sf-operate-box">
            <div class="sf-operate-main">
              <i class="el-icon-s-promotion"></i>
              QQ群
            </div>
          </div>
          <div class="sf-operate-box">
            <div class="sf-operate-main">
              <i class="el-icon-question"></i>
              关于
            </div>
          </div>
        </div>
        <div class="sf-concent">

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
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
