import { schedule, run } from '@ember/runloop';
import { computed } from '@ember/object';
import Component from '@ember/component';
import d3 from 'd3';
import colorbrewer from 'colorbrewer';

export default Component.extend({
  tagName: 'div',
  classNames: ['col-lg-3', 'col-md-4'],
  data: null,
  count: computed('data', function() {
    return this.get('data').reduce(function (a, b) {
      return a + b.count;
    }, 0);
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

  init() {
    this._super();

    schedule("afterRender", this, function() {
      this.send("donutChart");
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);

    run(() => {
      this.send("donutChart");
    });
  },

  donutChart() {
    // let formatFixed = d3.format(",.0f");

    let chartId = this.chartId;
    let data = (this.data) ? this.data : [];
    let radius = 80;

    let title = this.count;
    let subtitle = null;

    // use PID Graph categories, use colors from colorbrewer
    let categories = ["researcher", "other", "software", "dataset", "text", "collection", "funder", "institution"];
    let colors = colorbrewer.Set3[8];
    var color = d3.scale.ordinal()
      .domain(categories)
      .range(colors);

    // remove chart before building new one
    d3.select('#' + chartId).selectAll("*").remove();

    var chart = d3.select('#' + chartId).append("svg")
      .data([data])
      .attr("width", radius * 2 + 50)
      .attr("height", radius * 2 + 10)
      .attr("class", "chart donut")
      .append("svg:g")
      .attr("transform", "translate(" + (radius + 20) + "," + (radius + 10) + ")");

    var arc = d3.svg.arc()
      .outerRadius(radius - 5)
      .innerRadius(radius - 30);

    var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.count; });

    var arcs = chart.selectAll("g.slice")
      .data(pie)
      .enter()
      .append("svg:g")
      .attr("class", "slice");

    arcs.append("svg:path")
      .attr("fill", function(d) {
        if (!categories.includes(d.data.id)) {
          d.data.id = "other";
        }
        return color(d.data.id); 
      })
      .attr("d", arc);

    // arcs.each(
    //   function(d){ $(this).tooltip({title: formatFixed(d.data.value) + " " + items + " " + d.data.key.replace("_", " "), container: "body"});
    // });

    if (subtitle !== null) {
      chart.append("text")
        .attr("dy", 0)
        .attr("text-anchor", "middle")
        .attr("class", "title")
        .text(title);

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
        .text(title);
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
