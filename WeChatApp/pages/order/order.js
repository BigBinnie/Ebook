// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:"https://i.loli.net/2020/05/17/KsjY2NkVJH3qPmD.jpg",
    orders:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ID=JSON.parse(wx.getStorageSync('user').userId);
    var that = this;
    wx.request({
      url: 'http://localhost:8080/getOrders',
      method: "POST",
      data: {
        userId:ID
      },
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")
      },
      success(res) {
        console.log(res);
        let data=res.data;
        for(var item in data){
          data[item].totPrice=data[item].totPrice.toFixed(2);
          console.log(data[item]);
        }
        that.setData({
          orders: res.data
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

  }
})