import Ember from 'ember';
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({

  didInsertElement: function() {
    this.set('isSandbox', ENV.IS_SANDBOX);
  }
});
