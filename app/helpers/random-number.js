import { helper } from '@ember/component/helper';

export function randomNumber([max]) {
  let min = 0;
  return Math.floor(Math.random() * (parseInt(max) - min + 1) + min);
}

export default helper(randomNumber);
