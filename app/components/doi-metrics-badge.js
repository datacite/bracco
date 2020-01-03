import Component from "@ember/component";
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';


export default Component.extend({
  tagName: "div",
  classNames: ["container"],
  data: null,
  label: '',
  store: service(),
  count: computed('data', function() {
    return {
      citations: this.formatNumbers(47645376453),
      views: this.formatNumbers(232),
      downloads: this.formatNumbers(1),
    };
  }),

  init() {
    this._super();
  },

  didReceiveAttrs() {
    this._super(...arguments);

    // this.metricsCounter();
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
    let self = this;
    this.store
      .query("person", {
        "client-id": this.repository.get("id"),
        sort: "name",
        "page[size]": 25
      })
      .then(function(person) {
        this.count = 30;
      });
  },
  actions: {
    metricsCounter() {
      this.metricsCounter();
    }
  }
});
