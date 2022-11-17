<template src='./CandleView.html'></template>

<script src='./CandleView.js'></script>

<style scoped>
    .card {
        margin-bottom: 10px;
        /* height: 400px; */
        border-radius: 5px;
    }

    .card-header {
        font-size: 12px;
        padding: 6px 12px;
        height: 36px;
    }

    .card-block {
        padding: 0px;
        position: relative;
    }

    text {
        font-weight: 300;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serf;
        font-size: 14px;
    }

    #candleContainer {
        /* height: 243px; */
        height: 300px;
    }

    .bar { fill: steelblue; }
    .toolTip {
        position: absolute;
        display: none;
        min-width: 80px;
        height: auto;
        background: none repeat scroll 0 0 #ffffff;
        border: 1px solid #6F257F;
        padding: 14px;
        text-align: center;
    }

</style>
