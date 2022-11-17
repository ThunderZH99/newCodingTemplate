/* global d3 $ */
import videojs from 'video.js'
// import pipeService from '../../service/pipeService.js'

let DrawVideo = function (id) {
    this.svgWidth = $(id).width()
    this.svgHeight = $(id).height()

    this.cocoPairs = [
        [1, 2], [1, 5], [2, 3], [3, 4], [5, 6], [6, 7], [1, 8], [8, 9], [9, 10], [1, 11],
        [11, 12], [12, 13], [1, 0], [0, 14], [14, 16], [0, 15], [15, 17], [2, 16], [5, 17]
    ]

    this.BODY25Pairs = [
        [0, 1], [0, 15], [0, 16], [15, 17], [16, 18],
        [1, 2], [2, 3], [3, 4], [1, 5], [5, 6], [6, 7], [1, 8],
        [8, 9], [9, 10], [10, 11], [11, 22], [11, 24], [22, 23],
        [8, 12], [12, 13], [13, 14], [14, 21], [14, 19], [19, 20],
    ]

    this.handPairs = [
        [0, 1], [1, 2], [2, 3], [3, 4],
        [0, 5], [5, 6], [6, 7], [7, 8],
        [0, 9], [9, 10], [10, 11], [11, 12],
        [0, 13], [13, 14], [14, 15], [15, 16],
        [0, 17], [17, 18], [18, 19], [19, 20]
    ]

    this.setupVideo('my-player')
}


DrawVideo.prototype.setupVideo = function (id) {
    const _this = this
    this.myPlayer = videojs(id, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        language: 'en',
        playbackRates: [0.2, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0],
        inactivityTimeout: 0, // Note: showing the control bars once the video is loaded.
        height: this.svgHeight,
        width: this.svgWidth,
        // sources: [{
        //     src: url,
        //     type: 'video/mp4'
        //   }]
    })

    // console.log('videoHeight, videoWdith: ', this.videoHeight, this.videoWidth)
    this.myPlayer.ready(function () {
        // console.log('myPlayer is ready: ', _this.myPlayer)
        _this.myPlayer.pause()
        _this.myPlayer.currentTime(0)

        _this.myPlayer.on('ended', function () {
        })

        _this.myPlayer.on('pause', function () {
            let curTime = _this.myPlayer.currentTime()
            _this.curTimeToLabeledFrame(curTime)
            _this.updateDrawingLabelPoses(_this.arrayIdx)
        })

        _this.myPlayer.on('play', function () {
            // console.log('_this.myPlayer.currentTime(): ', _this.myPlayer.currentTime())
            if (_this.myPlayer.currentTime() > _this.endTime) {
                _this.myPlayer.pause()
            }
            _this.removeDrawingLabelPoses()
        })

        _this.myPlayer.on('seeking', function () {
            let curTime = parseFloat(_this.myPlayer.currentTime().toFixed(2))
            if (curTime !== _this.seekTime) {
                _this.curTimeToLabeledFrame(curTime)
                _this.myPlayer.currentTime(_this.seekTime)  // add for solve the problem?
            }

            if (_this.myPlayer.paused()) {
                _this.updateDrawingLabelPoses(_this.arrayIdx)
            } else {
                _this.removeDrawingLabelPoses()
            }
            console.log('curTime: ', curTime)
            console.log('curArrayIdx: ', _this.arrayIdx)
        })
    })
}

DrawVideo.prototype.updateVideo = function (url) {
    const _this = this
    this.myPlayer.src({type: 'video/mp4', src: url})

    _this.myPlayer.on('click', function () {
        if (_this.myPlayer.readyState() < 1) {
            // do not have metadata yet so loadedmetadata event not fired yet (I presume)
            // wait for loadedmetdata event
            _this.myPlayer.one("loadedmetadata", onLoadedMetadata)
        }
        else {
            // metadata already loaded
            onLoadedMetadata()
        }
    })
    
    function onLoadedMetadata() {
        _this.endTime = _this.myPlayer.duration()
    }

}

