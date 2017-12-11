import Ember from 'ember';
import ENV from 'bracco/config/environment';

export function urlTransform([doi], hash) {

  if (hash.contentType) {
    return ENV.DATA_URL + '/' + hash.contentType + '/' + doi + '?status';
  } else {
    return ENV.DATA_URL + '/' + doi + '?status';
  }
}

export default Ember.Helper.helper(urlTransform);
