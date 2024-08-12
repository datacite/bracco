import classic from 'ember-classic-decorator';
import BaseValidator from 'ember-cp-validations/validators/base';
import isURL from 'validator/lib/isURL';

@classic
class UrlFormat extends BaseValidator {
  validate(value, options) {
    if (!value && options.allowBlank) {
      return true;
    } else if (!value) {
      let message = "This field can't be blank.";
      return message;
      // don't validate info URIs (not handled by validator)
    } else if (value.startsWith('info:')) {
      return true;
    } else {
      // default options for this validator, require_protocol set to true
      let defaultOptions = {
        protocols: ['http', 'https', 'ftp'],
        require_tld: true,
        require_protocol: true,
        require_host: true,
        require_valid_protocol: true,
        allow_underscores: false,
        host_whitelist: false,
        host_blacklist: false,
        allow_trailing_dot: false,
        allow_protocol_relative_urls: false,
        disallow_auth: false
      };

      if (value && isURL(value, Object.assign(defaultOptions, options))) {
        return true;
      } else {
        let message = 'Please enter a valid URL.';
        return message;
      }
    }
  }
}

export default UrlFormat;
