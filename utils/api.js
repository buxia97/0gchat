

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
  getConfigs:function(){
  	return process.env.baseUrl + 'chatConfigs/getConfigs';
  },

  configsUpdate:function(){
  	return process.env.baseUrl + 'chatConfigs/configsUpdate';
  },

  banList:function(){
  	return process.env.baseUrl + 'chatBan/banList';
  },
  banDelete:function(){
  	return process.env.baseUrl + 'chatBan/banDelete';
  },
  getNameList(){
    var nameList = ["你一定要幸福啊","这人更是寄吧","我徒弟呢","只因叫","道理都懂","你说得对，但...","小黑子","纯鹿人","我只心疼GieGie","处男教教主","纯爱战神","嘤嘤嘤","黄皮耗子","蒜头王八","尼古丁真","芙蓉王源","保守派","革新派","Van♂游戏","杰哥","阿伟","比利♂王","背带裤男孩","练习两年半","你是来拉屎的吧","加特林菩萨","寄！","大E了没有闪","你是歌姬吧","原神，启动！","日内瓦退钱","盖亚！！！","路过的假面骑士","吃屎啦梁非凡","登duang朗","Giao哥","蒙古上单","你所爱就是你生活","影流之主","单走一个6","铁山靠带宗师","暗黑♂破坏神","渣渣灰","真ikun","Duang","西瓜头","生产队的驴","家人们谁懂啊","撒日朗","哦♂耶","我是神里绫华的狗","想做嘉然小姐的狗","不明真相的吃瓜群众","伞兵一号卢本伟","给阿姨倒杯卡布奇诺","乌鸦坐飞机","黑龙江系军阀","打工是不可能打工的","野兽先辈","下北泽市长","我家蛮大的","哼哼哼啊啊啊啊啊","你好骚啊","你怎么穿品如的衣服","孤睾游侠","我这里有好康的","人类高质量男性","敞篷车男孩","这就是你分手的借口","我偷电瓶车养你","你来得正是时候","OvO","杀马特团长"]
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
