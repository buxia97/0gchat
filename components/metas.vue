<template>
  <div class="sf-metas">
    <div class="sf-metas-concent">
      <div class="sf-metas-box">
        <div class="sf-metas-main">
          <div class="sf-metas-avatar">
            <el-image src="/meta.jpg"></el-image>
          </div>
          <div class="sf-metas-info">
            <div class="sf-metas-title">
              零重力科幻交流群3
            </div>
            <div class="sf-metas-btn">
              <el-button type="primary" size="small" @click="goLinks('http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=_3rd_JfWpcHxM4D4Xh97hBhMtspHzPAV&authKey=Z%2Bks1j3swwxjafE8UOkLXHuMTm3RyUGFaE4qbYBLFcM5SjgUNMSEJ3qfm8ATNxDd&noverify=0&group_code=719285106')">立即加入</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="sf-metas-box">
        <div class="sf-metas-main">
          <div class="sf-metas-avatar">
            <el-image src="/meta.jpg"></el-image>
          </div>
          <div class="sf-metas-info">
            <div class="sf-metas-title">
              零重力科幻交流群4
            </div>
            <div class="sf-metas-btn">
              <el-button type="primary" size="small" @click="goLinks('http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=5qylKsTAj093tgXPJqcYviQiQhE3SIRE&authKey=q%2FSO2P0nxB%2FJU4MPT7ZR2ItCl6pHd1iYMljZXeYdtq0fnmftGkCUEBltHhDLDQ%2Bl&noverify=0&group_code=817580786')">立即加入</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="sf-metas-box">
        <div class="sf-metas-main">
          <div class="sf-metas-avatar">
            <el-image src="/meta.jpg"></el-image>
          </div>
          <div class="sf-metas-info">
            <div class="sf-metas-title">
              零重力科幻导航群
            </div>
            <div class="sf-metas-btn">
              <el-button type="primary" size="small" @click="goLinks('http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=3BR9U6FgXDeA1FLmk4HFCPPgo10pL3ye&authKey=Sr8gRujggju5gaNkQXTE34qcUCWo%2F7PVa3qeRkc4JLtlPiAZEW%2BRqp5%2BxIUreHwK&noverify=0&group_code=893548490')">立即加入</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="sf-metas-box">
        <div class="sf-metas-main">
          <div class="sf-metas-avatar">
            <el-image src="/metaWeb.png"></el-image>
          </div>
          <div class="sf-metas-info">
            <div class="sf-metas-title">
              零重力科幻官网
            </div>
            <div class="sf-metas-btn">
              <el-button type="success" size="small" @click="goLinks('https://www.0gsf.com/')">点击访问</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="sf-metas-box">
        <div class="sf-metas-main">
          <div class="sf-metas-avatar">
            <el-image src="/meta.jpg"></el-image>
          </div>
          <div class="sf-metas-info">
            <div class="sf-metas-title">
              零重力科幻官方微博
            </div>
            <div class="sf-metas-btn">
              <el-button type="success" size="small" @click="goLinks('https://weibo.com/p/1005057307765910')">了解更多</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="sf-metas-box">
        <div class="sf-metas-main">
          <div class="sf-metas-avatar">
            <el-image src="/meta.jpg"></el-image>
          </div>
          <div class="sf-metas-info">
            <div class="sf-metas-title">
              零重力科幻微信公众号
            </div>
            <div class="sf-metas-btn">
              <el-button type="success" size="small">扫码关注</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    created() {
      let that = this;
    },
    methods: {
      goLinks(url){
        window.open(url);
      },
    },
  }
</script>

<style>

</style>
