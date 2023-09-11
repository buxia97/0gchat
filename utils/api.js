

module.exports = {
  sendMsg:function(){
  	return process.env.baseUrl + 'chatMsg/sendMsg';
  },
  sendSystemMsg:function(){
  	return process.env.baseUrl + 'chatMsg/sendSystemMsg';
  },
  msgDelete:function(){
  	return process.env.baseUrl + 'chatMsg/msgDelete';
  },
  banUser:function(){
  	return process.env.baseUrl + 'chatMsg/banUser';
  },
  msgList:function(){
  	return process.env.baseUrl + 'chatMsg/msgList';
  },
  lastMsgs:function(){
  	return process.env.baseUrl + 'chatMsg/lastMsgs';
  },

  chatAdd:function(){
  	return process.env.baseUrl + 'chatChat/chatAdd';
  },
  chatUpdate:function(){
  	return process.env.baseUrl + 'chatChat/chatUpdate';
  },
  chatDelete:function(){
  	return process.env.baseUrl + 'chatChat/chatDelete';
  },
  chatList:function(){
  	return process.env.baseUrl + 'chatChat/chatList';
  },

  isToken:function(){
  	return process.env.baseUrl + 'chatConfigs/isToken';
  },
  configsUpdate:function(){
  	return process.env.baseUrl + 'chatConfigs/configsUpdate';
  },

  banList:function(){
  	return process.env.baseUrl + 'chatConfigs/banList';
  },
  banDelete:function(){
  	return process.env.baseUrl + 'chatConfigs/banDelete';
  },
  getNameList(){
    var nameList = ["你一定要幸福啊","这人更是寄吧","我徒弟呢","只因叫","道理都懂","你说得对，但...","小黑子","纯鹿人","群扑街","处男教教主","纯爱战神","嘤嘤嘤","黄皮耗子","蒜头王八","尼古丁真","芙蓉王源","保守派","革新派","Van♂游戏","杰哥","阿伟","比利♂王","背带裤男孩","练习两年半","你是来拉屎的吧","加特林菩萨","寄！","大E了没有闪","你是歌姬吧","原神，启动！","日内瓦退钱","盖亚！！！","路过的假面骑士","吃屎啦梁非凡","登duang朗","Giao哥","蒙古上单","你所爱就是你生活","影流之主","单走一个6","铁山靠","暗黑♂佟大为","渣渣灰","真ikun","Duang","3D区耶路撒冷","生产队的驴","家人们谁懂啊","撒日朗","借一部说话"]
  	return nameList;
  },
  removeObjectEmptyKey(json) {
      var value;
      for (var key in json) {
          if (json.hasOwnProperty(key)) {
              value = json[key];
              if (value === undefined || value === '' || value === null) {
                  delete json[key]
              }
          }
      }
      return json;
  },

}
