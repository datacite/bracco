// import Ember from 'ember';
// import { test } from 'qunit';
// import moduleForAcceptance from 'bracco/tests/helpers/module-for-acceptance';

// moduleForAcceptance('Acceptance | anonymous | client', {
//   beforeEach: function () {
//     this.application.register('service:mock-user', Ember.Service.extend({}));
//     this.application.inject('adapter', 'currentUser', 'service:mock-user');
//     this.application.inject('ability', 'currentUser', 'service:mock-user');
//     this.application.inject('route', 'currentUser', 'service:mock-user');
//     this.application.inject('component', 'currentUser', 'service:mock-user');
//     this.application.inject('helper', 'currentUser', 'service:mock-user');
//   }
// });

// test('visiting client AWI', function(assert) {
//   visit('/clients/tib.awi');

//   andThen(function() {
//     assert.equal(currentURL(), '/');
//     assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
//   });
// });

// test('visiting client AWI settings', function(assert) {
//   visit('/clients/tib.awi/settings');

//   andThen(function() {
//     assert.equal(currentURL(), '/');
//     assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
//   });
// });

// test('visiting client AWI prefixes', function(assert) {
//   visit('/clients/tib.awi/prefixes');

//   andThen(function() {
//     assert.equal(currentURL(), '/');
//     assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
//   });
// });

// test('visiting client AWI dois', function(assert) {
//   visit('/clients/tib.awi/dois');

//   andThen(function() {
//     assert.equal(currentURL(), '/');
//     assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
//   });
// });
