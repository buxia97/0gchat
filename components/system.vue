<template>
  <div class="system">
    <div class="system-menu">
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
      <template v-if="type==0">
        <div class="system-chatList">
          <div class="sf-chatList-type">
            <div class="sf-chatList-type-box cur">
              <span>进行中</span>
            </div>
            <div class="sf-chatList-type-box">
              <span>已关闭</span>
            </div>
          </div>
          <div class="chatList">
            <div class="chatList-box">
              <div class="chatList-box-main">
                <div class="chatList-box-avatar">
                  <el-image src="/avatar/2.jfif"></el-image>
                </div>
                <div class="chatList-box-info">
                  <div class="chatList-box-name">
                    测试的征文标题内容
                  </div>
                  <div class="chatList-box-value">
                    <span class="num">100条消息</span><span>编辑</span><span>停止</span><span style="color: #F56C6C;">删除</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="chatList-box">
              <div class="chatList-box-main">
                <div class="chatList-box-avatar">
                  <el-image src="/avatar/2.jfif"></el-image>
                </div>
                <div class="chatList-box-info">
                  <div class="chatList-box-name">
                    测试的征文标题内容
                  </div>
                  <div class="chatList-box-value">
                    <span class="num">100条消息</span><span>编辑</span><span>停止</span><span style="color: #F56C6C;">删除</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="type==1">
        <div class="system-form">

          <el-form ref="form"  label-position="top">
            <el-form-item label="违禁词(根据英文逗号分割)">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入违禁词"
                v-model="forbidden">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template v-if="type==2">
        <div class="system-ban">
          <div class="system-ban-box">
            <div class="system-ban-main">
              <div class="system-ban-ip">
                127.0.0.1
              </div>
              <div class="system-ban-btn">
                <span>解除封禁</span>
              </div>
            </div>
          </div>
          <div class="system-ban-box">
            <div class="system-ban-main">
              <div class="system-ban-ip">
                127.0.0.1
              </div>
              <div class="system-ban-btn">
                <span>解除封禁</span>
              </div>
            </div>
          </div>
          <div class="system-ban-box">
            <div class="system-ban-main">
              <div class="system-ban-ip">
                127.0.0.1
              </div>
              <div class="system-ban-btn">
                <span>解除封禁</span>
              </div>
            </div>
          </div>
          <div class="system-ban-box">
            <div class="system-ban-main">
              <div class="system-ban-ip">
                127.0.0.1
              </div>
              <div class="system-ban-btn">
                <span>解除封禁</span>
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
                v-model="forbidden">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">立即发送</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        type:0,
        forbidden:"",
        options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value: ''
      }
    },
    created() {
      let that = this;
    },
    methods: {
      setType(type){
        const that = this;
        that.type = type;
      },
    }
  }
</script>

<style>
</style>
