import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import BaseValidator from 'ember-cp-validations/validators/base';

@classic
class UniqueRepositoryId extends BaseValidator {
  @service
  store;

  validate(value, options, model) {
    let providerId = model.get('provider').get('symbol') + '.';
    if (value === providerId) {
      return true;
    } else {
      return this.store
        .query('repository', { id: value })
        .then((result) => {
          if (result.content.length > 0) {
            return (
              'The Repository ID ' +
              value +
              ' already exists, or existed before and has been deleted. Contact DataCite staff if you want to create an account with this Repository ID.'
            );
          } else {
            return true;
          }
        })
        .catch(function (reason) {
          console.debug(reason);
          return (
            'An error happened while looking up the Repository ID ' +
            value +
            '.'
          );
        });
    }
  }
}

UniqueRepositoryId.reopenClass({
  getDependentsFor() {
    return ['id'];
  }
});

export default UniqueRepositoryId;
