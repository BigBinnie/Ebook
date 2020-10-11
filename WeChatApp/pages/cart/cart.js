// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:"https://i.loli.net/2020/05/17/KsjY2NkVJH3qPmD.jpg",
    carts:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ID=JSON.parse(wx.getStorageSync('user').userId);
    var that = this;
    wx.request({
      url: 'http://localhost:8080/getCarts',
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
        that.setData({
          carts: res.data
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

  onClickIcon() {
    Toast('点击图标');
  },

  /**
   * 返回店铺
   */
  onClickMarket() {
    wx.navigateBack({
    })
  },

  onClickClearCart(){
    var ID=JSON.parse(wx.getStorageSync('user').userId);
    var that = this;
    wx.request({
      url: 'http://localhost:8080/clearCart',
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
        that.setData({
          carts: res.data
        })
      }
    });
  },

  onClose(event) {
    //import Dialog from 'path/to/@vant/weapp/dist/dialog/dialog';
    const { position, instance } = event.detail;
    var dataset=event.currentTarget.dataset;
    var cartId=dataset.id;
    console.log(event);
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        wx.request({
          url: 'http://localhost:8080/deleteCart',
          method: "POST",
          data: {
            id:cartId,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': wx.getStorageSync("sessionid")
          },
          success(res) {
            console.log(res);
          }});
        var ID=JSON.parse(wx.getStorageSync('user').userId);
        var that = this;
        wx.request({
          url: 'http://localhost:8080/getCarts',
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
            that.setData({
              carts: res.data
            })
          }
        });
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 2000
        })
        break;
    }
  },
  /**
   * 下订单 
   */
  onClickButtonOrder(event) {
    var that = this;
    var ID=JSON.parse(wx.getStorageSync('user').userId);
    var bookId=event.currentTarget.dataset.bookid;
    console.log(bookId);
    console.log(event);
    wx.request({
      url: 'http://localhost:8080/addOrder', 
      method: "POST",
      data: {
        bookId: bookId,
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
})