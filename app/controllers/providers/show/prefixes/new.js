import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),
  prefixes: [],
  disabled: true,

  searchPrefix(query) {
    let self = this;
    this.store.query('prefix', { query, state: 'unassigned', sort: 'name', 'page[size]': 10 }).then(function(prefixes) {
      self.set('prefixes', prefixes);
    }).catch(function(reason) {
      console.debug(reason);
      self.set('prefixes', []);
    });
  },

  actions: {
    searchPrefix(query) {
      this.searchPrefix(query);
    },
    selectPrefix(prefix) {
      this.model['provider-prefix'].set('prefix', prefix);
      this.set('disabled', false);
      this.searchPrefix(null);
    },
    submit() {
      let self = this;
      this.model['provider-prefix'].save().then(function(providerPrefix) {
        self.set('disabled', true);
        // We need a timeout because ElasticSearch indexing is very slow for this transition to work properly
        setTimeout(() => {  
          self.transitionToRoute('providers.show.prefixes', providerPrefix.get('provider'));
        }, 1200);
      }).catch(function(reason) {
        console.debug(reason);
      });
    },
    cancel() {
      this.model['provider-prefix'].set('prefix', null);
      this.set('disabled', true);
      this.transitionToRoute('providers.show.prefixes', this.get('model.provider'));
    },
  },
});
