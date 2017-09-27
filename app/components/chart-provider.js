import Ember from 'ember';
import D3 from "npm:d3";

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
    let formatYear = D3.time.format.utc("%Y");
    let formatFixed = D3.format(",.0f");

    let data = this.get('model').get('providerCount');

    let height = 100;
    let margin = { top: 10, right: 10, bottom: 5, left: 5 };
    let div = '#chart-provider';

    let startDate = new Date("2009-01-01");
    let endDate = new Date("2018-01-01");
    let domain = [startDate, endDate];
    let length = D3.time.years(startDate, endDate).length;
    let width = length * 22;

    var x = D3.time.scale.utc()
      .domain(domain)
      .rangeRound([0, width]);

    var y = D3.scale.linear()
      .domain([0, D3.max(data, function(d) { return d.count; })])
      .rangeRound([height, 0]);

    var xAxis = D3.svg.axis()
      .scale(x)
      .tickSize(0)
      .ticks(0);

    var chart = D3.select(div).append("svg")
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
        return "provider-" + d.id;
       })
      .attr("class", function(d) {
        if (d.count >= 100) {
          return "bar extra-large";
        } else if (d.count >= 75) {
          return "bar large";
        } else if (d.count >= 50) {
          return "bar medium";
        } else if (d.count >= 25) {
          return "bar small";
        } else {
          return "bar tiny";
        }
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

    let self = this;
    chart.selectAll("rect").each(
      function(d) {
        var id = "#provider-" + d.id;
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
