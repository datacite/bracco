import { helper as buildHelper } from '@ember/component/helper';

export function formatCreator([creators], hash) {
  if (creators.length > hash.index + 2) {
    return ', ';
  } else if (creators.length > hash.index + 1) {
    return ' & ';
  } else {
    return '';
  }
}

export default buildHelper(formatCreator);
