// pages/index/submit/process1/process1.js
//引入事先写好的日期设置util.js文件
var datePicker = require('../../../../utils/dateSetting.js')
 
//设定当前的时间，将其设定为常量
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;

Page({
    data: {
      time: '',
      multiArray: [],
      multiIndex: [0, 0, 0, 0, 0],
      choose_year: "",
      active: 1,
    },
    gotoPageProcess2:function (options) {
      wx.redirectTo({
              url: '../process2/process2',//要跳转到的页面路径
        })
    },
    gotoPageSubmit:function (options) {
        wx.navigateTo({
              url: '../submit',//要跳转到的页面路径
        })
    },
    onLoad: function () {
      this.setData({
        multiArray:
          [
            [year + "年", year + 1 + "年", year + 2 + "年"],
            datePicker.determineMonth(),
            datePicker.determineDay(year, month),
            datePicker.determineHour(),
            datePicker.determineMinute()
          ],
      })
    },
    //最后呈现时间的函数。
    bindMultiPickerChange: function (e) {
      var dateStr = this.data.multiArray[0][this.data.multiIndex[0]] +
        this.data.multiArray[1][this.data.multiIndex[1]] +
        this.data.multiArray[2][this.data.multiIndex[2]] +
        this.data.multiArray[3][this.data.multiIndex[3]] +
        this.data.multiArray[4][this.data.multiIndex[4]];
      this.setData({
        time: dateStr
      })
    },
    //当时间选择器呈现并进行滚动选择时间时调用该函数。
    bindMultiPickerColumnChange: function (e) {
      //e.detail.column记录哪一行发生改变，e.detail.value记录改变的值（相当于multiIndex）
      switch (e.detail.column) {
        //这里case的值有0/1/2/3/4,但除了需要记录年和月来确定具体的天数外，其他的都可以暂不在switch中处理。
        case 0:
          //记录改变的年的值
          let year = this.data.multiArray[0][e.detail.value];
          this.setData({
            choose_year: year.substring(0, year.length - 1)
          })
          break;
        case 1:
          //根据选择的年与月，确定天数，并改变multiArray中天的具体值
          let month = this.data.multiArray[1][e.detail.value];
          let dayDates = datePicker.determineDay(this.data.choose_year, month.substring(0, month.length - 1));
          //这里需要额外注意，改变page中设定的data，且只要改变data中某一个值，可以采用下面这种方法
          this.setData({
            ['multiArray[2]']: dayDates
          })
          break;
      }
      //同上，上面改变的是二维数组中的某一个一维数组，这个是改变一个一维数组中某一个值，可供参考。
      this.setData({
        ["multiIndex[" + e.detail.column + "]"]: e.detail.value
      })
    },
})