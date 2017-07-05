import Ember from 'ember';
import ENV from 'bracco/config/environment';

export function orcidURL() {
  return Ember.String.htmlSafe(ENV.ORCID_URL);
}

export default Ember.Helper.helper(orcidURL);
