<template>
  <div id="app" style="width: 1400px">
      <nav class="navbar sticky-top navbar-dark bg-dark" style="padding-top: 1px; padding-bottom: 1px; margin-bottom: 5px;">
          <div style="margin-top:5px; margin-left: 5px;">
              <span style="color:white; font-size:1.25rem; font-weight:500; user-select: none">深圳地铁客流分析系统</span>
          </div>
      </nav>
      <div class="container-fluid" style="padding-left: 5px; padding-right: 5px">
          <div class="row" style="margin-left: 10px; margin-right: 10px">
              <div class="col-3 content" style="padding-left: 3px; padding-right: 3px">
                <ControlPanel></ControlPanel>
                <OverView></OverView>
              </div>
              <div class="col-9 content" style="padding-left: 3px; padding-right: 3px">
                <MapView></MapView>
                <DataView></DataView>
              </div>
          </div>
      </div>      

  </div>
</template>

<script>
/* global d3 $ _ */

import ControlPanel from './components/ControlPanel/ControlPanel.vue'
import DataView from './components/DataView/DataView.vue'
import OverView from './components/OverView/OverView.vue'
import MapView from './components/MapView/MapView.vue'

export default {
  name: 'app',
  components: {
    OverView,
    DataView,
    ControlPanel,
    MapView,
  },
  data() {
    return {
  
    }
  },
  mounted: function () {

  }
}
</script>

<style>

/* 此处定义全局样式 */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #808080; */
  width: 100%;
  margin: 0 auto;
}

.container {
  width: 100%;
  padding: 5px 5px 5px 5px;
}

.content {
  padding: 2px 2px 2px 2px;
}

footer {
  margin-left: 5px;
}

text {
    font-weight: 400;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serf;
    /* font-size: 14px; */
}

.title {
    font-weight: 700;
    font-size: 20px;
  }


</style>
