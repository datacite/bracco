import Component from "@ember/component";
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { request } from 'graphql-request'


export default Component.extend({
  tagName: "div",
  classNames: ["container"],
  data: null,
  citations: 0,
  views: 0,
  downloads: 0,
  label: '',
  // doi: '',
  store: service(),
  // count: computed('data', function() {
  //   return {
  //     citations: this.formatNumbers(this.citations),
  //     views: this.formatNumbers(this.views),
  //     downloads: this.formatNumbers(this.downloads),
  //   };
  // }),

  init() {
    this._super();
    // this.metricsCounter();
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.metricsCounter();
  },
  formatNumbers(counter) {
    if (counter < 1e3) return counter;
    if (counter >= 1e3 && counter < 1e6) return `${+(counter / 1e3).toFixed(1)}K`;
    if (counter >= 1e6 && counter < 1e9) return `${+(counter / 1e6).toFixed(1)}M`;
    if (counter >= 1e9 && counter < 1e12) return `${+(counter / 1e9).toFixed(1)}B`;
    if (counter >= 1e12) return `${+(counter / 1e12).toFixed(1)}T`;
    return counter;
  },
  metricsCounter() {
    const query = `{
      dataset(id: "${this.doi}") {
        citationCount
        viewCount
        downloadCount
      }
    }`
    
    let self = this;
      return request('https://api.datacite.org/client-api/graphql', query)
      .then(function(data) {
        console.log(data)
        self.set('citations' , self.formatNumbers(data.dataset.citationCount))
        self.set('views',self.formatNumbers(data.dataset.viewCount))
        self.set('downloads',self.formatNumbers(data.dataset.downloadCount))
        return data.dataset;
      })
      .catch(function(reason) {
        if (console.debug) {
          console.debug(reason);
        } else {
          console.log(reason);
        }

        self
          .get("flashMessages")
          .warning(
            "Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question."
          );
        self.transitionTo("/");
      })
  },
  actions: {
    metricsCounter() {
      this.metricsCounter();
    }
  }
});
