import classic from 'ember-classic-decorator';
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from 'bracco/config/environment';

@classic
export default class Ror extends JSONAPIAdapter {
  host = ENV.ROR_API_URL;

  init() {
    super.init(...arguments);

    this.set('headers', {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
  }

  pathForType() {
    return 'organizations';
  }

  authorize() {}
}
