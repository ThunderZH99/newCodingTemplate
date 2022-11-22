import Vue from 'vue'

var pipeService = new Vue({
    data: {
        ADDCIRCLE: 'add_circle',   //信号名称
        CLEAR: 'clear',
    },
    methods: {
        emitAddCircle: function (msg) {  //发送add_circle信号
            this.$emit(this.ADDCIRCLE, msg)
        },
        onAddCircle: function (callback) {  //接收add_circle信号
            this.$on(this.ADDCIRCLE, function (msg) {
                callback(msg)
            })
        },

        emitRemoteClear: function (msg) {  //发送clear信号
            this.$emit(this.CLEAR, msg)
        },
        onRemoteClear: function (callback) {  //发送clear信号
            this.$on(this.CLEAR, function (msg) {
                callback(msg)
            })
        },
        
    }
})

export default pipeService
