import { getProperties } from '@ember/object';
export default function bugsnag() {
  return true;
}

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
