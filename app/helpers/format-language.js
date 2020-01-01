import { helper } from '@ember/component/helper';
import ISO6391 from 'iso-639-1';

export function formatLanguage([ language ]) {
  return ISO6391.getName(language);
}

export default helper(formatLanguage);
