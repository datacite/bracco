import Component from '@ember/component';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

export default Component.extend({
  init() {
    this._super(...arguments);

    this.generate();
  },

  generate() {
    let self = this;
    let url = ENV.API_URL + '/repositories/random';
    fetch(url).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          self.model.set('symbol', self.provider.get('id').toUpperCase() + '.' + data.symbol);
        });
      } else {
        console.debug(response);
      }
    }).catch(function(error) {
      console.debug(error);
    });
  },

  actions: {
    generate() {
      this.generate();
    },
    refresh() {
      this.generate();
    },
    clear() {
      this.model.set('symbol', null);
    },
  },
});
