import Component from "@ember/component";
import { inject as service } from '@ember/service';


export default Component.extend({
  tagName: "div",
  classNames: ["col-lg-3", "col-md-4"],
  data: null,
  store: service(),

  init() {
    this._super();
    

    // schedule("afterRender", this, function() {
    //   this.send("barChart");
    // });
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.metricsCounter();
  },

  metricsCounter() {
    let self = this;
    this.store
      .query("prefix", {
        "client-id": this.repository.get("id"),
        sort: "name",
        "page[size]": 25
      })
      .then(function(prefixes) {
        if (typeof self.get("model").get("doi") == "undefined") {
          self.set("prefixes", prefixes);
        }

        // use first prefix that is not 10.5072 if it exists
        prefixes = prefixes.mapBy("id").removeObject("10.5072");
        let prefix =
          prefixes.length > 0 ? prefixes.get("firstObject") : "10.5072";

        self.get("model").set("prefix", prefix);

        if (typeof self.get("model").get("doi") == "undefined") {
          self.generate();
        }
      });
  },

  actions: {
    metricsCounter() {
      this.metricsCounter();
    }
  }
});
