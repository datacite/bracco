import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

const Validations = buildValidations({
  confirmId: validator('confirmation', {
    on: 'symbol',
    message: 'Provider ID does not match'
  })
});

export default Ember.Component.extend(Validations, {
  store: Ember.inject.service(),

  edit: false,
  change: false,
  delete: false,
  provider: null,
  confirmId: null,

  reset() {
    this.set('provider', null);
    this.set('edit', false);
    this.set('change', false);
    this.set('delete', false);
  },
  generate() {
    let self = this;
    let url = ENV.USER_API_URL + '/random';
    fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + this.get('currentUser').get('jwt')
      }
    }).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          self.get('model').set('passwordInput', data.phrase);
        });
      } else {
        Ember.Logger.assert(false, response)
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error)
    });
  },

  actions: {
    edit: function(provider) {
      this.set('provider', provider);
      this.get('provider').set('confirmSymbol', provider.get('symbol'));
      this.set('edit', true);
    },
    change: function(provider) {
      this.set('provider', provider);
      this.get('provider').set('confirmSymbol', provider.get('symbol'));
      this.get('provider').set('password', null);
      this.set('change', true);
    },
    generate() {
      this.generate();
    },
    delete: function(provider) {
      this.set('provider', provider);
      this.get('provider').set('confirmSymbol', null);
      this.set('delete', true);
    },
    setPassword: function() {
      let self = this;
      this.get('provider').save().then(function () {
        self.reset();
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    submit: function() {
      let self = this;
      this.get('provider').save().then(function () {
        self.reset();
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    destroy: function(provider) {
      let self = this;
      if (this.get('confirmId') === provider.get('symbol')) {
        provider.destroyRecord().then(function () {
          self.get('router').transitionTo('/providers');
        }).catch(function(reason){
          Ember.Logger.assert(false, reason);
        });
      }
    },
    cancel: function() {
      this.reset();
    },
    onSuccess() {
    },
    onError(error) {
      Ember.Logger.assert(false, error)
    }
  }
});
