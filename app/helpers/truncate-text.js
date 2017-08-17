import Ember from 'ember';

export function truncateText(params, hash) {
  var value = params[0];
  var len = hash.limit;
  var out = '';

  if (value) {
    out = value.substr(0, len);

    if (value.length > len) {
      out += '...';
    }

  } else {
    out = '';
  }

  return Ember.String.htmlSafe(out);
}

export default Ember.Helper.helper(truncateText);
