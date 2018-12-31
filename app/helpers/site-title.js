import { helper as buildHelper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import ENV from 'bracco/config/environment';

export function siteTitle() {
  return htmlSafe(ENV.SITE_TITLE);
}

export default buildHelper(siteTitle);
