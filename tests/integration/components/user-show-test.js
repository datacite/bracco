// import { make, manualSetup }  from 'ember-data-factory-guy';
// import hbs from 'htmlbars-inline-precompile';
// import { test, moduleForComponent } from 'ember-qunit';
// import Ember from 'ember';
// import ENV from 'bracco/config/environment';
//
// moduleForComponent('user-show', 'Integration | Component | user show', {
//   integration: true,
//
//   beforeEach: function () {
//     manualSetup(this.container);
//
//     this.register('service:mock-user', Ember.Service.extend({
//       uid: (ENV.USER_API_URL === "https://profiles.datacite.org/api") ? '0000-0002-1825-0097' : '0000-0001-5489-3594',
//       name: 'Josiah Carberry',
//       role_id: 'provider_admin',
//       provider_id: 'tib'
//     }));
//     this.inject.service('service:mock-user', { as: 'currentUser' });
//   }
// });
//
// test('it renders', function(assert) {
//   let user = make('user');
//
//   this.render(hbs`{{user-show model=user}}`);
//   // this.set('user', user);
//
//   assert.equal(this.$('.name').text().trim(), '');
// });
