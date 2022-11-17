/* global d3 $ */

let DrawCandle= function (id) {	
	this.id = id
    this.svgWidth = $('#' + id).width()
    this.svgHeight = $('#' + id).height()

    this.svg = d3.select('#' + id).append('svg')
        .attr('class', 'statisticSvg')
        .attr('width', this.svgWidth)
		.attr('height', this.svgHeight)

    var margin = {top: 30, right: 90, bottom: 30, left: 90};
    this.margin = margin;
	
	this.graphContainer = this.svg.append('g')
		.attr('class', 'g_main')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

}

DrawCandle.prototype.layout = function (data) {
    const xValue = d => d.time;
    const highValue = d => d.high;
    const lowValue = d => d.low;
    const openValue = d => d.open;
    const closeValue = d => d.close;

    const innerHeight = this.svgHeight - this.margin.top - this.margin.bottom;
    const innerWidth = this.svgWidth - this.margin.left - this.margin.right;

    const yAxisLabel = "Price($)";
    const title = "Stock Price of IBM";

    const xScale = d3.scaleTime()   //处理时间戳数据
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();
    
    const yScale = d3.scaleLinear()
        .domain([d3.min(data,lowValue),d3.max(data,highValue)])
        .range([innerHeight, 0])   //前面两个图y轴坐标不涉及数字，由于y轴向下为正方向，所以要反过来！ 
        .nice();

    const g = this.svg.append('g')
        .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const xAxisTickFormat = time => time.getDate();
    // .replace('G','B');  

    const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickPadding(10);

    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(15)
      
    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();
      
    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -45)
        .attr('x', -innerHeight / 2 + 5)
        .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
        .attr('fill', 'black')
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);
      
    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);
      
    xAxisG.select('.domain').remove();

    const darkLine = g.append("g").attr('class','dark-line');

    darkLine.selectAll('line').data(data)
        .enter()
        .append('line')
        .attr('x1', d => xScale(xValue(d)))
        .attr('y1', d => yScale(highValue(d)))
        .attr('x2', d => xScale(xValue(d)))
        .attr('y2', d => yScale(lowValue(d)))
        .attr('stroke-width',1)
        .attr('stroke',"black");

    const candleLine = g.append("g").attr('class','candle-line');
    const getColor = d => {
        let color;
        if(openValue(d)>closeValue(d)) color = "red"
        else if(openValue(d)<closeValue(d)) color = "green"
        else color = "none"

        return color;
    };

    candleLine.selectAll('line').data(data)
        .enter()
        .append('line')
        .attr('x1', d => xScale(xValue(d)))
        .attr('y1', d => yScale(openValue(d)))
        .attr('x2', d => xScale(xValue(d)))
        .attr('y2', d => yScale(closeValue(d)))
        .attr('stroke-width',5)
        .attr('stroke', d => getColor(d))
        .attr('stroke-linecap', 'round');

    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .attr('x', innerWidth/2)
        .attr('text-anchor', 'middle')
        .text(title);

    
}

export default DrawCandle