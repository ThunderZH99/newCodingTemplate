import axios from 'axios'

const GET_REQUEST = 'get'
const POST_REQUEST = 'post'
const dataServerUrl = process.env.DATA_SERVER_URL || 'http://127.0.0.1:5010'

function request(url, params, type, callback) {
    let func
    if (type === GET_REQUEST) {
        func = axios.get
    } else if (type === POST_REQUEST) {
        func = axios.post
    }

    func(url, params).then((response) => {
        if (response.status === 200) {
            callback(response)
        } else {
            console.error(response) /* eslint-disable-line */
        }
    })
    .catch((error) => {
        console.error(error) /* eslint-disable-line */
    })
}

function initialization(videoId, callback) {
    const url = `${dataServerUrl}/initialization/${videoId}`
    const params = {}
    request(url, params, GET_REQUEST, callback)
}

function videoData(videoId, callback) {
    const url = `${dataServerUrl}/video/${videoId}`
    const params = {}
    request(url, params, GET_REQUEST, callback)   
}

function poseData(videoId, callback) {
    const url = `${dataServerUrl}/pose/${videoId}`
    const params = {}
    request(url, params, GET_REQUEST, callback)
}

function videoInfo(videoId, callback) {
    const url = `${dataServerUrl}/videoInfo/${videoId}`
    const params = {}
    request(url, params, GET_REQUEST, callback)
}

function visionData(videoId, callback) {
    const url = `${dataServerUrl}/video/${videoId}`
    const params = {}
    request(url, params, GET_REQUEST, callback)
}

function audioData(videoId, interval, sliding_speed, callback) {
    const url = `${dataServerUrl}/audio/${videoId}/${interval}/${sliding_speed}`
    const params = {}
    request(url, params, GET_REQUEST, callback)
}

function textData(videoId, callback) {
    const url = `${dataServerUrl}/text/${videoId}`
    const params = {}
    request(url, params, GET_REQUEST, callback)
}

function barchartData(callback) {
    const url = `${dataServerUrl}/barchart`
    const params = {}
    request(url, params, GET_REQUEST, callback)
}

function treechartData(callback) {
    const url = `${dataServerUrl}/treechart`
    const params = {}
    request(url, params, GET_REQUEST, callback)
}

function linechartData(callback) {
    const url = `${dataServerUrl}/linechart`
    const params = {}
    request(url, params, GET_REQUEST, callback)
}

function zytData(callback) {   //callback为一个函数
    const url = `${dataServerUrl}/zytData`
    const params = {}
    request(url, params, GET_REQUEST, callback)
}

function dailyData(callback) {   //callback为一个函数
    const url = `${dataServerUrl}/stock/daily`
    const params = {}
    request(url, params, GET_REQUEST, callback)
}

export default {
    dataServerUrl,
    initialization,
    videoInfo,
    poseData,
    visionData,
    audioData,
    textData,
    barchartData,
    treechartData,
    linechartData,
    zytData,
    dailyData,
    videoData,
}
