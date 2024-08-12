import classic from 'ember-classic-decorator';
import ApplicationSerializer from './application';

@classic
export default class ProviderPrefix extends ApplicationSerializer {
  // don't return this._super('client')
  keyForRelationship(key) {
    if (key === 'repositories') {
      return 'clients';
    } else {
      return super.keyForRelationship(...arguments);
    }
  }
}
