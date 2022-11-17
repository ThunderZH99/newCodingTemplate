/* global d3 $ */
// import List from 'list.js'
// import pipeService from '../../service/pipeService'
// import globalConfig from '../../service/globalConfig'
import 'd3'

var DrawFunc = function () {	
    this.name = "DrawFunc函数";
    this.array = [1,2,3];
    this.width = 500;
    this.height = 300;
    this.margin = {top:10, bottom:10, left:10, right:10}
}

DrawFunc.prototype.drawInit = function() {
    const width = this.width;
    const height = this.height;
    const margin = this.margin;
    
    this.svg = d3.select("#Interactionview").select("#divSvg")
    .append("svg")
    .attr("width",width)
    .attr("height",height);

    this.g = this.svg.append("g")
    .attr("id","chart")
    .attr("transform",`translate(${margin.left},${margin.top})`);

}

DrawFunc.prototype.drawCircles = function (times_cnt) {
    const width = this.width;
    const height = this.height;
    const margin = this.margin;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
    .domain([0,1])
    .range([0,innerWidth]);

    const yScale = d3.scaleLinear()
    .domain([0,1])
    .range([innerHeight,0]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
    .domain(d3.range(1,10+1));

    const getColor = d => colorScale(d%10);

    const x = Math.random();
    const y = Math.random();

    this.g.append("circle")
        .attr("cx",xScale(x))
        .attr("cy",yScale(y))
        .attr("r",3)
        .attr("fill",getColor(times_cnt));

}

DrawFunc.prototype.clear = function() {
    this.svg.selectAll("circle").remove();
}

export default DrawFunc