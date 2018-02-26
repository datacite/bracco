import Ember from 'ember';
const { service } = Ember.inject;
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  currentUser: service(),
  store: service(),

  tagName: 'div',
  classNames: ['row'],
  new: false,
  edit: false,
  doi: '',
  provider: null,
  target: null,
  client: null,
  clients: [],
  prefix: '10.5072',
  suffix: '',
  prefixes: [],

  searchClient(query) {
    if (this.get('currentUser').get('isAdmin')) {
      this.set('clients', this.get('store').query('client', { 'query': query, sort: 'name', 'page[size]': 100 }));
    } else if (this.get('currentUser').get('isProvider')) {
      this.set('clients', this.get('store').query('client', { 'query': query, 'provider-id': this.get('currentUser').get('providerId'), sort: 'name', 'page[size]': 100 }));
    }
  },
  selectTarget(target) {
    this.set('target', target)
    this.get('client').set('target', target);
  },
  reset() {
    this.set('client', null);
    this.set('edit', false);
    this.set('new', false);
  },

  actions: {
    new: function(model) {
      this.set('client', this.get('store').peekRecord('client', model.get('otherParams.client-id')));
      this.set('doi', this.get('store').createRecord('doi', { client: this.get('client') }));
      this.set('new', true);
      this.set('prefixes', this.get('store').query('prefix', { 'client-id': this.get('client.id'), sort: 'name', 'page[size]': 25 }));
    },
    edit: function() {
      this.set('client', this.get('store').findRecord('client', this.get('model.otherParams.client-id')));
      this.searchClient(null);
      this.set('edit', true);
    },
    setPrefix(prefix) {
      this.set('prefix', prefix);
      if (this.get('doi').get('doi')) {
        this.set('suffix', this.get('doi').get('doi').split('/', 2).pop());
      }
      this.get('doi').set('doi', prefix + '/' + this.get('suffix'));
    },
    generate() {
      let self = this;
      let url = ENV.APP_URL + '/dois/random?prefix=' + this.get('prefix');
      fetch(url, {
        headers: {
          'Authorization': 'Bearer ' + this.get('currentUser').get('jwt')
        }
      }).then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            self.get('doi').set('doi', data.doi);
          });
        } else {
          Ember.Logger.assert(false, response)
        }
      }).catch(function(error) {
        Ember.Logger.assert(false, error)
      });
    },
    searchClient(query) {
      this.searchClient(query);
    },
    selectTarget(target) {
      this.selectTarget(target);
    },
    update() {
      this.get('client').save();
      this.set('edit', false);
      this.get('router').transitionTo('clients.show.dois', this.get('target'));
    },
    submit: function(doi) {
      doi.set('confirmDoi', doi.get('doi'));
      doi.set('event', 'start');
      let self = this;
      doi.save().then(function(doi) {
        self.get('router').transitionTo('dois.show', doi.id);
        self.set('new', false);
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    cancel: function() {
      this.reset();
    }
  }
});
