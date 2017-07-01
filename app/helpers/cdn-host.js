import Ember from 'ember';
import ENV from 'lagotto-admin/config/environment';

export function cdnHost() {
  return Ember.String.htmlSafe(ENV.CDN_HOST);
}

export default Ember.Helper.helper(cdnHost);
