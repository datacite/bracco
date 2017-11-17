import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'bracco/tests/helpers/module-for-acceptance';
import ENV from 'bracco/config/environment';

moduleForAcceptance('Acceptance | staff_admin | provider', {
  beforeEach: function () {
    this.application.register('service:mock-user', Ember.Service.extend({
      uid: (ENV.USER_API_URL === "https://profiles.datacite.org/api") ? '0000-0002-1825-0097' : '0000-0001-5489-3594',
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
    assert.equal(find('h2.work').text(), 'German National Library of Science and Technology');
    assert.equal(find('a.nav-link.active').text(), 'Info');
  });
});

test('visiting provider TIB settings', function(assert) {
  visit('/providers/tib/settings');

  andThen(function() {
    assert.equal(currentURL(), '/providers/tib/settings');
    assert.equal(find('h2.work').text(), 'German National Library of Science and Technology');
    assert.equal(find('a.nav-link.active').text(), 'Settings');
    assert.equal(find('button#edit-provider').text(), 'Edit Provider');
    assert.equal(find('button#delete-provider').text(), 'Delete Provider');
  });
});

test('editing provider TIB settings', function(assert) {
  visit('/providers/tib/settings');
  click('button#edit-provider');

  andThen(function() {
    assert.equal(currentURL(), '/providers/tib/settings');
    assert.equal(find('h2.work').text(), 'German National Library of Science and Technology');
    assert.equal(find('button#provider-edit').length, 0);
  });

  // fillIn('input[placeholder="Provider Name"]', 'German National Library of Science and Technology');
  // click('button#cancel');
  //
  // andThen(function() {
  //   assert.equal(currentURL(), '/providers/tib/settings');
  //   assert.equal(find('h2.work').text(), 'German National Library of Science and Technology');
  //   assert.equal(find('div.alert').text(), 'Settings');
  // });
});

test('visiting provider TIB users', function(assert) {
  visit('/providers/tib/users');

  andThen(function() {
    assert.equal(currentURL(), '/providers/tib/users');
    assert.equal(find('h2.work').text(), 'German National Library of Science and Technology');
    assert.equal(find('a.nav-link.active').text(), 'Users');
    assert.equal(find('a#add-user').text(), 'Add User');
  });
});

test('visiting provider TIB clients', function(assert) {
  visit('/providers/tib/clients');

  andThen(function() {
    assert.equal(currentURL(), '/providers/tib/clients');
    assert.equal(find('h2.work').text(), 'German National Library of Science and Technology');
    assert.equal(find('a.nav-link.active').text(), 'Clients');
    assert.equal(find('button#add-client').text().trim(), 'Add Client');
  });
});

test('visiting provider TIB dois', function(assert) {
  visit('/providers/tib/dois');

  andThen(function() {
    assert.equal(currentURL(), '/providers/tib/dois');
    assert.equal(find('h2.work').text(), 'German National Library of Science and Technology');
    assert.equal(find('a.nav-link.active').text(), 'DOIs');
    assert.equal(find('button#add-doi').length, 0);
  });
});

// test('visiting provider TIB prefixes', function(assert) {
//   visit('/providers/tib/prefixes');
//
//   andThen(function() {
//     assert.equal(currentURL(), '/providers/tib/prefixes');
//     assert.equal(find('h2.work').text(), 'German National Library of Science and Technology');
//     assert.equal(find('a.nav-link.active').text(), 'Prefixes');
//   });
// });
