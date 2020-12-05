import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import ENV from 'bracco/config/environment';

export function cdnUrl() {
  return htmlSafe(ENV.CDN_URL);
}

export default helper(cdnUrl);
