import { helper as buildHelper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import ENV from 'bracco/config/environment';

export function searchURL() {
  return htmlSafe(ENV.SEARCH_URL);
}

export default buildHelper(searchURL);
