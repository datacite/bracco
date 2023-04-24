import { helper as buildHelper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import ENV from 'bracco/config/environment';

export function homeUrl() {
  return htmlSafe(ENV.HOME_URL);
}

export default buildHelper(homeUrl);
