import mitt from 'mitt'

const bus = mitt()

var pipeService = {
    
    SELECT_DISTRICT: 'select_district',   //信号名称
    SELECT_STATION: 'select_station',
    
    emitSelectDistrict: function (msg) {
        bus.emit(this.SELECT_DISTRICT, msg)
    },
    onSelectDistrict: function (callback) {
        bus.on(this.SELECT_DISTRICT, function (msg) {
            callback(msg)
        })
    },

    emitSelectStation: function (msg) {
        bus.emit(this.SELECT_STATION, msg)
    },
    onSelectStation: function (callback) {
        bus.on(this.SELECT_STATION, function (msg) {
            callback(msg)
        })
    },
        
}

export default pipeService
