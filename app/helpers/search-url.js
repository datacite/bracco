import Ember from 'ember';
import ENV from 'lagotto-admin/config/environment';

export function searchURL() {
  return Ember.String.htmlSafe(ENV.SEARCH_URL);
}

export default Ember.Helper.helper(searchURL);
