import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export function formatContact([ contact ]) {
  let name = null;
  let email = null;

  // use email as fallback if not givenName or familyName
  if (contact.email) {
    email = contact.email;
  }

  if (contact.givenName || contact.familyName) {
    name = [ contact.givenName, contact.familyName ].join(' ');
  }

  if (name && email) {
    return htmlSafe('<a href="mailto:' + email + '">' + name + '</a>');
  } else if (email) {
    return htmlSafe('<a href="mailto:' + email + '">' + email + '</a>');
  } else if (name) {
    return name;
  } else {
    return '';
  }
}

export default helper(formatContact);
