import Ember from 'ember';
import ENV from 'lagotto-admin/config/environment';

export function siteTitle(params) {
  return (params[0] === "index") ? null : ENV.SITE_TITLE;
}

export default Ember.Helper.helper(siteTitle);
