import Ember from 'ember';
import Component from '@ember/component';
const { service } = Ember.inject;
import ENV from 'bracco/config/environment';
import fetch from 'fetch';

export default Component.extend({
  currentUser: service(),
  store: service(),

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('prefixes', this.get('store').query('prefix', { 'client-id': this.get('client').get('id'), sort: 'name', 'page[size]': 25 }));
    this.generate();
  },

  generate() {
    let self = this;
    let url = ENV.APP_URL + '/dois/random?prefix=' + this.get('model').get('prefix');
    return fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + this.get('currentUser').get('jwt')
      }
    }).then(function(response) {
      if (response.ok) {
        return response.json().then(function(data) {
          let suffix = data.doi.split('/', 2)[1]
          self.get('model').set('suffix', suffix);
          let doi = self.get('model').get('prefix') + '/' + suffix;
          self.get('model').set('doi', doi);
          self.get('model').set('confirmDoi', doi);
          return suffix;
        });
      } else {
        Ember.Logger.assert(false, response)
        return null;
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error)
    });
  },

  actions: {
    selectPrefix(prefix) {
      this.get('model').set('prefix', prefix.id);
      this.get('model').set('doi', prefix.id + '/' + this.get('model').get('suffix'));
    },
    selectSuffix(suffix) {
      this.get('model').set('suffix', suffix);
      this.get('model').set('doi', this.get('model').get('prefix') + '/' + suffix);
    },
    generate() {
      this.generate();
    },
    refresh() {
      this.generate();
    },
    clear() {
      this.get('model').set('suffix', null)
      this.$('input[type=text]:first').focus();
    }
  }
});
