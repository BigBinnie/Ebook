// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var ID=JSON.parse(wx.getStorageSync('user').userId);
    console.log(ID);
      wx.request({
        url: 'http://localhost:8080/getUser',
        method: "POST",
        data: {
          id:ID,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'cookie': wx.getStorageSync("sessionid")
        },
        success(res) {
          console.log(res);
          that.setData({
            user: res.data
          })
        }
      });
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 登出函数
   */
  bindViewTap: function() {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/logout', 
      method: "POST",
      data: {
        1:1
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        }
    });
    wx.removeStorageSync('user');
    wx.removeStorageSync('sessionid');
    wx.reLaunch({
      url: '../index/index',
    })

  },
})