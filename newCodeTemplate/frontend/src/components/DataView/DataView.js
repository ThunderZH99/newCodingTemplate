// /* global d3 $ */
import dataService from '../../service/dataService.js'
import globalConfig from '../../service/globalConfig.js'
import pipeService from '../../service/pipeService'
import DrawChart from './drawChart.js'

export default {
    name: 'DataView',
    components: {
    },
    props: {
        videoId: String,
        videoData: Object
    },
    data() {
        return {
            station: ""
        }
    },

    watch: {
    },

    mounted: function () {   //注意接收信号要卸载mounted内
        this.DrawChart = new DrawChart()

        const defaultStation = globalConfig.defaultStation
        this.station = defaultStation.station
        this.$nextTick(() => pipeService.emitSelectStation(defaultStation))

        pipeService.onSelectDistrict((_) => {
            this.station = ""
            this.DrawChart.clear()
        })

        pipeService.onSelectStation((msg) => {
            this.station = msg.station
            dataService.getStationInfo(msg.station, (callback) => {
                const data = callback.data
                this.DrawChart.drawStationInfo(data)
            })
        })
        
    },

    methods: { 

    }

}
