// pages/personalCenter/myPost/myPost.
var Bmob = require('../../../utils/bmob.js')
var util = require('../../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userId:0,
  
    thingInfo: { 
      product_id: 1, 
      thingStatus:"",
      thumbnail: '../../../images/collections/exm1.jpg',
      title: "iPad Air4 天蓝色 64G",
      discription: "超盖泡面神器！",
    },
    thingData:[
      { 
        product_id: 1, 
        thingStatus:"",
        thumbnail: '../../../images/collections/exm1.jpg',
        title: "iPad Air4 天蓝色 64G",
        discription: '超盖泡面神器！',
      },
      { 
        product_id: 2, 
        thingStatus:"",
        thumbnail: '../../../images/collections/exm2.jpg',
        title: "李斯丹妮签名照",
        discription: "乘风破浪的姐姐李四蛋亲笔签名，拥有它就拥有了姐姐的爱！",
      },
      { 
        product_id: 3, 
        thingStatus:"",
        thumbnail: '../../../images/collections/exm1.jpg',
        title: "现代软件工程",
        discription: "超级无敌棒棒棒的书！",
      },
    ],
    postList:[],
    productId: ''
  },

  onLoad: function () {
    var that = this;
    var userId = that.data.userId;

    wx.getStorage({  //异步获取缓存值studentId
      key: 'stuNumber',
      success: function (res) {
        that.setData({
          stuNumber: res.data
        })

      }
    })
   

  },
  onShow:function(){
    var that = this;
    var userId = that.data.userId;

    wx.getStorage({  //异步获取缓存值studentId
      key: 'stuNumber',
      success: function (res) {
        that.setData({
          stuNumber: res.data
        })

      }
    })
    wx.getStorage({  //异步获取缓存值userId
      key: 'userId',
      success: function (res) {
        that.setData({
          userId: res.data
        }),
        userId=res.data;

        wx.request({
          url:'http://localhost/viewMyPost.php',
          method: 'POST',
          data: {
            userId:res.data,
          },
          header: { 'content-type': 'application/x-www-form-urlencoded ' },
          success(res) {
            that.setData({
            postList:res.data.data,
            });
          },
          fail(err) {
            console.log(err);
          }
        })
    
      }
    })
  },

  onPullDownRefresh: function () {
    wx.setNavigationBarTitle({
      title: '我的发布'
    });
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标
    setTimeout(function () {
      wx.stopPullDownRefresh(); //停止加载
      wx.hideNavigationBarLoading(); //隐藏加载icon
    }, 2000)

  },

  onReachBottom: function () {
          wx.showToast({
            title: '已全部加载',
            icon: 'success',
            duration: 500
          })

  },

  toProductDetail(e) {
    var productId = e.currentTarget.dataset.id;
    console.log( productId);
    wx.setStorage({
      data: productId,
      key: 'productId',
    })
    wx.redirectTo({
      url: '../../../pages/show/show',
    })
  },

  finishPost: function (event) {
    var that = this;
    var productId = event.currentTarget.dataset.id;
    console.log("test");
    console.log(productId);
    wx.showModal({
      title: '操作提示',
      content: '确定交易已完成？',
      success: function (res) {
        if (res.confirm) {
          //完成发布的信息
          wx.request({
            url:'http://localhost/changeMyPost.php',
            method: 'POST',
            data: {
              productId:productId,
              state:'sold',
            },
            header: { 'content-type': 'application/x-www-form-urlencoded ' },
            success(res) {
              console.log(res);
              wx.showToast({
                title: '已完成交易',
                icon: 'success',
                duration: 500
              })
              that.onLoad();
              that.onShow();
            },
            fail(err) {
              console.log(err);
            }
          })
        }
      }
    })
  },
  toDelete(event) {
    var that = this;
    var productId = event.currentTarget.dataset.id;
    console.log("test");
    console.log(productId);
    wx.showModal({
      title: '操作提示',
      content: '确定要删除该发布？',
      success: function (res) {
        if (res.confirm) {
          //删除发布的信息
          wx.request({
            url:'http://localhost/changeMyPost.php',
            method: 'POST',
            data: {
              productId:productId,
              state:'delete',
            },
            header: { 'content-type': 'application/x-www-form-urlencoded ' },
            success(res) {
              console.log(res);
              wx.showToast({
                title: '已删除',
                icon: 'success',
                duration: 500
              })
              that.onLoad();
              that.onShow();
            },
            fail(err) {
              console.log(err);
            }
          })

      
       
        }
      }
    })
  
  },


})