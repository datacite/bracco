import { helper as buildHelper } from '@ember/component/helper';

export function formatCreator([ creators ], hash) {
  let limit = creators.length;
  if (hash.showOnly) {
    limit = hash.showOnly;
  }
  if (limit > hash.index + 2) {
    return ', ';
  } else if (limit > hash.index + 1) {
    return ' & ';
  } else {
    return '';
  }
}

export default buildHelper(formatCreator);
