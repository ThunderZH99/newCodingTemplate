<template src='./VideoView.html'></template>

<script src='./VideoView.js'></script>

<style scoped>
    .card {
        margin-bottom: 10px;
        margin-left: 1px;
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

    #videoPlayerContainer {
        /* height: 243px; */
        height: 300px;
    }

    #my-player {
        position: absolute;
        height: 100%;
        width: 100%;
    }

    #labelsContainer {
        position: absolute;
        top: 0px;
        height: 100%;
        width: 100%;
        pointer-events: none;
    }

</style>
