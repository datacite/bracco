// import Ember from 'ember';
// import { test } from 'qunit';
// import moduleForAcceptance from 'bracco/tests/helpers/module-for-acceptance';

// moduleForAcceptance('Acceptance | provider_admin | client', {
//   beforeEach: function () {
//     this.application.register('service:mock-user', Ember.Service.extend({
//       uid: 'tib',
//       name: 'Technische Informationsbibliothek',
//       role_id: 'provider_admin',
//       provider_id: 'tib'
//     }));
//     this.application.inject('adapter', 'currentUser', 'service:mock-user');
//     this.application.inject('ability', 'currentUser', 'service:mock-user');
//     this.application.inject('route', 'currentUser', 'service:mock-user');
//     this.application.inject('component', 'currentUser', 'service:mock-user');
//     this.application.inject('helper', 'currentUser', 'service:mock-user');
//   }
// });

// test('visiting client AWI', function(assert) {
//   visit('/clients/tib.awi');
//
//   andThen(function() {
//     assert.equal(currentURL(), '/clients/tib.awi');
//     assert.equal(find('h2.work').text(), 'Alfred-Wegener-Institut');
//     assert.equal(find('a.nav-link.active').text(), 'Info');
//   });
// });

// test('visiting client AWI settings', function(assert) {
//   visit('/clients/tib.awi/settings');

//   andThen(function() {
//     assert.equal(currentURL(), '/clients/tib.awi/settings');
//     assert.equal(find('h2.work').text(), 'Alfred-Wegener-Institut');
//     assert.equal(find('a.nav-link.active').text(), 'Settings');
//     assert.equal(find('button#edit-client').text().trim(), 'Edit Client');
//     assert.equal(find('button#delete-client').text().trim(), 'Delete Client');
//   });
// });

// test('visiting client AWI prefixes', function(assert) {
//   visit('/clients/tib.awi/prefixes');

//   andThen(function() {
//     assert.equal(currentURL(), '/clients/tib.awi/prefixes');
//     assert.equal(find('h2.work').text(), 'Alfred-Wegener-Institut');
//     assert.equal(find('a.nav-link.active').text(), 'Prefixes');
//   });
// });

// test('visiting client AWI dois', function(assert) {
//   visit('/clients/tib.awi/dois');

//   andThen(function() {
//     assert.equal(currentURL(), '/clients/tib.awi/dois');
//     assert.equal(find('h2.work').text(), 'Alfred-Wegener-Institut');
//     assert.equal(find('button#add-doi').text(), 'Add DOI');
//     assert.equal(find('a#transfer-dois').text(), 'Transfer DOIs');
//   });
// });
