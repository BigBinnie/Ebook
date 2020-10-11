const app = getApp()
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    carouselImgUrls: [
      "../../assets/book1.jpg",
      "../../assets/book2.jpg",
      "../../assets/book3.jpg",
      "../../assets/book4.jpg"
    ],
    searchValue:"",
    book: null,
    active:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (!app.globalData.userLogged){
      wx.navigateTo({
        url: '../index/index'
      })
    }else{
      wx.request({
        url: 'http://localhost:8080/getBooks',
        method: "POST",
        data: {
          1:1
        },
        header: {
          'content-type': 'application/json',
          'cookie': wx.getStorageSync("sessionid")
        },
        success(res) {
          console.log(res);
          that.setData({
            books: res.data
          })
        }
      });
    }
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
   * 获取书籍详情
   */
  bindViewTap: function (event) {
    this.setData({ show: true, book: event.currentTarget.dataset.book});
    wx.setStorageSync("book",this.data.book);
    wx.navigateTo({
      url: '../bookdetail/bookdetail',
    })
  },

  /**
   * 点击底边栏 
   */
  onChange(event) {
    this.setData({ active: event.detail });
  },

  /**
   * 购物车界面
   */
  onClickCart(){
    wx.navigateTo({
      url: '../cart/cart'
    })
  },

  /**
   * 订单界面
   */
  onClickOrder(){
    wx.navigateTo({
      url: '../order/order'
    })
  },  
  
  /**
   * 用户资料界面
   */
  onClickProfile(){
    wx.navigateTo({
      url: '../profile/profile'
    })
  }, 
  
  /**
   * 搜索
   */
  onChange(e) {
    this.setData({
      searchvalue: e.detail
    });
  },

  onSearch() {
    wx.showToast({
      title: '暂时不能搜索',
      icon: 'none',
      duration: 2000
    })
  },


})