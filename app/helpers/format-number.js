import Ember from 'ember';

export function formatNumber(number) {
  return number.toLocaleString('en-US');
}

export default Ember.Helper.helper(formatNumber);
