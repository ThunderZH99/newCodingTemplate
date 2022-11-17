// /* global d3 $ */
import DrawCandle from './drawCandel'
import dataService from '../../service/dataService.js'
// import pipeService from '../../service/pipeService.js'

export default {
    name: 'CandleView',
    components: {
    },
    props: {
        videoId: String,
        videoData: Object
    },
    data() {
        return {
            containerId: 'candleContainer',   //此处记得改
        }
    },
    watch: {

    },
    mounted: function () {
        this.drawCandle = new DrawCandle(this.containerId)

        dataService.dailyData((stockDataDaily) => {
            // let treechartData = data['data']
            let data = new Array;

            var dataDict;
            for(let key in stockDataDaily["data"]["Time Series (Daily)"]){
                dataDict = stockDataDaily["data"]["Time Series (Daily)"][key];
                data.push({time:new Date(key), open:+dataDict["1. open"], high:+dataDict["2. high"], low:+dataDict["3. low"], close:+dataDict["4. close"], volume: +dataDict["5. volume"]});
            }

            data = data.filter(d => d.time.getMonth()==9 );
            
            this.drawCandle.layout(data);
        })
    }
}
