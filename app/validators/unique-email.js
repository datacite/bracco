import { inject as service } from '@ember/service';
import BaseValidator from 'ember-cp-validations/validators/base';

const UniqueEmail = BaseValidator.extend({
  store: service(),

  validate(value, options, model) {
    let providerId = model.get('provider.id');
    let query = `email:${value} !uid:${model.get('id')}`;

    // email should be unique per provider,
    // and that includes deleted records
    return this.store
      .query('contact', {
        query,
        provider_id: providerId,
        'include-deleted': true
      })
      .then((result) => {
        if (result.content.length > 0) {
          return (
            'The email address ' +
            value +
            ' already exists with a contact for provider ' +
            providerId.toUpperCase() +
            ', or existed before and has been deleted. Contact DataCite staff if you want to create an account with this email and provider ID.'
          );
        } else {
          return true;
        }
      })
      .catch(function (reason) {
        console.debug(reason);
        return (
          'An error happened while looking up the email address ' + value + '.'
        );
      });
  }
});

UniqueEmail.reopenClass({
  getDependentsFor() {
    return ['id'];
  }
});

export default UniqueEmail;
