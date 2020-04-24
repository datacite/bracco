import { inject as service } from '@ember/service';
import BaseValidator from 'ember-cp-validations/validators/base';

const UniqueDoi = BaseValidator.extend({
  store: service(),

  validate(value, options) {
    let doi = options.dependentKeys[0] + '/' + value;
    return this.store.query('doi', { id: doi }).then((result) => {
      if (result.content.length > 0) {
        return 'The DOI ' + doi + ' already exists.';
      } else {
        return true;
      }
    }).catch(function(reason) {
      console.debug(reason);
      return 'An error happened while looking up the DOI ' + value + '.';
    });
  },
});

UniqueDoi.reopenClass({
  getDependentsFor() {
    return [ 'doi' ];
  },
});

export default UniqueDoi;
