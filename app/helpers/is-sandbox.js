import Ember from 'ember';
import ENV from 'bracco/config/environment';

export function isSandbox() {
  return ENV.IS_SANDBOX;
}

export default Ember.Helper.helper(isSandbox);
