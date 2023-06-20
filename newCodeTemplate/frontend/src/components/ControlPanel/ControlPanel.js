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
            containerId: 'controlPanelContainer',   //此处记得改
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
        this.$nextTick(() => {
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
