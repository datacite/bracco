import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | consortium_admin | repository', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'dc',
      name: 'DataCite Consortium',
      role_id: 'provider_admin',
      provider_id: 'dc',
    });
  });

  test('visiting repository DataCite RPH', async function(assert) {
    await visit('/repositories/datacite.rph');

    assert.equal(currentURL(), '/repositories/datacite.rph');
    assert.dom('h2.work').hasText('DataCite Test RPH');
    assert.dom('li a.nav-link.active').hasText('Info');

    // repository charts are displayed
    assert.dom('#chart-doi-title').includesText('DOIs by year');
  });

  test('visiting repository DataCite RPH settings', async function(assert) {
    await visit('/repositories/datacite.rph/settings');

    assert.equal(currentURL(), '/repositories/datacite.rph/settings');
    assert.dom('h2.work').hasText('DataCite Test RPH');
    assert.dom('li a.nav-link.active').hasText('Settings');

    // consortium member can't edit or delete repositories
    assert.dom('button#edit-repository').doesNotExist();
    assert.dom('button#delete-repository').doesNotExist();
  });

  test('visiting repository DataCite RPH prefixes', async function(assert) {
    await visit('/repositories/datacite.rph/prefixes');

    assert.equal(currentURL(), '/repositories/datacite.rph/prefixes');
    assert.dom('h2.work').hasText('DataCite Test RPH');
    assert.dom('li a.nav-link.active').hasText('Prefixes');
    assert.dom('div#search').exists();

    // one prefix exists
    assert.dom('[data-test-prefix]').includesText('10.70048');
    assert.dom('div.panel.facets').exists();
    assert.dom('[data-test-results]').doesNotExist();

    // consortium member can assign new prefix
    // assert.dom('a#assign-prefix').includesText('Assign Prefix');
  });

  test('visiting repository DataCite RPH dois', async function(assert) {
    await visit('/repositories/datacite.rph/dois');

    assert.equal(currentURL(), '/repositories/datacite.rph/dois');
    assert.dom('h2.work').hasText('DataCite Test RPH');
    assert.dom('li a.nav-link.active').hasText('DOIs');
    assert.dom('div#search').exists();

    // at least one doi exists
    // TODO Ember-Inflector pluralizes DOI to Dois
    assert.dom('[data-test-results]').includesText('Dois');
    assert.dom('[data-test-doi]').exists();
    assert.dom('div.panel.facets').exists();

    // consortium member can't add dois, but can transfer them
    assert.dom('a#new-doi').doesNotExist();
    assert.dom('a#upload-doi').doesNotExist();
    assert.dom('a#transfer-dois').includesText('Transfer');
  });
});
