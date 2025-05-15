import * as d3 from 'd3'
import * as $ from 'jquery'
import globalConfig from '../../service/globalConfig.js';

var DrawChart = function () {	
    this.width = $('#pieChart').width();
    this.height = $('#pieChart').height();

    const margin = {top:60, bottom:50, left:50, right:10}
    this.margin = margin

    const idList = ['#pieChart','#lineChart','#stackBarChart']
    this.idList = idList

    for(let idx in idList) {
        let ID = idList[idx]
        
        let svg = d3.select(ID).append('svg')
            .attr("width", this.width)
            .attr("height", this.height)

        svg.append('g')
            .attr("class","g_main")
            .attr("transform",`translate(${margin.left},${margin.top})`);
    }
}

DrawChart.prototype.drawStationInfo = function (data) {
    this.clear()
    this.drawPieChart(data)
    this.drawLineChart(data)
    this.drawStackBarChart(data)
}

DrawChart.prototype.drawPieChart = function (data) {

    const width = this.width
    const height = this.height

    const radius = Math.min(width, height) / 2.75

    const pieData = [
        {'type':'in', 'value':data.totalIn}, 
        {'type':'out', 'value':data.totalOut}
    ]

    const totalCnt = data.totalCnt
    const getLabel = function(d) {
        if (d.type == 'in') return `入站: ${Math.round(100*d.value/totalCnt)}%`
        else return `出站: ${Math.round(100*d.value/totalCnt)}%`
    }

    const arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    const pie = d3.pie()
        .sort(null)
        .value(d => d.value);

    const svg = d3.select('#pieChart').select('svg')
    const g = svg.select('.g_main').attr('transform', `translate(${width/2}, ${height/2 + 20})`)

    const pathG = g.selectAll(".arc")
			.data(pie(pieData))
			.join("g")
			.attr("class", "arc")
            

    pathG.append("path")
			.attr("d", arc)
			.attr("fill", d => globalConfig.getColor(d.data.type));

    pathG.append("text")
        .attr('class', 'label')
        .attr('text-anchor', 'middle')
		.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
		.attr("dy", ".35em")
		.text(d => getLabel(d.data));

    const title = '出入站比例'
    svg.append('g').append('text')
        .attr('class', 'title')
        .attr('text-anchor', 'middle')
        .attr('x', width/2)
        .attr('y', 40)
        .text(title)

}

