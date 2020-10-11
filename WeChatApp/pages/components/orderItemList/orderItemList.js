// pages/components/orderItemList/orderItemList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderItems:Array,
    orderId:null,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  attached(){
    wx.request({
      url: 'http://localhost:8080/getOrderItems',
      method: "POST",
      data: {
        id:orderId,
      },
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")
      },
      success(res) {
        console.log(res);
        this.setData({
          orderItems:res,
        })       
      }});
  }

})
