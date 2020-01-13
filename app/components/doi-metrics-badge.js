import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { request } from 'graphql-request';


export default Component.extend({
  tagName: 'div',
  classNames: [ 'panel-footer' ],
  data: null,
  citations: 0,
  views: 0,
  downloads: 0,
  label: '',
  store: service(),
  hasUsage: computed('views','downloads', function() {
    return ((this.views + this.downloads) > 0) ?  true  : false;
  }),
  hasMetrics: computed('citations','views','downloads', function() {
    return ((this.views + this.downloads + this.citations) > 0) ?  true  : false;
  }),

  init() {
    this._super();
    // this.metricsCounter();
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.metricsCounter();
  },
  metricsCounter() {
    const query = `{
      dataset(id: "${this.doi}") {
        citationCount
        viewCount
        downloadCount
      }
    }`;

    let self = this;
    return request('https://api.datacite.org/client-api/graphql', query)
      .then(function(data) {
        console.log(data);
        self.set('citations' , (data.dataset.citationCount));
        self.set('views',(data.dataset.viewCount));
        self.set('downloads',(data.dataset.downloadCount));
        return data.dataset;
      })
      .catch(function(reason) {
        if (console.debug) {
          console.debug(reason);
        } else {
          console.log(reason);
        }

        // self
        //   .get('flashMessages')
        //   .warning(
        //     'Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.'
        //   );
        // self.transitionTo('/');
      });
  },
  actions: {
    metricsCounter() {
      this.metricsCounter();
    },
  },
});
