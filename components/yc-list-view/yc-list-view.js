Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loading: {
      type: Boolean,
      value: 'no',
      observer: function(newVal, oldVal, changedPath) {
      }
    },
    yc: String
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  lifetimes: {
    attached: function(e) {
    },
    ready: function(){
      console.log(this.data)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
  }
})