DrawVideo.prototype.layout = function (id, data, url) {
    console.log('videoINfo: ', data)
    this.visionData = data
    this.videoInfo = this.visionData['videoInfo']
    this.poseData = this.visionData['poseData']

    d3.select(id).selectAll('*').remove()
    this.videoHeight = this.videoInfo['videoHeight']
    this.videoWidth = this.videoInfo['videoWidth']
    this.fps = this.videoInfo['fps']

    console.log('url: ', url)
    this.myPlayer.src({type: 'video/mp4', src: url})

    // layout
    let containerRatio = this.svgWidth / this.svgHeight
    let videoRatio = this.videoWidth / this.videoHeight

    if (videoRatio > containerRatio) {
        this.videoScreenWidth = this.svgWidth
        this.videoScreenHeight = this.svgWidth / videoRatio
    } else {
        this.videoScreenHeight = this.svgHeight
        this.videoScreenWidth = this.svgHeight * videoRatio
    }

    // setup label environment
    let xOffset = (this.svgWidth - this.videoScreenWidth) / 2
    let yOffset = (this.svgHeight - this.videoScreenHeight) / 2

    this.margin = { top: yOffset, right: xOffset, bottom: yOffset, left: xOffset }

    console.log('this.margin: ', this.margin)

    this.svg = d3.select(id).append('svg')
        .attr('class', 'videoSvg')
        .attr('height', this.svgHeight)
        .attr('width', this.svgWidth)

    this.graphContainer = this.svg.append('g')
        .attr('class', 'g_main')
        .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')')

    // global variable in this file
    this.labeledFrameIndex = -1   // initialize it as -1 to indicate no updating

    this.rectBdHighlightClr = '#ff0000'
    this.rectBdNormalClr = '#00ff00'
    this.rectBdWarningClr = 'yellow' // when not sure about the computed baby id

    this.arrayIdx = 0
    this.seekTime = 0
    this.frameList = Object.keys(this.poseData).map((d) => parseInt(d))
    console.log('this.frameList: ', this.frameList)
    // console.log('this.frameList: ', this.frameList)
    // this.seekTimeList = d3.range(0, this.totalFrame).map(d => parseFloat(((d*this.processFrmGap)*(1/this.fps)).toFixed(2)))
    this.seekTimeList = this.frameList.map(d => parseFloat((d*1/this.fps).toFixed(2)))
    console.log('this.seekTimeList: ', this.seekTimeList)
}

DrawVideo.prototype.removeDrawingLabelPoses = function () {
    this.graphContainer.selectAll('*').remove()
}

