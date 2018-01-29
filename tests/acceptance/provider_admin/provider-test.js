import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'bracco/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | provider_admin | provider', {
  beforeEach: function () {
    this.application.register('service:mock-user', Ember.Service.extend({
      uid: 'tib',
      name: 'Technische Informationsbibliothek',
      role_id: 'provider_admin',
      provider_id: 'tib'
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
    assert.equal(find('button#delete-provider').length, 0);
  });
});

test('editing provider TIB settings', function(assert) {
  visit('/providers/tib/settings');
  click('button#edit-provider');

  andThen(function() {
    assert.equal(currentURL(), '/providers/tib/settings');
    assert.equal(find('h2.work').text(), 'German National Library of Science and Technology');
    assert.equal(find('button#edit-provider').length, 0);
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
