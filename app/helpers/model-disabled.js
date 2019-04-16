import { helper } from '@ember/component/helper';

export function modelDisabled([isValid, state]) {
  return !(isValid || state === "draft");
}

export default helper(modelDisabled);
