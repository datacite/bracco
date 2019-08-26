import { schedule } from '@ember/runloop';
import { computed } from '@ember/object';
import Component from '@ember/component';
import d3 from 'd3';

const categoryList = [
  "researcher", 
  "other", 
  "software", 
  "dataset", 
  "text", 
  "collection", 
  "institution", 
  "audiovisual", 
  "other1", 
  "other2", 
  "other3", 
  "other4"
]

export default Component.extend({
  tagName: 'div',
  classNames: ['col-lg-3', 'col-md-4'],
  data: [],
  count: computed('data', function() {
    if (this.get('data')) {
      return this.get('data').reduce(function (a, b) {
        return a + b.count;
      }, 0);
    } else {
      return 0
    }
  }),
  label: 'Chart',
  chartId: computed('label', function() {
    return 'chart-donut-' + this.label.toLowerCase();
  }),
  doiLink: computed('link','model.id', function() {
    if (this.link === 'researchers.show.dois') {
      return '/researchers/' + this.model.get('id') + '/dois';
    } else {
      return null;
    }
  }),
  categories: categoryList,

  init() {
    this._super();

    schedule("afterRender", this, function() {
      this.send("donutChart");
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.donutChart();
  },

  donutChart() {
    let formatFixed = d3.format(",.0f");

    let chartId = this.chartId;
    let data = (this.data) ? this.data : [];
    let radius = 80;

    let title = this.count;
    let subtitle = null;
    let categories = this.categories;

    // use PID Graph categories, use colors from colorbrewer
    var color = d3.scaleOrdinal()
      .domain(categories)
      .range(d3.schemeSet3);

    // remove chart before building new one
    d3.select('#' + chartId).selectAll("*").remove();

    var chart = d3.select('#' + chartId).append("svg")
      .data([data])
      .attr("width", radius * 2 + 50)
      .attr("height", radius * 2 + 10)
      .attr("class", "chart donut")
      .append("svg:g")
      .attr("transform", "translate(" + (radius + 20) + "," + (radius + 10) + ")");

    var arc = d3.arc()
      .outerRadius(radius - 5)
      .innerRadius(radius - 30);

    var pie = d3.pie()
      .sort(null)
      .value(function(d) { return d.count; });

    var arcs = chart.selectAll("g.slice")
      .data(pie)
      .enter()
      .append("svg:g")
      .attr("class", "slice");

    arcs.append("svg:path")
      .attr("fill", function(d) {
        if (!(categories.includes(d.data.id))) {
          d.data.id = "other";
        }
        return color(d.data.id); 
      })
      .attr("d", arc);

    // var tooltip = chart.append('div')
    //   .attr('class', 'tooltip')
    //   .style('opacity', 0);
      
    // arcs.on('mouseover', function(d) {
    //   var posLeft = d3.event.pageX;
    //   var posTop = d3.event.pageY;

    //   tooltip
    //     .style('left', posLeft + 'px')
    //     .style('top', posTop + 'px')
    //     .html(d.data.title + ': ' + d.data.count)
    //     .transition()
    //     .duration(200)
    //     .style('opacity', 0.9);
    // });
      
    // arcs.on('mouseout', function() {
    //   tooltip
    //     .transition()
    //     .duration(500)
    //     .style('opacity', 0);
    // });

    // arcs.each(
    //   function(d){ $(this).tooltip({title: formatFixed(d.data.value) + " " + items + " " + d.data.key.replace("_", " "), container: "body"});
    // });

    if (subtitle !== null) {
      chart.append("text")
        .attr("dy", 0)
        .attr("text-anchor", "middle")
        .attr("class", "title")
        .text(formatFixed(title));

      chart.append("text")
        .attr("dy", 21)
        .attr("text-anchor", "middle")
        .attr("class", "subtitle")
        .text(subtitle);
    } else {
      chart.append("text")
        .attr("dy", 8)
        .attr("text-anchor", "middle")
        .attr("class", "title-only")
        .text(formatFixed(title));
    }

    // return chart object
    return chart;
  },

  actions: {
    donutChart() {
      this.donutChart();
    }
  }
});
