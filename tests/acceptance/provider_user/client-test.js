import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'bracco/tests/helpers/module-for-acceptance';
import ENV from 'bracco/config/environment';

moduleForAcceptance('Acceptance | provider_user | client', {
  beforeEach: function () {
    this.application.register('service:mock-user', Ember.Service.extend({
      uid: (ENV.USER_API_URL === "https://profiles.datacite.org/api") ? '0000-0002-1825-0097' : '0000-0001-5489-3594',
      name: 'Josiah Carberry',
      role_id: 'provider_user',
      provider_id: 'tib'
    }));
    this.application.inject('adapter', 'currentUser', 'service:mock-user');
    this.application.inject('ability', 'currentUser', 'service:mock-user');
    this.application.inject('route', 'currentUser', 'service:mock-user');
    this.application.inject('component', 'currentUser', 'service:mock-user');
    this.application.inject('helper', 'currentUser', 'service:mock-user');
  }
});

// test('visiting client AWI', function(assert) {
//   visit('/clients/tib.awi');
//
//   andThen(function() {
//     assert.equal(currentURL(), '/clients/tib.awi');
//     assert.equal(find('h2.work').text(), 'Alfred-Wegener-Institut');
//     assert.equal(find('a.nav-link.active').text(), 'Info');
//   });
// });

test('visiting client AWI settings', function(assert) {
  visit('/clients/tib.awi/settings');

  andThen(function() {
    assert.equal(currentURL(), '/clients/tib.awi/settings');
    assert.equal(find('h2.work').text(), 'Alfred-Wegener-Institut');
    assert.equal(find('a.nav-link.active').text(), 'Settings');
  });
});

// test('visiting client AWI users', function(assert) {
//   visit('/clients/tib.awi/users');
//
//   andThen(function() {
//     assert.equal(currentURL(), '/clients/tib.awi/users');
//     assert.equal(find('h2.work').text(), 'Alfred-Wegener-Institut');
//     assert.equal(find('a.nav-link.active').text(), 'Users');
//   });
// });

test('visiting client AWI prefixes', function(assert) {
  visit('/clients/tib.awi/prefixes');

  andThen(function() {
    assert.equal(currentURL(), '/clients/tib.awi/prefixes');
    assert.equal(find('h2.work').text(), 'Alfred-Wegener-Institut');
    assert.equal(find('a.nav-link.active').text(), 'Prefixes');
  });
});

test('visiting client AWI dois', function(assert) {
  visit('/clients/tib.awi/dois');

  andThen(function() {
    assert.equal(currentURL(), '/clients/tib.awi/dois');
    assert.equal(find('h2.work').text(), 'Alfred-Wegener-Institut');
    assert.equal(find('a.nav-link.active').text(), 'DOIs');
  });
});
