// /* global d3 $ */
import dataService from '../../service/dataService.js'
import globalConfig from '../../service/globalConfig.js'
import pipeService from '../../service/pipeService'

export default {
    name: 'ControlPanel',
    components: {
    },
    props: {

    },
    data() {
        return {
            district: globalConfig.defaultDistrict,
            district_info: {}
        }
    },
    watch: {
        district: function(selected_district) {
            console.log("选中区域:",selected_district)
            pipeService.emitSelectDistrict(selected_district)
        }
    },
    mounted: function () {
        this.$nextTick(() => {   // 让函数等待网页加载完毕后再执行
            pipeService.emitSelectDistrict(this.district)
        })

        pipeService.onSelectDistrict((_) => {
            dataService.getDistrictInfo(this.district,(callback) => {
                const data = callback.data
                this.district_info = data
            })
        })
        


    }
}
