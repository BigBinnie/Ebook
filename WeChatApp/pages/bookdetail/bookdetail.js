// pages/bookdetail/bookdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        book:wx.getStorageSync('book')
    })
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
   * 加入购物车
   */
  onClickButtonCart() {
    console.log(this.data.book);
    var that = this;
    var ID=JSON.parse(wx.getStorageSync('user').userId);
    wx.request({
      url: 'http://localhost:8080/addCart', 
      method: "POST",
      data: {
        bookId: this.data.book.bookId,
        userId: ID
      },
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")
      },
      success(res) {
        console.log("add cart")
        wx.showToast({
          title: '已成功加入购物车',
          icon: 'none',
          duration: 2000
        })
      }
    }); 
  },
 
  /**
   * 下订单 
   */
  onClickButtonOrder() {
    var that = this;
    var ID=JSON.parse(wx.getStorageSync('user').userId);
    wx.request({
      url: 'http://localhost:8080/addOrder', 
      method: "POST",
      data: {
        bookId: this.data.book.bookId,
        userId: ID
      },
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")
      },
      success(res) {
        console.log("add order")
        wx.showToast({
          title: '购买成功',
          icon: 'none',
          duration: 2000
        })
      }
    }); 
  },
  
  /**
   * 返回店铺
   */
  onClickMarket() {
    wx.navigateBack({
    })
  }
})
