import { helper as buildHelper } from '@ember/component/helper';

export function isEqual([leftSide, rightSide]) {
  return leftSide === rightSide;
}

export default buildHelper(isEqual);
