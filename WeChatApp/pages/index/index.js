//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userName: "",
    password: "",
    errorMessage: "",
  },

  bindNameInput: function(event){
      this.setData({userName : event.detail.value})
  },
  
  bindPasswordInput: function(event){
    this.setData({ password: event.detail.value })
  },
  //事件处理函数
  bindViewTap: function() {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/login', 
      method: "POST",
      data: {
        username: this.data.userName,
        password: this.data.password
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if(res.data.status == '0'){
          app.globalData.userLogged = true;
          wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
          wx.setStorageSync("user", res.data.data);
          wx.navigateTo({
            url: '../home/home'
          })
        }else{
          that.setData({"errorMessage" : "用户名或密码错误"});
        }
      }
    }); 
  },
  onLoad: function () {
   },
   
})
