import { helper as buildHelper } from '@ember/component/helper';



export function currentYear([add]) {
  return new Date().getFullYear() + parseInt(add);
}

export default buildHelper(currentYear);
