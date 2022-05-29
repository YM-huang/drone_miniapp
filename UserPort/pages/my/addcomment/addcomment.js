
Page({
    data: {
      windowHeight: 'auto',
      commentList: [
        {
          commodityIcon: '/images/example0.png',
          commodityId: 1
        }
      ]
    },
  async onShow() {
      // 页面显示
      var vm = this
      var commentList = vm.data.commentList;
      // 初始化评论选项为好评
      for (var i = 0, len = commentList.length; i < len; i++) {
        commentList[i].commentType = 'GOOD';
      }
      vm.setData({
        commentList: commentList
      });
    },
    selectCommentType: function (e) {
      console.log('选中的是第几条评论的哪一种类型', e.currentTarget.dataset);
      var commentList = this.data.commentList;
      var index = parseInt(e.currentTarget.dataset.index);
      commentList[index].commentType = e.currentTarget.dataset.type;
      this.setData({
        'commentList': commentList
      });
    },
    saveContent: function (e) {
      console.log('保存评论到列表', e.detail.value, e.currentTarget.dataset.index);
      var vm = this;
      var commentList = vm.data.commentList;
      var index = e.currentTarget.dataset.index;
      commentList[index].content = e.detail.value;
      vm.setData({
        commentList: commentList
      });
    },
    async submitComment(e) {
      var vm = this;
      var c1 = new wx.cloud.Cloud({
        // 资源方 小程序A的 AppID
        resourceAppid: 'wx145f71cc609485c9',
        // 资源方 小程序A的 的云开发环境ID
        resourceEnv: 'cloud1-4g02yqp27aa7e10a',
    })
      await c1.init()
      wx.cloud.callFunction({
        name:'getOpenid',
      }).then(res=>{
          console.log(res)//res就将appid和openid返回了
          //做一些后续操作，不用考虑代码的异步执行问题。
          let _openid=res.result.OPENID
          c1.database().collection("cus_info").where({
            _openid: _openid
          }).get()
          .then(res=>{
            console.log(res.data)
            let photo=res.data[0].userInfo.avatarUrl;
            let tocustomer=res.data[0].userInfo.nickName;
            this.setData({
              photo:photo
            })
            c1.database().collection("t_describe").where({
              tocustomer: tocustomer
            }).get()
            .then(res=>{
              console.log(res.data)
                this.setData({

                })
            })
            })
      })
      console.log('查看表单e', id);
      var commentList = [];
      for (var i = 0, len = vm.data.commentList.length; i < len; i++) {
        commentList.push({
          commodityId: vm.data.commentList[i].commodityId,
          content: e.detail.value['content_' + i],
          score: vm.data.commentList[i].commentType
        });
      }
      console.log('提交评价参数', {
        comments: commentList
      });
    }
  })