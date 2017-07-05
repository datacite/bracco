import Ember from 'ember';
import ENV from 'bracco/config/environment';

export function siteTitle(params) {
  return (params[0] === "index") ? null : ENV.SITE_TITLE;
}

export default Ember.Helper.helper(siteTitle);
