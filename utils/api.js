

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
