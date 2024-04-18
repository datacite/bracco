import { inject as service } from '@ember/service';
import BaseValidator from 'ember-cp-validations/validators/base';

const UniqueProviderId = BaseValidator.extend({
  store: service(),

  validate(value, options, model) {
    if (value.length < 2 || !model.get('isNew')) {
      return true;
    } else {
      return this.store
        .query('provider', { id: value })
        .then((result) => {
          if (result.content.length > 0) {
            return (
              'The Member ID ' +
              value +
              ' already exists, or existed before and has been deleted. Please contact DataCite staff if you want to create an account with this Member ID.'
            );
          } else {
            return true;
          }
        })
        .catch(function (reason) {
          console.debug(reason);
          return (
            'An error happened while looking up the Member ID ' + value + '.'
          );
        });
    }
  }
});

UniqueProviderId.reopenClass({
  getDependentsFor() {
    return ['id'];
  }
});

export default UniqueProviderId;
