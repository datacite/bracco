import BaseValidator from 'ember-cp-validations/validators/base';

const NameIdentifier = BaseValidator.extend({
  validate(value) {
    if (!value) {
      let message = 'This field can\'t be blank';
      return message;
    } else if (value.startsWith('https://orcid.org') || value.startsWith('http://orcid.org')) {
      const re = /^(http|https):\/\/orcid\.org\/\d{4}-\d{4}-\d{4}-\d{3}[0-9X]+$/;
      if (re.test(value)) {
        return true;
      } else {
        let message = 'Not a valid ORCID identifier. Must start with https://orcid.org/, followed by 16 digits in groups of four, separated by hyphen. Last character can also be X.';
        return message;
      }
    } else if (value.startsWith('http://isni.org')) {
      const re = /^http:\/\/isni\.org\/isni\/\d{15}[0-9X]+$/;
      if (re.test(value)) {
        return true;
      } else {
        let message = 'Not a valid ISNI identifier. Must start with http://isni.org/isni/, followed by 16 digits. Last character can also be X.';
        return message;
      }
    } else if (value.startsWith('https://ror.org')) {
      const re = /^https:\/\/ror\.org\/0\w{6}\d{2}$/;
      if (re.test(value)) {
        return true;
      } else {
        let message = 'Not a valid ROR identifier. Must start with https://ror.org/, followed by 9 characters or digits starting with 0 and ending with two digits.';
        return message;
      }
    } else {
      const re = /^(http|https):\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
      if (re.test(value)) {
        return true;
      } else {
        let message = 'The name identifier must be expressed as URL';
        return message;
      }
    }
  }
});

NameIdentifier.reopenClass({
  getDependentsFor() {
    return ['id'];
  }
});

export default NameIdentifier;