// eslint-disable-next-line
DrawVideo.prototype.updateDrawingLabelPoses = function(arrayIdx) {
    this.removeDrawingLabelPoses();
    const _this = this;
    console.log("drawVideo arrayIdx: ", arrayIdx);

    console.log('arrayIdx: ', arrayIdx)
    console.log('poseData: ', this.poseData[arrayIdx.toString()])

    // draw poseInfo
    if (this.poseData === undefined || Object.keys(this.poseData).length === 0) {
      console.log(
        "====No pose for the whole video===== "
      ); /* eslint-disable-line */
      return;
    }
  
    let framePoseInfo = this.poseData[arrayIdx.toString()];
    let peoplePose = framePoseInfo['people']
    if (peoplePose.length === 0) {
        console.log('no people, arrayIdx: ', arrayIdx)
        return;
    }
  
    // prepare to draw the rectangles
    this.graphContainer
      .append("g")
      .attr("class", "poseInfo")
      .selectAll("g")
      .attr("class", "peoplePoseInfo")
      .data(peoplePose)
      .enter()
      .append("g")
      .attr("class", () => `people_${arrayIdx}`)
      .each(function drawPose(person) {
        console.log('person: ', person)
        
        let bodyPointNum = 25
        let handPointNum = 21
        let personBodyPoints = person['pose_keypoints_2d']
        let personLeftHandPoints = person['hand_left_keypoints_2d']
        let personRightHandPoints = person['hand_right_keypoints_2d']
        let bodyPoints = []
        let leftHandPoints = []
        let rightHandPoints = []
        for (let i=0; i<bodyPointNum; i++) {
            bodyPoints.push([
                personBodyPoints[3*i]/_this.videoWidth,
                personBodyPoints[3*i+1]/_this.videoHeight,
                personBodyPoints[3*i+2],
            ])
        }

        for (let i=0; i<handPointNum; i++) {
            leftHandPoints.push([
                personLeftHandPoints[3*i]/_this.videoWidth,
                personLeftHandPoints[3*i+1]/_this.videoHeight,
                personLeftHandPoints[3*i+2],
            ])
            rightHandPoints.push([
                personRightHandPoints[3*i]/_this.videoWidth,
                personRightHandPoints[3*i+1]/_this.videoHeight,
                personRightHandPoints[3*i+2],
            ])
        }
        
        // console.log('bodyPoints: ', bodyPoints)
        // console.log('leftHandPoints: ', leftHandPoints)
        // console.log('rightHandPoints: ', rightHandPoints)
    
        // body points
        d3.select(this)
          .append("g")
          .attr("class", "bodyPoints")
          .selectAll("cirlce")
          .data(bodyPoints.filter((d) => {
              return d[2] !== 0 // filter no points
          }))
          .enter()
          .append("circle")
          .attr("cx", d => d[0] * _this.videoScreenWidth)
          .attr("cy", d => d[1] * _this.videoScreenHeight)
          .attr("r", 2)
          .style("fill", "red");
  
        let bodyPointPairData = _this.BODY25Pairs
          .map(pair => {
            if (bodyPoints[pair[0]][2] !== 0 && bodyPoints[pair[1]][2] !== 0) {
              return pair;
            }
            return null;
          })
          .filter(d => d);
  
        d3.select(this)
          .append("g")
          .attr("class", "body-point-connection")
          .selectAll("line")
          .data(bodyPointPairData)
          .enter()
          .append("line")
          .attr("x1", d => bodyPoints[d[0]][0] * _this.videoScreenWidth)
          .attr("y1", d => bodyPoints[d[0]][1] * _this.videoScreenHeight)
          .attr("x2", d => bodyPoints[d[1]][0] * _this.videoScreenWidth)
          .attr("y2", d => bodyPoints[d[1]][1] * _this.videoScreenHeight)
          .style("stroke", "#bdbdbd")
          .style("stroke-width", 2); // original one is 4

        // left hand points
        d3.select(this)
            .append("g")
            .attr("class", "leftHandPoints")
            .selectAll("cirlce")
            .data(leftHandPoints.filter((d) => {
                return d[2] !== 0 // filter no points
            }))
            .enter()
            .append("circle")
            .attr("cx", d => d[0] * _this.videoScreenWidth)
            .attr("cy", d => d[1] * _this.videoScreenHeight)
            .attr("r", 2)
            .style("fill", "green");

      let leftHandPointPairData = _this.handPairs
        .map(pair => {
          if (leftHandPoints[pair[0]][2] !== 0 && leftHandPoints[pair[1]][2] !== 0) {
            return pair;
          }
          return null;
        })
        .filter(d => d);

      d3.select(this)
        .append("g")
        .attr("class", "lefthand-point-connection")
        .selectAll("line")
        .data(leftHandPointPairData)
        .enter()
        .append("line")
        .attr("x1", d => leftHandPoints[d[0]][0] * _this.videoScreenWidth)
        .attr("y1", d => leftHandPoints[d[0]][1] * _this.videoScreenHeight)
        .attr("x2", d => leftHandPoints[d[1]][0] * _this.videoScreenWidth)
        .attr("y2", d => leftHandPoints[d[1]][1] * _this.videoScreenHeight)
        .style("stroke", "#bdbdbd")
        .style("stroke-width", 2); // original one is 4


        // right hand points
        d3.select(this)
          .append("g")
          .attr("class", "rightHandPoints")
          .selectAll("cirlce")
          .data(rightHandPoints.filter((d) => {
              return d[2] !== 0 // filter no points
          }))
          .enter()
          .append("circle")
          .attr("cx", d => d[0] * _this.videoScreenWidth)
          .attr("cy", d => d[1] * _this.videoScreenHeight)
          .attr("r", 2)
          .style("fill", "red");
  
        let rightHandPointPairData = _this.handPairs
          .map(pair => {
            if (rightHandPoints[pair[0]][2] !== 0 && rightHandPoints[pair[1]][2] !== 0) {
              return pair;
            }
            return null;
          })
          .filter(d => d);
  
        d3.select(this)
          .append("g")
          .attr("class", "body-point-connection")
          .selectAll("line")
          .data(rightHandPointPairData)
          .enter()
          .append("line")
          .attr("x1", d => rightHandPoints[d[0]][0] * _this.videoScreenWidth)
          .attr("y1", d => rightHandPoints[d[0]][1] * _this.videoScreenHeight)
          .attr("x2", d => rightHandPoints[d[1]][0] * _this.videoScreenWidth)
          .attr("y2", d => rightHandPoints[d[1]][1] * _this.videoScreenHeight)
          .style("stroke", "#bdbdbd")
          .style("stroke-width", 2); // original one is 4

      });
  };



DrawVideo.prototype.curTimeToLabeledFrame = function (curTime) {
    let bisect = d3.bisector(function(d) { return d }).left
    let arrayIdx = bisect(this.seekTimeList, curTime)
    this.seekTime = this.seekTimeList[arrayIdx]
    this.arrayIdx = arrayIdx
    return { 'seekTime': this.seekTime }
}

export default DrawVideo
