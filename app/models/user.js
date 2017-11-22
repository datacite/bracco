import Ember from 'ember';
import DS from 'ember-data';
import ENV from 'bracco/config/environment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  // provider: [
  //   validator('presence', {
  //     presence: true,
  //     ignoreBlank: true,
  //     disabled: Ember.computed('model', function() {
  //       console.log(['staff_admin', 'staff_user', 'user'].includes(this.get('model').get('role_id')))
  //       return ['staff_admin', 'staff_user', 'user'].includes(this.get('model').get('role_id'));
  //     })
  //   })
  // ],
  // client: [
  //   validator('presence', {
  //     presence: true,
  //     ignoreBlank: true,
  //     disabled: Ember.computed('model', function() {
  //       return ['client_admin', 'client_user'].includes(this.get('model').get('role_id'));
  //     })
  //   })
  // ]
});

export default DS.Model.extend(Validations, {
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