DrawChart.prototype.drawLineChart = function (data) {

    const lineChartData = data.data
    const width = this.width
    const height = this.height
    const margin = this.margin

    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right

    const svg = d3.select('#lineChart').select('svg')
    const g = svg.select('.g_main')

    const xAxisLabel = '时间';

    const xScale = d3.scaleLinear()   //处理时间戳数据
        .domain(d3.extent(lineChartData, d => d.time))
        .range([0, innerWidth])
        .nice();

    const maxIn = d3.max(lineChartData, d => d.in)
    const maxOut = d3.max(lineChartData, d => d.out)
    const yScale = d3.scaleLinear()
        .domain([0, d3.max([maxIn, maxOut])])
        .range([innerHeight, 0])
        .nice();

    const xAxis = d3.axisBottom(xScale)
        .tickValues(d3.range(6,24,3))
        .tickSize(5)
        .tickPadding(5);

    const yTickFormat = d3.format('.2s')
    const yAxis = d3.axisLeft(yScale)
        .ticks(5)
        .tickSize(5)
        .tickPadding(5)
        .tickFormat(yTickFormat)

    const yAxisG = g.append('g').call(yAxis);

    const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`);

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 40)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);


    const lineGeneratorIn = d3.line()   //绘制线条
        .x(d => xScale(d.time))
        .y(d => yScale(d.in))
        .curve(d3.curveBasis);   //平滑曲线

    const lineGeneratorOut = d3.line()   //绘制线条
        .x(d => xScale(d.time))
        .y(d => yScale(d.out))
        .curve(d3.curveBasis);   //平滑曲线

    const strokeWidth = 2
    g.append('path')
        .attr('class', 'line-path-in')   //line-path进一步在css中设置
        .attr('d', lineGeneratorIn(lineChartData))
        .attr('fill', 'none')
        .attr('stroke', globalConfig.getColor('in'))
        .attr('stroke-width', strokeWidth)

    g.append('path')
        .attr('class', 'line-path-out')   //line-path进一步在css中设置
        .attr('d', lineGeneratorOut(lineChartData))
        .attr('fill', 'none')
        .attr('stroke', globalConfig.getColor('out'))
        .attr('stroke-width', strokeWidth)


    const title = '客流量时变图'
    svg.append('g').append('text')
        .attr('class', 'title')
        .attr('text-anchor', 'middle')
        .attr('x', width/2)
        .attr('y', 40)
        .text(title)

    const legendG = svg.append('g')
        .attr('class', 'legend')

    legendG.selectAll('circle').data(["入站","出站"]).join('circle')
        .attr('cx', innerWidth)
        .attr('cy', (_,i) => 30 + 18*i)
        .attr('r', 4)
        .attr('fill', d => globalConfig.getColor(d))

    legendG.selectAll('text').data(["入站","出站"]).join('text')
        .attr('text-anchor', 'start')
        .attr('x', innerWidth + 8)
        .attr('y', (_,i) => 30 + 18*i)
        .attr('dy', '0.35em')
        .text(d => d)

}

DrawChart.prototype.drawStackBarChart = function (data) {
    const stackBarData = data.data
    const width = this.width
    const height = this.height
    const margin = this.margin

    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right

    const svg = d3.select('#stackBarChart').select('svg')
    const g = svg.select('.g_main')

    const xAxisLabel = '时间';

    const xScale = d3.scaleBand()   //处理时间戳数据
        .domain(stackBarData.map(d => d.time))
        .range([0, innerWidth]);

    const maxCnt = d3.max(stackBarData, d => d.in + d.out)
    const yScale = d3.scaleLinear()
        .domain([0, maxCnt])
        .range([innerHeight, 0])
        .nice();

    const xAxis = d3.axisBottom(xScale)
        .tickValues(d3.range(6,24,3))
        .tickSize(5)
        .tickPadding(5);

    const yTickFormat = d3.format('.2s')
    const yAxis = d3.axisLeft(yScale)
        .ticks(5, "s")
        .tickSize(5)
        .tickPadding(5)
        .tickFormat(yTickFormat)

    const yAxisG = g.append('g').call(yAxis);

    const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`);

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 40)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);

    const series = d3.stack()
        .keys(["in","out"])
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone)(stackBarData)

    g.selectAll('.series')
        .data(series)
        .enter().append('g')
        .attr('class','series')
        .attr('fill', d=>globalConfig.getColor(d.key))
            .selectAll('rect')
            .data(data => data)
            .enter()
            .append('rect')
            .attr('x', d => xScale(d.data.time))
            .attr('y', d => yScale(d[1]))
            .attr('width', xScale.bandwidth())
            .attr('height', d => Math.abs(yScale(d[0])-yScale(d[1])))

    // 交互
    function hover(_,d) {
        d3.select(this).attr('stroke', 'coral').attr('stroke-width',1)
        
        const titleText = `时间:${d.data.time} 入站:${d.data.in} 出站:${d.data.out}`
        d3.select(this).append('title').text(titleText)
    }

    function mouseout() {
        d3.select(this).attr('stroke', 'none')
        d3.select(this).select('title').remove()
    }

    d3.selectAll('.series').selectAll('rect')
        .on('mouseover', hover)
        .on('mouseout', mouseout)


    const title = '客流量堆积图'
    svg.append('g').append('text')
        .attr('class', 'title')
        .attr('text-anchor', 'middle')
        .attr('x', width/2)
        .attr('y', 40)
        .text(title)
}

DrawChart.prototype.clear = function() {

    const idList = this.idList
    const margin = this.margin

    for(let idx in idList) {
        let ID = idList[idx]
        
        let svg = d3.select(ID).select('svg')

        svg.selectAll('g').remove()

        svg.append('g')
            .attr("class","g_main")
            .attr("transform",`translate(${margin.left},${margin.top})`);
    }

}

export default DrawChart