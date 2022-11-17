// /* global d3 $ */
import dataService from '../../service/dataService.js'
import DrawVolume from './drawVolume'
// import dataService from '../../service/dataService.js'
// import pipeService from '../../service/pipeService'

export default {
    name: 'VolumeView',
    components: {
    },
    props: {
        videoId: String,
        videoData: Object
    },
    data() {
        return {
            containerId: 'volumeGraph',   //此处记得改
            audioData: {},
            interval: 5,
            sliding: 1
        }
    },
    watch: {
    },
    mounted: function () {
        this.DrawVolume = new DrawVolume(this.containerId)
        // https://bl.ocks.org/d3noob/4826ac9290ea4c569ae5157a6e20a174
        dataService.dailyData((stockDataDaily) => {
            // let treechartData = data['data']
            let data = new Array;

            var dataDict;
            for(let key in stockDataDaily["data"]["Time Series (Daily)"]){
                dataDict = stockDataDaily["data"]["Time Series (Daily)"][key];
                data.push({time:new Date(key), open:+dataDict["1. open"], high:+dataDict["2. high"], low:+dataDict["3. low"], close:+dataDict["4. close"], volume: +dataDict["5. volume"]});
            }
            
            this.DrawVolume.layout(data);
        })
    }
}
