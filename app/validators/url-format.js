import BaseValidator from 'ember-cp-validations/validators/base';
import isURL from 'validator/lib/isURL';

const UrlFormat = BaseValidator.extend({
  validate(value, options) {
    if (!value && options.allowBlank) {
      return true;
    } else if (!value) {
      let message = 'This field can\'t be blank.';
      return message;
    } else {
      // default options for this validator, require_protocol set to true
      let defaultOptions = { protocols: [ 'http','https','ftp' ], require_tld: true, require_protocol: true, require_host: true, require_valid_protocol: true, allow_underscores: false, host_whitelist: false, host_blacklist: false, allow_trailing_dot: false, allow_protocol_relative_urls: false, disallow_auth: false };

      if (value && isURL(value, Object.assign(defaultOptions, options))) {
        return true;
      } else {
        let message = 'Please enter a valid URL.';
        return message;
      }
    }
  },
});

export default UrlFormat;
