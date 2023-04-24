import { helper as buildHelper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import ENV from 'bracco/config/environment';

export function links() {
  return  ENV.LINKS;
}

export default buildHelper(links);