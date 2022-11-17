// import DrawVideo from './drawVideo.js'
import dataService from '../../service/dataService.js'
import pipeService from '../../service/pipeService.js'

export default {
    name: 'VideoView',
    components: {
    },
    props: {
        videoList: Array,
        videoId: String,
        videoData: Object
    },
    data() {
        return {
            remote_click_cnt: 0,
        }
    },
    watch: {
        remote_click_cnt: function(new_remote_click_cnt){
            //接收的参数为变化后的值，如果接收两个参数，一个为新值一个为旧值
            // console.log("remote_click_cnt - VideoView",new_remote_click_cnt);
        }
    },
    methods: {
        remoteAdd() {
            this.remote_click_cnt = this.remote_click_cnt + 1;
            const msg = {"test":123, "remote_click_cnt":this.remote_click_cnt};
            pipeService.emitAddCircle(msg);
        },

        remoteClear() {
            console.log("远程清理");
            pipeService.emitRemoteClear();
        },
    },
    mounted: function () {
    }
}
