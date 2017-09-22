import Ember from 'ember';
import d3 from "npm:d3";

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['col-md-3'],
  model: null,

  init: function () {
    this._super();
    Ember.run.schedule("afterRender",this,function() {
      this.send("barChart");
    });
  },

  barChart() {
    let formatYear = d3.time.format.utc("%Y");
    let formatFixed = d3.format(",.0f");

    let data = this.get('model').get('doiCount');

    let height = 100;
    let margin = { top: 10, right: 5, bottom: 5, left: 5 };
    let colors = ["#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#95a6a6"];
    let l = 200; // left margin
    let r = 150; // right margin
    let w = 400; // width of drawing area
    let h = 24;  // bar height
    let s = 3;   // spacing between bars
    let div = '#chart-doi';

    let startDate = new Date("2011-01-01");
    let endDate = new Date("2018-01-01");
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
      .ticks(0);

    var chart = d3.select(div).append("svg")
      .data([data])
      .attr("width", margin.left + width + margin.right)
      .attr("height", margin.top + height + margin.bottom)
      .attr("class", "chart barchart")
      .append("svg:g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var timeStamp = null;

    var bar = chart.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", function(d) {
        if (d.count >= 100000) {
          return "bar medium";
        } else if (d.count >= 10000) {
          return "bar small";
        } else {
          return "bar tiny";
        }
       })
      .attr("data-toggle", "tooltip")
      .attr("title", function(d) {
        var title = formatFixed(d.count);
        var dateStamp = Date.parse(d.id + '-01T12:00:00Z');
        var dateString = " in " + formatYear(new Date(dateStamp));

        return title + dateString;
       })
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

    // activate bootstrap tooltips
    //this.$('[data-toggle="tooltip"]').tooltip();

    // return chart object
    return chart;
  },

  actions: {
    barChart() {
      this.barChart();
    }
  }
});
