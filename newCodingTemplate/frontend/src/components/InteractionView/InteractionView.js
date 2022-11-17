// /* global d3 $ */
import dataService from '../../service/dataService.js'
import pipeService from '../../service/pipeService'
import DrawFunc from './drawD3.js'

export default {
    name: 'InteractionView',
    components: {
    },
    props: {
        videoId: String,
        videoData: Object
    },
    data() {
        return {
            click_cnt: 0,
        }
    },

    watch: {
        click_cnt: function(new_click_cnt){
            //接收的参数为变化后的值，如果接收两个参数，一个为新值一个为旧值
            console.log("click_cnt - InteractionView",new_click_cnt);
        }
    },

    mounted: function () {
        this.drawFunc = new DrawFunc();
        this.drawFunc.drawInit();   //加载drawInit函数

        pipeService.onAddCircle((msg) => {
            console.log("InteractionView收到来自VideoView的msg，开始画图",msg);
            this.addCircle();
        })

        pipeService.onRemoteClear((msg) => {
            this.clearSvg();
        })

        
    },

    methods: { 
        addCircle() {
            this.click_cnt = this.click_cnt + 1;
            this.drawFunc.drawCircles(this.click_cnt);
        },

        clearSvg() {
            this.drawFunc.clear();
            console.log("清理完成");
        }

    }

}
