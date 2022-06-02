import BaseValidator from 'ember-cp-validations/validators/base';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import URI from 'urijs';

const UrlDomain = BaseValidator.extend({
  store: service(),

  validate(value, options, model) {
    if (!value && options.allowBlank) {
      return true;
    } else {
      return this.store.findRecord('repository', model.get('repository.id'), { reload: true }).then(function(repository) {
        // if any domain is allowed
        if (repository.domains === '*') {
          return true;
        }

        // check all domains in the domain list
        let uri = new URI(value);
        let domainList = A(repository.domains.split(','));
        let matchedDomain = domainList.any(d => {
          // strip asterisk for subdomain
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
      });
    }
  },
});

export default UrlDomain;
