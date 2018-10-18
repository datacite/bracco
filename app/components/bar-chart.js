import Ember from 'ember';
import d3 from "npm:d3";

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['col-lg-3', 'col-md-4'],
  data: null,
  count: Ember.computed('data', function() {
    if (this.get('data')) {
      let currentYear = this.get('data').findBy('id', '2018');
      if (currentYear) {
        return currentYear.count;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }),
  label: 'Chart',
  chartId: Ember.computed('label', function() {
    return 'chart-' + this.get('label').toLowerCase();
  }),
  cumulative: true,

  init() {
    this._super();

    Ember.run.schedule("afterRender", this, function() {
      this.send("barChart");
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);

    Ember.run(() => {
      this.send("barChart");
    });
  },

  barChart() {
    let formatYear = d3.time.format.utc("%Y");
    let formatFixed = d3.format(",.0f");

    let chartId = this.get('chartId');
    let data = (this.get('data')) ? this.get('data') : [];

    let height = 100;
    let margin = { top: 10, right: 5, bottom: 20, left: 5 };

    let startDate = new Date("2010-01-01");
    let endDate = new Date("2019-01-01");
    let domain = [startDate, endDate];
    let length = d3.time.years(startDate, endDate).length;
    let width = length * 22;

    var x = d3.time.scale.utc()
      .domain(domain)
      .rangeRound([0, width]);

    var y = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.count; })])
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
      .attr("y", function(d) { return y(d.count); })
      .attr("height", function(d) { return height - y(d.count); });

    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    chart.append("text")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(11," + (height + 18) + ")")
      .text(formatYear(startDate));

    chart.append("text")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + (width - 11) + "," + (height + 18) + ")")
      .text(formatYear(endDate) - 1);

    let self = this;
    chart.selectAll("rect").each(
      function(d) {
        var id = '#' + chartId + '-' + d.id;
        var title = formatFixed(d.count);
        var dateStamp = Date.parse(d.id + '-01T12:00:00Z');
        var dateString = " in " + formatYear(new Date(dateStamp));

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
