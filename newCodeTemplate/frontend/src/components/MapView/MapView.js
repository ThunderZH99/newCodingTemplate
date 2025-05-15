// /* global d3 $ */
import dataService from '../../service/dataService.js'
import pipeService from '../../service/pipeService.js'
import DrawMap from './drawMap.js'
import {mean} from 'd3'
// import pipeService from '../../service/pipeService.js'

export default {
    name: 'MapView',
    components: {
    },
    props: {
        
    },
    data() {
        return {
        }
    },
    watch: {

    },
    mounted: function () {
        this.DrawMap = new DrawMap()

        pipeService.onSelectDistrict((district) => {
            dataService.getMapViewData(district,(callback) => {
                const data = callback.data
                this.DrawMap.drawStations(data)

                this.$nextTick(() => {   // 让函数等待网页加载完毕后再执行
                    const meanLat = mean(data, d => d.lat)
                    const meanLng = mean(data, d => d.lng)
                      
                    this.DrawMap.map.setCenter([meanLng, meanLat])
                })

            })
        })

        pipeService.onSelectStation((msg) => this.DrawMap.moveTo(msg))
    },

    methods:{

    },
}
