import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const UniqueDoi = BaseValidator.extend({
  store: Ember.inject.service(),

  validate(value, options, model, dependentKeys) {
    let doi = this.get(options.dependentKeys[0]) + '/' + value;
    return this.get('store').query('doi', { id: doi }).then((result) => {
      if(result.content.length > 0) {
        return "The DOI " + doi + " already exists.";
      } else {
        return true;
      }
    });
  }
});

UniqueDoi.reopenClass({
  getDependentsFor() {
    return ['doi'];
  }
});

export default UniqueDoi;
