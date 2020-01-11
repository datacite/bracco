import { helper as buildHelper } from '@ember/component/helper';

export function formatNumbers(counter) {
  if (counter < 1e3) {return counter;}
  if (counter >= 1e3 && counter < 1e6) {return `${+(counter / 1e3).toFixed(1)}K`;}
  if (counter >= 1e6 && counter < 1e9) {return `${+(counter / 1e6).toFixed(1)}M`;}
  if (counter >= 1e9 && counter < 1e12) {return `${+(counter / 1e9).toFixed(1)}B`;}
  if (counter >= 1e12) {return `${+(counter / 1e12).toFixed(1)}T`;}
  return counter;
}

export default buildHelper(formatNumbers);
