import Ember from 'ember';
import DS from 'ember-data';
import ENV from 'bracco/config/environment';

export default DS.Model.extend({
  provider: DS.belongsTo('provider', {
    async: true
  }),
  client: DS.belongsTo('client', {
    async: true
  }),
  role: DS.belongsTo('role', {
    async: true
  }),
  sandbox: DS.belongsTo('sandbox', {
    async: true
  }),

  givenNames: DS.attr('string'),
  familyName: DS.attr('string'),
  name: DS.attr('string'),
  orcid: DS.attr('string'),
  github: DS.attr('string'),
  email: DS.attr('string'),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  identifier: Ember.computed('id', function() {
    return ENV.ORCID_URL + '/' + this.get('id');
  })
});
