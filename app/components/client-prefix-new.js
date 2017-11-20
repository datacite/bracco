import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  new: false,
  client: null,
  prefix: null,
  prefixes: [],

  searchPrefix(query) {
    this.set('prefixes', this.get('store').query('prefix', { query: query, 'provider-id': this.get('client').get('provider-id'), state: 'without-client', sort: 'name', 'page[size]': 25 }));
    },

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('client', this.get('model.client'));

    this.searchPrefix(null);
  },

  actions: {
    submit() {
      let self = this;
      var clientPrefix = this.get('store').createRecord('clientPrefix', { client: this.get('client'), prefix: this.get('prefix') });
      clientPrefix.save().then(function() {
        self.get('router').transitionTo('clients.show.prefixes', self.get('client'));
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
      this.get('router').transitionTo('clients.show.prefixes', this.get('model.client'));
    }
  }
});
