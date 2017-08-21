import Ember from 'ember';
import ENV from 'bracco/config/environment';

export function siteTitle() {
  return Ember.String.htmlSafe(ENV.SITE_TITLE);
}

export default Ember.Helper.helper(siteTitle);
