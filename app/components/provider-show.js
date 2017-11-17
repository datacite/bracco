import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  confirmId: validator('confirmation', {
    on: 'symbol',
    message: 'Provider ID does not match'
  })
});

export default Ember.Component.extend(Validations, {
  store: Ember.inject.service(),

  edit: false,
  delete: false,
  provider: null,
  confirmId: null,

  reset() {
    this.set('provider', null);
    this.set('edit', false);
    this.set('delete', false);
  },

  actions: {
    edit: function(provider) {
      this.set('provider', provider);
      this.get('provider').set('confirmSymbol', provider.get('symbol'));
      this.set('edit', true);
    },
    delete: function(provider) {
      this.set('provider', provider);
      this.get('provider').set('confirmSymbol', null);
      this.set('delete', true);
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
    }
  }
});
