

module.exports = {

  userLogin:function(){
  	return process.env.baseUrl + 'typechoUsers/userLogin';
  },
  phoneLogin:function(){
  	return process.env.baseUrl + 'typechoUsers/phoneLogin';
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
