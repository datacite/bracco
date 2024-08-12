import classic from 'ember-classic-decorator';
import { classNames, tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { schedule } from '@ember/runloop';
import Component from '@ember/component';
import { select } from 'd3-selection';
import { format } from 'd3-format';
import { arc, pie } from 'd3-shape';
import { scaleOrdinal } from 'd3-scale';
import { schemeSet3 } from 'd3-scale-chromatic';

const categoryList = [
  'user',
  'other',
  'software',
  'dataset',
  'text',
  'collection',
  'institution',
  'audiovisual',
  'other1',
  'other2',
  'other3',
  'other4'
];

@classic
@tagName('div')
@classNames('col-lg-3', 'col-md-4')
export default class DonutChart extends Component {
  @computed('data')
  get count() {
    if (this.data) {
      return this.data.reduce(function (a, b) {
        return a + b.count;
      }, 0);
    } else {
      return 0;
    }
  }

  label = 'Chart';

  @computed('label')
  get chartId() {
    return 'chart-donut-' + this.label.toLowerCase();
  }

  @computed('link', 'model.id')
  get doiLink() {
    if (this.link === 'users.show.dois') {
      return '/users/' + this.model.id + '/dois';
    } else {
      return null;
    }
  }

  categories = categoryList;

  init(...args) {
    super.init(...args);

    this.set(this, this.data, []);
    schedule('afterRender', this, function () {
      this.send('donutChart');
    });
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    this.donutChart();
  }

  donutChart() {
    let formatFixed = format(',.0f');

    let chartId = this.chartId;
    let data = this.data ? this.data : [];
    let radius = 80;

    let title = this.count;
    let subtitle = null;
    let categories = this.categories;

    // use colors from colorbrewer
    let color = scaleOrdinal().domain(categories).range(schemeSet3);

    // var tip = d3Tip()
    //   .attr('class', 'tooltip')
    //   .html(function(d) { return d.data.title + ': ' + formatFixed(d.count); });

    // remove chart before building new one
    // wrap in try/catch block to handle fastboot
    try {
      select('#' + chartId)
        .selectAll('*')
        .remove();

      let chart = select('#' + chartId)
        .append('svg')
        .data([data])
        .attr('width', radius * 2 + 50)
        .attr('height', radius * 2 + 10)
        .attr('class', 'chart donut')
        .append('svg:g')
        .attr(
          'transform',
          'translate(' + (radius + 20) + ',' + (radius + 10) + ')'
        );

      let myArc = arc()
        .outerRadius(radius - 5)
        .innerRadius(radius - 30);

      let myPie = pie()
        .sort(null)
        .value(function (d) {
          return d.count;
        });

      let arcs = chart
        .selectAll('g.slice')
        .data(myPie)
        .enter()
        .append('svg:g')
        .attr('class', 'slice');

      // arcs.call(tip)

      arcs
        .append('svg:path')
        .attr('fill', function (d) {
          if (!categories.includes(d.data.id)) {
            d.data.id = 'other';
          }
          return color(d.data.id);
        })
        .attr('d', myArc);
      // .on('mouseover', function(d, i, nodes) {
      //   console.log(d)
      //  })
      // .on('mouseout', function(d, i, nodes) {
      //   console.log(d)
      //  })

      if (subtitle !== null) {
        chart
          .append('text')
          .attr('dy', 0)
          .attr('text-anchor', 'middle')
          .attr('class', 'title')
          .text(formatFixed(title));

        chart
          .append('text')
          .attr('dy', 21)
          .attr('text-anchor', 'middle')
          .attr('class', 'subtitle')
          .text(subtitle);
      } else {
        chart
          .append('text')
          .attr('dy', 8)
          .attr('text-anchor', 'middle')
          .attr('class', 'title-only')
          .text(formatFixed(title));
      }

      // return chart object
      return chart;
    } catch (error) {
      // console.error(error);
    }
  }

  @action
  donutChartAction() {
    this.donutChart();
  }
}
