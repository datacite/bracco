import BaseValidator from 'ember-cp-validations/validators/base';
import { A } from '@ember/array';
import URI from 'urijs';

const UrlDomain = BaseValidator.extend({
  validate(value, options, model) {
    if (!value && options.allowBlank) {
      return true;
    } else {
      let domains = model.get('repository').get('domains');

      // if any domain is allowed
      if (domains === '*') {
        return true;
      }

      // check all domains in the domain list
      let uri = new URI(value);
      let domainList = A(domains.split(','));
      let matchedDomain = domainList.any(d => {
        // strip asterix for subdomain
        if (d.startsWith('*.')) {
          d = d.substr(1);
          return uri.hostname().endsWith(d);
        } else {
          return uri.hostname() === d;
        }
      });

      if (matchedDomain) {
        return true;
      } else {
        let message = 'Please enter a URL that is allowed by the domains settings of the repository.';
        return message;
      }
    }
  },
});

export default UrlDomain;
