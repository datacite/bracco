import Ember from 'ember';
import ENV from 'bracco/config/environment';

export function cdnUrl() {
  return Ember.String.htmlSafe(ENV.CDN_URL);
}

export default Ember.Helper.helper(cdnUrl);
