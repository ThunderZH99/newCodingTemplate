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


function getStationsByDistrict(district, callback) {
    const url = `${dataServerUrl}/district-station/${district}`
    const params = {}
    request(url, params, GET_REQUEST, callback)   
}

function getDistrictInfo(district, callback) {
    const url = `${dataServerUrl}/district-info/${district}`
    const params = {}
    request(url, params, GET_REQUEST, callback)   
}

function getStationInfo(station, callback) {
    const url = `${dataServerUrl}/station/${station}`
    const params = {}
    request(url, params, GET_REQUEST, callback) 
}

function getMapViewData(district, callback) {
    const url = `${dataServerUrl}/mapview/${district}`
    const params = {}
    request(url, params, GET_REQUEST, callback)  
}




export default {
    dataServerUrl,
    getStationsByDistrict,
    getDistrictInfo,
    getStationInfo,
    getMapViewData
}
