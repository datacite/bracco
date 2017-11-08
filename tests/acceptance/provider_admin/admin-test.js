import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'bracco/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | provider_admin | admin', {
  beforeEach: function () {
    this.application.register('service:mock-user', Ember.Service.extend({
      uid: '0000-0001-5489-3594',
      name: 'Josiah Carberry',
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

test('visiting homepage', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

// the following pages require authentication. Redirects to homepage otherwise
test('visiting settings', function(assert) {
  visit('/settings');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting providers', function(assert) {
  visit('/providers');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting clients', function(assert) {
  visit('/clients');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting users', function(assert) {
  visit('/users');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting personal settings', function(assert) {
  visit('/users/0000-0001-5489-3594');

  andThen(function() {
    assert.equal(currentURL(), '/users/0000-0001-5489-3594');
    assert.equal(find('div.panel-title h2').text(), 'Josiah Carberry');
  });
});

test('visiting user 0000-0001-6528-2027', function(assert) {
  visit('/users/0000-0001-6528-2027');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting prefixes', function(assert) {
  visit('/prefixes');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting prefix 10.5072', function(assert) {
  visit('/prefixes/10.5072');

  andThen(function() {
    assert.equal(currentURL(), '/prefixes/10.5072');
    assert.equal(find('div.alert-warning').text().trim(), 'The page was not found.');
  });
});

test('visiting dois', function(assert) {
  visit('/dois');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting doi 10.5438/53nz-n4g7', function(assert) {
  visit('/dois/10.5438%2F53nz-n4g7');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});
