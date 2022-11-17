import Vue from 'vue'

var pipeService = new Vue({
    data: {
        ADDCIRCLE: 'add_circle',
        CLEAR: 'clear',
    },
    methods: {
        emitAddCircle: function (msg) {
            this.$emit(this.ADDCIRCLE, msg)
        },
        onAddCircle: function (callback) {
            this.$on(this.ADDCIRCLE, function (msg) {
                callback(msg)
            })
        },

        emitRemoteClear: function (msg) {
            this.$emit(this.CLEAR, msg)
        },
        onRemoteClear: function (callback) {
            this.$on(this.CLEAR, function (msg) {
                callback(msg)
            })
        },
        
    }
})

export default pipeService
