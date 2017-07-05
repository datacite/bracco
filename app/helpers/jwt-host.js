import Ember from 'ember';
import ENV from 'bracco/config/environment';

export function jwtHost() {
  return ENV.JWT_HOST;
}

export default Ember.Helper.helper(jwtHost);
