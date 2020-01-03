import Component from "@ember/component";
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { request } from 'graphql-request'



export default Component.extend({
  tagName: "div",
  classNames: ["col-lg-3", "col-md-4"],
  data: null,
  label: '',
  store: service(),
  // count: computed('data', function() {
  //   return this.formatNumbers(250000);
  // }),
  count: 0,

  init() {
    this._super();
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
      person(id: "http://orcid.org/${this.orcid}") {
        ${this.label.toLowerCase()}Count
      }
    }`
    let self = this;
      return request('https://api.datacite.org/client-api/graphql', query)
      .then(function(researcher) {
        console.log(researcher)
        self.set('count', self.formatNumbers(Object.values(researcher.person)[0]))
        return researcher;
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
