import Ember from 'ember';
import ENV from 'lagotto-admin/config/environment';

export function orcidURL() {
  return Ember.String.htmlSafe(ENV.ORCID_URL);
}

export default Ember.Helper.helper(orcidURL);
