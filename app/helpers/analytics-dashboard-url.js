import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import ENV from 'bracco/config/environment';

function isEmpty(val){
  return (val === undefined || val == null || val.length <= 0) ? true : false;
}

export function analyticsDashboardUrl(params/*, hash*/) {
  var ret = '';
  var model = params[0];
  var domain = ((!isEmpty(model) && !isEmpty(model.url)) ? (new URL(model.url)).hostname  : '' );

  if (!isEmpty(model) && !isEmpty(domain) && !isEmpty(model.analytics_slug) && !isEmpty(ENV.ANALYTICS_URL)) {
    ret = htmlSafe(ENV.ANALYTICS_URL + '/share/' + domain + '?auth=' + model.analytics_slug + '&embed=true&theme=light');
  }

  // For debugging:
  //if ( 1 == 1 ) {
  //  ret = htmlSafe("https://analytics.stage.datacite.org/share/suzanne-vogt-1.dyndns.org?auth=arBLIScSqY2FPrZA9CdNv&embed=true&theme=light");
  //}

  return ret;
}

export default helper(analyticsDashboardUrl);
