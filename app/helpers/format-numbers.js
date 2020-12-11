import { helper as buildHelper } from '@ember/component/helper';

export function formatNumbers([counter]) {
  if (!counter) {
    return '0';
  } else if (counter < 1e3) {
    return counter;
  } else if (counter >= 1e3 && counter < 1e6) {
    return `${+(counter / 1e3).toFixed(1)}K`;
  } else if (counter >= 1e6 && counter < 1e9) {
    return `${+(counter / 1e6).toFixed(1)}M`;
  } else if (counter >= 1e9 && counter < 1e12) {
    return `${+(counter / 1e9).toFixed(1)}B`;
  } else if (counter >= 1e12) {
    return `${+(counter / 1e12).toFixed(1)}T`;
  }
}

export default buildHelper(formatNumbers);
