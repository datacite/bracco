import { helper as buildHelper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import ENV from 'bracco/config/environment';

export function analyticsDashboardScriptUrl() {
  return htmlSafe(ENV.ANALYTICS_URL + '/js/embed.host.js');
}

export default buildHelper(analyticsDashboardScriptUrl);
