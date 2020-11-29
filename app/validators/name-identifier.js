import { inject as service } from '@ember/service';
import BaseValidator from 'ember-cp-validations/validators/base';
// import fetch from 'fetch';
// import Checkdigit from 'checkdigit';

const NameIdentifier = BaseValidator.extend({
  store: service(),

  validate(value) {
    if (!value) {
      return true;
    } else if (
      value.startsWith('https://orcid.org') ||
      value.startsWith('http://orcid.org')
    ) {
      // check identifier format
      const re = /^(http|https):\/\/orcid\.org\/\d{4}-\d{4}-\d{4}-\d{3}[0-9X]+$/;
      if (!re.test(value)) {
        let message =
          'Not a valid ORCID identifier. Must start with https://orcid.org/, followed by 16 digits in groups of four, separated by hyphen. Last character can also be X.';
        return message;
      }

      // check checksum
      // let num = value.replace(/-/g, '');
      // if (!Checkdigit.mod11.isValid(num)) {
      //   let message = "Checksum does not validate for " + num + ".";
      //   return message;
      // }

      // lookup identifier
      let id = value.substr(value.indexOf('0'));
      return this.store
        .findRecord('person', id)
        .then(function () {
          return true;
        })
        .catch(function () {
          let message =
            'ORCID identifier does not exist. Please make sure you entered the correct identifier.';
          return message;
        });
    } else if (value.startsWith('https://ror.org')) {
      // check identifier format
      const re = /^https:\/\/ror\.org\/0\w{6}\d{2}$/;
      if (!re.test(value)) {
        let message =
          'Not a valid ROR identifier. Must start with https://ror.org/, followed by 9 characters or digits starting with 0 and ending with two digits.';
        return message;
      }

      // lookup identifier
      let id = 'ror.org/' + value.substr(value.indexOf('0'));
      return this.store
        .findRecord('ror', id)
        .then(function () {
          return true;
        })
        .catch(function () {
          let message =
            'ROR identifier does not exist. Please make sure you entered the correct identifier.';
          return message;
        });
    } else if (value.startsWith('http://isni.org')) {
      // check identifier format
      const re = /^http:\/\/isni\.org\/isni\/\d{15}[0-9X]+$/;
      if (!re.test(value)) {
        let message =
          'Not a valid ISNI identifier. Must start with http://isni.org/isni/, followed by 16 digits. Last character can also be X.';
        return message;
      }

      return true;

      // lookup identifier
      // return fetch(value).then(function() {
      //   return true;
      // }).catch(function() {
      //   let message = 'ISNI identifier does not exist. Please make sure you entered the correct identifier.'
      //   return message;
      // });
    } else {
      const re = /^(http|https):\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
      if (!re.test(value)) {
        let message = 'The name identifier must be expressed as URL';
        return message;
      }

      return true;
      // // lookup identifier
      // // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSExternalRedirectNotAllowed
      // return fetch(value,{method: 'head', redirect: 'error'}
      //   ).then(function() {
      //   return true;
      // }).catch(function() {
      //   console.log()
      //   let message = 'Name identifier does not exist. Please make sure you entered the correct identifier.'
      //   return message;
      // });
    }
  }
});

NameIdentifier.reopenClass({
  getDependentsFor() {
    return ['id'];
  }
});

export default NameIdentifier;
