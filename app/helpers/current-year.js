import { helper as buildHelper } from '@ember/component/helper';

export function currentYear([add]) {
  let incr = (add ? parseInt(add) : 0)
  return new Date().getFullYear() + parseInt(incr);
}

export default buildHelper(currentYear);
