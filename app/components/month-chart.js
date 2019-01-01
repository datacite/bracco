import { run } from '@ember/runloop';
import { computed } from '@ember/object';
import { mapBy, sum } from '@ember/object/computed';
import Component from '@ember/component';
import d3 from "d3";

export default Component.extend({
  tagName: 'div',
  classNames: ['col-lg-3', 'col-md-4'],
  data: null,
  counts: mapBy('data', 'sum'),
  count: sum('counts'),
  label: 'Chart',
  chartId: computed('label', function() {
    return 'chart-' + this.label.toLowerCase();
  }),
  cumulative: true,

  didReceiveAttrs() {
    this._super(...arguments);

    run(() => {
      this.send("barChart");
    });
  },

  barChart() {
    let formatMonthYear = d3.time.format.utc("%B %Y");
    let formatFixed = d3.format(",.0f");

    let chartId = this.chartId;
    let data = (this.data) ? this.data : [];

    let height = 100;
    let margin = { top: 10, right: 70, bottom: 25, left: 70 };

    let startDate = new Date("2018-01-01");
    let endDate = new Date("2018-07-01");
    if (data[0]) {
      startDate = new Date(data[0].id + '-01');
      endDate = d3.time.month.offset(new Date(data[data.length - 1].id + '-01'), 1);
    }

    var domain = [startDate, endDate];
    var length = d3.time.months(startDate, endDate).length;
    var width = length * 22;

    var x = d3.time.scale.utc()
      .domain(domain)
      .rangeRound([0, width]);

    var y = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.sum; })])
      .rangeRound([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .tickSize(0)
      .ticks(0)

    // remove chart before building new one
    d3.select('#' + chartId).selectAll("*").remove();

    var chart = d3.select('#' + chartId).append("svg")
      .data([data])
      .attr("width", margin.left + width + margin.right)
      .attr("height", margin.top + height + margin.bottom)
      .attr("class", "chart barchart")
      .append("svg:g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    chart.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("id", function(d) {
        return chartId + '-' + d.id;
       })
      .attr("class", "bar relations")
      .attr("x", function(d) {
        return x(new Date(Date.parse(d.id + '-01T12:00:00Z')));
       })
      .attr("width", width/length - 1)
      .attr("y", function(d) { return y(d.sum); })
      .attr("height", function(d) { return height - y(d.sum); });

    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    if (startDate < d3.time.month.offset(endDate, -1)) {
      chart.append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(-15," + (height + 18) + ")")
        .text(formatMonthYear(startDate));

      chart.append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (width + 8) + "," + (height + 18) + ")")
        .text(formatMonthYear(d3.time.month.offset(endDate, -1)));
    } else {
      chart.append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(3," + (height + 18) + ")")
        .text(formatMonthYear(startDate));
    }
      
    let self = this;
    chart.selectAll("rect").each(
      function(d) {
        var id = '#' + chartId + '-' + d.id;
        var title = formatFixed(d.sum);
        var dateStamp = Date.parse(d.id + '-01T12:00:00Z');
        var dateString = " in " + formatMonthYear(new Date(dateStamp));

        self.$(id).tooltip({ title: title + dateString, container: "body"});
      }
    );

    // return chart object
    return chart;
  },

  actions: {
    barChart() {
      this.barChart();
    }
  }
});
