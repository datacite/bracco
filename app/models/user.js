import Ember from 'ember';
import DS from 'ember-data';
import ENV from 'bracco/config/environment';

export default DS.Model.extend({
  provider: DS.belongsTo('provider', {
    async: false
  }),
  client: DS.belongsTo('client', {
    async: false
  }),
  role: DS.belongsTo('role', {
    async: false
  }),
  sandbox: DS.belongsTo('sandbox', {
    async: true
  }),

  givenNames: DS.attr('string'),
  familyName: DS.attr('string'),
  name: DS.attr('string'),
  uid: DS.attr('string'),
  orcid: DS.attr('string'),
  github: DS.attr('string'),
  email: DS.attr('string'),
  isActive: DS.attr('boolean'),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  identifier: Ember.computed('id', function() {
    return ENV.ORCID_URL + '/' + this.get('id');
  })
});
