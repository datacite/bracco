import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'bracco/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | staff_admin | provider', {
  beforeEach: function () {
    this.application.register('service:mock-user', Ember.Service.extend({
      uid: '0000-0001-5489-3594',
      name: 'Josiah Carberry',
      role_id: 'staff_admin'
    }));
    this.application.inject('adapter', 'currentUser', 'service:mock-user');
    this.application.inject('ability', 'currentUser', 'service:mock-user');
    this.application.inject('route', 'currentUser', 'service:mock-user');
    this.application.inject('component', 'currentUser', 'service:mock-user');
    this.application.inject('helper', 'currentUser', 'service:mock-user');
  }
});

test('visiting provider TIB', function(assert) {
  visit('/providers/tib');

  andThen(function() {
    assert.equal(currentURL(), '/providers/tib');
    assert.equal(find('div.panel-title h2').text(), 'German National Library of Science and Technology');
    assert.equal(find('a.nav-link.active').text(), 'Info');
  });
});

test('visiting provider TIB settings', function(assert) {
  visit('/providers/tib/settings');

  andThen(function() {
    assert.equal(currentURL(), '/providers/tib/settings');
    assert.equal(find('div.panel-title h2').text(), 'German National Library of Science and Technology');
    assert.equal(find('a.nav-link.active').text(), 'Settings');
  });
});

test('visiting provider TIB users', function(assert) {
  visit('/providers/tib/users');

  andThen(function() {
    assert.equal(currentURL(), '/providers/tib/users');
    assert.equal(find('div.panel-title h2').text(), 'German National Library of Science and Technology');
    assert.equal(find('a.nav-link.active').text(), 'Users');
  });
});

test('visiting provider TIB clients', function(assert) {
  visit('/providers/tib/clients');

  andThen(function() {
    assert.equal(currentURL(), '/providers/tib/clients');
    assert.equal(find('div.panel-title h2').text(), 'German National Library of Science and Technology');
    assert.equal(find('a.nav-link.active').text(), 'Clients');
  });
});

test('visiting provider TIB dois', function(assert) {
  visit('/providers/tib/dois');

  andThen(function() {
    assert.equal(currentURL(), '/providers/tib/dois');
    assert.equal(find('div.panel-title h2').text(), 'German National Library of Science and Technology');
    assert.equal(find('a.nav-link.active').text(), 'DOIs');
  });
});

// test('visiting provider TIB prefixes', function(assert) {
//   visit('/providers/tib/prefixes');
//
//   andThen(function() {
//     assert.equal(currentURL(), '/providers/tib/prefixes');
//     assert.equal(find('div.panel-title h2').text(), 'German National Library of Science and Technology');
//     assert.equal(find('a.nav-link.active').text(), 'Prefixes');
//   });
// });
