export default function bugsnag() {
  return true;
}

import Ember from 'ember';

const { getProperties } = Ember;

export function getUser(owner) {
  const currentUser = owner.lookup('service:current-user').get('user');
  if (currentUser) {
    const {
      email,
      uid,
      fullName: name
    } = getProperties(currentUser, 'email', 'uid', 'fullName');

    return {
      email,
      uid,
      name
    };
  }
}
