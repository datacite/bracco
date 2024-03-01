import { helper } from '@ember/component/helper';

export function twitterUrl([twitter]) {
  if (twitter) {
    return 'https://twitter.com/' + twitter.substr(1);
  } else {
    return null;
  }
}

export default helper(twitterUrl);
