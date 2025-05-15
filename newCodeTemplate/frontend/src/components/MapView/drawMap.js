/* global AMap */
// 第一行不要删, 不是注释
// Amap默认挂载到window上, 全局引用后可以直接调用AMap

import * as d3 from 'd3'
import globalConfig from '../../service/globalConfig.js'
import pipeService from '../../service/pipeService.js';

let DrawMap= function () {	

  const zooms = [14, 15]
  this.zooms = zooms

  this.map = new AMap.Map("map",{  //设置地图容器id
      viewMode:"3D",    //是否为3D地图模式
      zoom: 14,           //初始化地图级别
      // center:[114.03,22.55], //初始化地图中心点位置
      center:[113.968432, 22.525142], //初始化地图中心点位置
      zooms: zooms,
    });

    this.map.setMapStyle('amap://styles/whitesmoke');      

    const size = this.map.getSize();
    this.svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svgNode.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    this.svgNode.setAttribute('class', 'svg-node');
    this.svgNode.setAttribute('width', size.width);
    this.svgNode.setAttribute('height', size.height);

    this.customLayer = new AMap.CustomLayer(this.svgNode, {
      zIndex: 100,
      zooms: zooms,
      alwaysRender: true
    });

    this.customLayer.setMap(this.map);
    this.customLayer.render = onRender;

    this.marker = "";

    // 动态更新地图
    const _this = this
    function onRender() {
      _this.renderUpdate(_this.svgNode)
    }

    // 绘制legend
    const svg = d3.select(this.svgNode)
    const legendG = svg.append('g')
      .attr('class', 'legend')

    const xBias = size.width - 80
    legendG.selectAll('circle').data(["入站","出站"]).join('circle')
        .attr('cx', xBias)
        .attr('cy', (_,i) => 30 + 18*i)
        .attr('r', 4)
        .attr('fill', d => globalConfig.getColor(d))

    legendG.selectAll('text').data(["入站","出站"]).join('text')
        .attr('text-anchor', 'start')
        .attr('x', xBias + 8)
        .attr('y', (_,i) => 30 + 18*i)
        .attr('dy', '0.35em')
        .text(d => d)

}


DrawMap.prototype.drawStations = function (data) {    
  let maxCnt = 0;
  let cnt = 0;
  for(let i=0; i<data.length; i++) {
      let station_data = data[i].data

      cnt = d3.max(station_data, d => d.in + d.out);
      if(maxCnt < cnt) maxCnt = cnt;
  }

  const innerRadius = 30;
  const outerRadius = 50;

  const radiusScale = d3.scaleSqrt()
    .domain([0, maxCnt])
    .range([innerRadius, outerRadius])

  // const startTimeAngle = 6*2*Math.PI/24
  // const endTimeAngle = 23*2*Math.PI/24
  const startTimeAngle = Math.PI/2
  const endTimeAngle = -3 * Math.PI/2
  const timeScale = d3.scaleBand()   //柱子时间间隔
    .domain(d3.range(6,23+1))
    .range([startTimeAngle, endTimeAngle])
    .align(0);

  const svg = d3.select(this.svgNode)

  svg.select('.g_main').remove()
  const g = svg.append('g').attr('class','g_main')

  const gGlpyh = g.selectAll('g.station-glyph').data(data).join('g')
    .attr('class','station-glyph')
    // .attr('transform', d => getTranslate(d))
    .attr('transform', d => {
        const point = [d.lng,d.lat]
        const svgPoint = this.map.lngLatToContainer(point)

        return `translate(${svgPoint.x}, ${svgPoint.y})`
    })

  const arcScaleOut = d3.arc()   //扇区-出站
    .innerRadius(innerRadius)
    .outerRadius(d => radiusScale(d.out))
    .startAngle(d => timeScale(d.time))
    .endAngle(d => timeScale(d.time) + timeScale.bandwidth())
    .padAngle(0.01)
    .padRadius(innerRadius);

  const arcScaleIn = d3.arc()   //扇区-进站
      .innerRadius(d => radiusScale(d.out))
      .outerRadius(d => radiusScale(d.out + d.in))
      .startAngle(d => timeScale(d.time))
      .endAngle(d => timeScale(d.time) + timeScale.bandwidth())
      .padAngle(0.01)
      .padRadius(innerRadius);

  // 点击事件
  const click = function(_, d) {
    const msg = {
      'station': d.station,
      'lng': d.lng,
      'lat': d.lat
    }

    console.log('选择地铁站',d.station)

    pipeService.emitSelectStation(msg)
  }

  const zoom = this.map.getZoom();
  const drawGlyph = function(station_data) {
      d3.select(this).selectAll('path.in-bar').data(station_data.data).join('path')
        .attr('class', 'in-bar')
        .attr('d', d => arcScaleIn(d))
        .attr('fill', globalConfig.getColor('in'))

      d3.select(this).selectAll('path.out-bar').data(station_data.data).join('path')
        .attr('class', 'out-bar')
        .attr('d', d => arcScaleOut(d))
        .attr('fill', globalConfig.getColor('out'))

      d3.select(this).append('text')
        .attr('class','station-text')
        .attr('dy', 7)
        .attr('text-anchor','middle')
        .style('font-size', 0.9*zoom)
        .text(station_data.station)

      d3.select(this).on('click', (event,d) => click(event,d)) 

  }

  gGlpyh.each(drawGlyph)    
}

// 动态更新地图
DrawMap.prototype.renderUpdate = function(svgNode) {
    const svg = d3.select(svgNode)

    // const _this = this

    svg.selectAll('g.station-glyph')
    .attr('transform', d => {
      const point = [d.lng,d.lat]
      const svgPoint = this.map.lngLatToContainer(point)

      return `translate(${svgPoint.x}, ${svgPoint.y})`
    })

    const zoom = this.map.getZoom()
    svg.selectAll('text.station-text')
      .style('font-size', 0.9*zoom)

}

DrawMap.prototype.moveTo = function(msg) {
  this.map.remove(this.marker);

  var marker = new AMap.Marker({
    position: new AMap.LngLat(msg.lng, msg.lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    title: 'selected'
  });

  this.map.add(marker)
  this.marker = marker

  this.map.setCenter([msg.lng,msg.lat])
}

export default DrawMap