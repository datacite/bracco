import classic from 'ember-classic-decorator';
import { classNameBindings, classNames, tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { schedule } from '@ember/runloop';
import Component from '@ember/component';
import { select } from 'd3-selection';
// import { format } from "d3-format";
import { axisBottom } from 'd3-axis';
import { max } from 'd3-array';
import { timeYears } from 'd3-time';
import { timeFormat } from 'd3-time-format';
import { scaleTime, scaleLinear } from 'd3-scale';
import { A } from '@ember/array';

@classic
@tagName('div')
@classNames('col-lg-3', 'col-md-4')
@classNameBindings('offset:col-lg-offset-3')
export default class BarChart extends Component {
  offset = false;
  data = null;

  @computed('data', 'summarize', 'currentYear')
  get count() {
    if (this.data) {
      if (this.summarize) {
        return A(this.data).reduce(function (a, b) {
          return a + b.count;
        }, 0);
      } else {
        let currentYear = A(this.data).findBy(
          'id',
          this.currentYear.toString()
        );
        if (currentYear) {
          return currentYear.count;
        } else {
          return 0;
        }
      }
    } else {
      return 0;
    }
  }

  label = 'Chart';

  @computed('label')
  get chartId() {
    return 'chart-' + this.label.toLowerCase();
  }

  currentYear = new Date().getFullYear();
  cumulative = true;
  summarize = false;

  init() {
    super.init();

    schedule('afterRender', this, function () {
      this.send('barChart');
    });
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    this.barChartInt();
  }

  barChartInt() {
    let formatYear = timeFormat('%Y');
    // let formatFixed = format(",.0f");

    let chartId = this.chartId;
    let data = this.data ? this.data : [];

    let height = 100;
    let margin = { top: 10, right: 5, bottom: 20, left: 5 };

    let currentYear = this.currentYear;
    let startDate = new Date(`${currentYear - 10}-01-01 00:00:00`);
    let endDate = new Date(`${currentYear + 1}-01-01 00:00:00`);
    let domain = [startDate, endDate];
    let length = timeYears(startDate, endDate).length;
    let width = length * 22;

    let x = scaleTime().domain(domain).rangeRound([0, width]);

    let y = scaleLinear()
      .domain([
        0,
        max(data, function (d) {
          return d.count;
        })
      ])
      .rangeRound([height, 0]);

    let xAxis = axisBottom().scale(x).tickSize(0).ticks(0);

    // var tip = d3Tip()
    //   .attr('class', 'tooltip')
    //   .html(function(d) { return d.id + ': ' + formatFixed(d.count); });

    // remove chart before building new one
    // wrap in try/catch block to handle fastboot
    try {
      select('#' + chartId)
        .selectAll('*')
        .remove();

      let chart = select('#' + chartId)
        .append('svg')
        .data([data])
        .attr('width', margin.left + width + margin.right)
        .attr('height', margin.top + height + margin.bottom)
        .attr('class', 'chart barchart')
        .append('svg:g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      chart
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('id', function (d) {
          return chartId + '-' + d.id;
        })
        .attr('class', 'bar relations')
        .attr('x', function (d) {
          return x(new Date(Date.parse(d.id + '-01T12:00:00Z')));
        })
        .attr('width', width / length - 1)
        .attr('y', function (d) {
          return y(d.count);
        })
        .attr('height', function (d) {
          return height - y(d.count);
        });
      // .on('mouseover', function(d) {
      //   // var id = '#' + chartId + '-' + d.id;
      //   var title = formatFixed(d.count);
      //   var dateStamp = Date.parse(d.id + '-01T12:00:00Z');
      //   var dateString = " in " + formatYear(new Date(dateStamp));
      //   console.log(title + dateString);
      //  })
      // .on('mouseout', function(d, i, nodes) {
      //   console.log(d)
      //  });

      chart
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

      chart
        .append('text')
        .attr('class', 'label')
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(11,' + (height + 18) + ')')
        .text(formatYear(startDate));

      chart
        .append('text')
        .attr('class', 'label')
        .attr('text-anchor', 'middle')
        .attr(
          'transform',
          'translate(' + (width - 11) + ',' + (height + 18) + ')'
        )
        .text(formatYear(endDate) - 1);

      // let self = this;
      // chart.selectAll("rect").each(
      //   function(d) {
      //     var id = '#' + chartId + '-' + d.id;
      //     var title = formatFixed(d.count);
      //     var dateStamp = Date.parse(d.id + '-01T12:00:00Z');
      //     var dateString = " in " + formatYear(new Date(dateStamp));

      //     self.$(id).tooltip({ title: title + dateString, container: "body"});
      //   }
      // );

      // return chart object
      return chart;
    } catch (error) {
      // console.error(error);
    }
  }

  @action
  barChart() {
    this.barChartInt();
  }
}
