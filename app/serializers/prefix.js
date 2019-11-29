import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  // don't return this._super('client')
  keyForRelationship(key) {
    if (key === 'repositories') {
      return 'clients';
    } else {
      return this._super(...arguments);
    }
  }
});
