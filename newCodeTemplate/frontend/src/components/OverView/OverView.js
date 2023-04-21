// /* global d3 $ */
import dataService from '../../service/dataService.js'
import pipeService from '../../service/pipeService.js'
import { ascending, descending, sort } from 'd3'
import drawOverview from './drawOverview.js'
// import pipeService from '../../service/pipeService'

export default {
    name: 'OverView',
    components: {
    },
    props: {
        videoId: String,
        videoData: Object
    },
    data() {
        return {
            containerId: 'overviewContainer',   //此处记得改
            order: 'totalCnt',
            ascending_flag: false,
            stations_info: []
        }
    },
    watch: {
        ascending_flag: function(new_ascending_flag) {
            if (new_ascending_flag) this.stations_info = sort(this.stations_info, (a,b) => ascending(a[this.order],b[this.order]))
            else this.stations_info = sort(this.stations_info, (a,b) => descending(a[this.order],b[this.order]))

            this.$nextTick(() => this.drawOverview.layout(this.stations_info, this.order)) 
        },

        order: function(new_order) {
            if (this.ascending_flag) this.stations_info = sort(this.stations_info, (a,b) => ascending(a[new_order],b[new_order]))
            else this.stations_info = sort(this.stations_info, (a,b) => descending(a[new_order],b[new_order]))

            this.$nextTick(() => this.drawOverview.layout(this.stations_info, this.order)) 
        }


    },

    mounted: function () {
        this.drawOverview = new drawOverview

        pipeService.onSelectDistrict((district) => {
            dataService.getStationsByDistrict(district,(callback) => {
                const data = callback.data
                this.stations_info = data

                if (this.ascending_flag) this.stations_info = sort(this.stations_info, (a,b) => ascending(a[this.order],b[this.order]))
                else this.stations_info = sort(this.stations_info, (a,b) => descending(a[this.order],b[this.order]))

                this.$nextTick(() => this.drawOverview.layout(this.stations_info, this.order)) 

            })
        })
    },

    methods: { 
        selectStation: function(station) {
            console.log("选择地铁站:",station)

            const d = this.stations_info.filter(d => d.station==station)[0]
            const msg = {
                'station': station,
                'lng': d.lng,
                'lat': d.lat
            }

            pipeService.emitSelectStation(msg)
        }
    }
}
