import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'bracco/tests/helpers/module-for-acceptance';
import ENV from 'bracco/config/environment';

moduleForAcceptance('Acceptance | client_admin | admin', {
  beforeEach: function () {
    this.application.register('service:mock-user', Ember.Service.extend({
      uid: (ENV.USER_API_URL === "https://profiles.datacite.org/api") ? '0000-0002-1825-0097' : '0000-0001-5489-3594',
      name: 'Josiah Carberry',
      role_id: 'client_user',
      provider_id: 'tib',
      client_id: 'tib.awi'
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
  let uid = (ENV.USER_API_URL === "https://profiles.datacite.org/api") ? '0000-0002-1825-0097' : '0000-0001-5489-3594';

  visit('/users/' + uid);

  andThen(function() {
    assert.equal(currentURL(), '/users/' + uid);
    assert.equal(find('div.panel-title h2').text(), 'Josiah Carberry');
  });
});

test('visiting specific user', function(assert) {
  let uid = (ENV.USER_API_URL === "https://profiles.datacite.org/api") ? '0000-0003-1419-2405' : '0000-0001-6528-2027';

  visit('/users/' + uid);

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

test('visiting specific doi', function(assert) {
  let doi = (ENV.USER_API_URL === "https://profiles.datacite.org/api") ? '10.5517/ccdc.csd.cc1pl0dp' : '10.5438%2F53nz-n4g7';

  visit('/dois/' + doi);

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting specific doi not managed by client', function(assert) {
  visit('/dois/10.5520%2Fsagecite-1');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting specific doi managed by client', function(assert) {
  visit('/dois/10.2312/cr_m84_4');

  andThen(function() {
    assert.equal(currentURL(), '/dois/10.2312%2Fcr_m84_4');
    assert.equal(find('h2.work').text(), '10.2312/cr_m84_4');
  });
});
