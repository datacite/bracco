import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  keyForRelationship(key) {
    return key;
  }
});
