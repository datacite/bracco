import Ember from 'ember';
import ENV from 'bracco/config/environment';

export function urlTransform([url], hash) {

  if (hash.contentType) {
    return ENV.DATA_URL + '/' + hash.contentType + '/' + url + '?status';
  } else {
    return ENV.DATA_URL + '/' + url + '?status';
  }
}

export default Ember.Helper.helper(urlTransform);
