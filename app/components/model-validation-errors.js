import Ember from 'ember';
import Component from '@ember/component';

export default Component.extend({

  didReceiveAttrs() {
    this._super(...arguments);

    let errors = this.get('model').get('validations.errors');

    if (errors.length > 0) {
      errors.forEach((item) => {
        Ember.Logger.assert(false, item);
      });
    }
  },
});
