// this file set the global configurations for the whole system

// ----------------- Please configure the settings here --------------------
// const backendServerModes = ['localhost', 'hkust-server', 'aws-server']
// const curServerMode = backendServerModes[2]

const inColor = '#66b3c5'

const outColor = '#badcbb'

const colorDict = {
    'in': inColor,
    'out': outColor,
    'totalIn': inColor,
    'totalOut': outColor,
    '入站': inColor,
    '出站': outColor
}

const getColor = (key) => colorDict[key]

const defaultDistrict = '南山区'
const defaultStation = {
    "station": "红树湾",
    "lng": 113.968432,
    "lat": 22.525142
}

export default {
    inColor,
    outColor,
    getColor,
    defaultDistrict,
    defaultStation,
}
