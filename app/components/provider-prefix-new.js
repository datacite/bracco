import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  new: false,
  prefix: null,
  prefixes: [],

  searchPrefix(query) {
    this.set('prefixes', this.get('store').query('prefix', { query: query, state: 'unassigned', sort: 'name', 'page[size]': 25 }));
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.searchPrefix(null);
  },

  actions: {
    submit() {
      let self = this;
      var providerPrefix = this.get('store').createRecord('providerPrefix', { provider: this.get('model.provider'), prefix: this.get('prefix') });
      providerPrefix.save().then(function(providerPrefix) {
        self.get('router').transitionTo('providers.show.prefixes', providerPrefix.get('provider'));
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    searchPrefix(query) {
      this.searchPrefix(query);
    },
    selectPrefix(prefix) {
      this.set('prefix', prefix);
    },
    cancel() {
      this.get('router').transitionTo('providers.show.prefixes', this.get('model.provider'));
    }
  }
});
