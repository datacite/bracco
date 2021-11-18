import { helper as buildHelper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import ENV from 'bracco/config/environment';

export function showAnalytics() {
  return (ENV.SHOW_ANALYTICS);
}

export default buildHelper(showAnalytics);