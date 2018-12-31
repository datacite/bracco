import { helper as buildHelper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import ENV from 'bracco/config/environment';

export function orcidURL() {
  return htmlSafe(ENV.ORCID_URL);
}

export default buildHelper(orcidURL);
