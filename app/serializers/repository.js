import ApplicationSerializer from './application';

const keysForRelationshipsMapping = {
  'repository': 'client'
};

export default ApplicationSerializer.extend({
  keyForRelationship(key) {
    if (keysForRelationshipsMapping[key]) {
      return this._super(keysForRelationshipsMapping[key]);
    } else {
      return this._super(...arguments);
    }
  }
});
