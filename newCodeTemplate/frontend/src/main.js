import {createApp} from 'vue'
import App from './App.vue'
// import store from './service/store.js'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import _ from 'lodash'
window._ = _

import * as d3 from 'd3'
window.d3 = d3

import $ from 'jquery'
window.$ = $

var app = createApp(App).mount("#app");
