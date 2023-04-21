/* global d3 $ */
// import List from 'list.js'
// import pipeService from '../../service/pipeService'
// import globalConfig from '../../service/globalConfig'
import 'd3'
import globalConfig from '../../service/globalConfig'

var DrawOverview = function () {	

}

DrawOverview.prototype.layout = function (data, order) {
    const svgSelection = d3.select('#overviewContainer').selectAll('svg')
    svgSelection.selectAll('.g_main').remove()

    const g = svgSelection.append('g')
        .attr('class','g_main')

    const width = $('.svg-container').width()
    const height = $('.svg-container').height()
    
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.totalCnt)])
        .range([0, width])

    var firstKey = ""
    var secondKey = ""
    if (order == 'totalCnt') {
        firstKey = 'totalIn'
        secondKey = 'totalOut'
    }

    else {
        firstKey = order
        secondKey = (firstKey == 'totalIn')? 'totalOut' : 'totalIn'
    }

    const drawStackBar = function (_, i) {
        let d = data[i]

        d3.select(this).append('rect')
            .attr('class','in-rect')
            .attr('width', xScale(d[firstKey]))
            .attr('height', height)
            .attr('fill', globalConfig.getColor(firstKey))
        
        d3.select(this).append('rect')
            .attr('class','out-rect')
            .attr('x', xScale(d[firstKey]))
            .attr('width', xScale(d[secondKey]))
            .attr('height', height)
            .attr('fill', globalConfig.getColor(secondKey))

        // 交互
        let info = `入站:${d.totalIn} 出站:${d.totalOut} 总量:${d.totalCnt}`
        d3.select(this).on('mouseover', () => d3.select(this).append('title').text(info))
        d3.select(this).on('mouseout', () =>  d3.select(this).select('title').remove())
    }

    g.each(drawStackBar)


}


export default DrawOverview