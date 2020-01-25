import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | organization_admin | repository', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'datacite',
      name: 'DataCite',
      role_id: 'provider_admin',
      provider_id: 'datacite',
    });
  });

  test('visiting repository DataCite Journal', async function(assert) {
    await visit('/repositories/datacite.datacite');

    assert.equal(currentURL(), '/repositories/datacite.datacite');
    assert.dom('h2.work').hasText('DataCite Repository');
    assert.dom('li a.nav-link.active').hasText('Info');

    // repository charts are displayed
    assert.dom('#chart-doi-title').includesText('DOI by year');
  });

  test('visiting repository DataCite Journal settings', async function(assert) {
    await visit('/repositories/datacite.datacite/settings');

    assert.equal(currentURL(), '/repositories/datacite.datacite/settings');
    assert.dom('h2.work').hasText('DataCite Repository');
    assert.dom('li a.nav-link.active').hasText('Settings');
    assert.dom('a#edit-repository').includesText('Update Repository');
    assert.dom('a#delete-repository').includesText('Delete');
  });

  test('visiting repository DataCite RPH', async function(assert) {
    await visit('/repositories/datacite.rph');

    assert.equal(currentURL(), '/repositories/datacite.rph');
    assert.dom('h2.work').hasText('DataCite Test RPH');
    assert.dom('li a.nav-link.active').hasText('Info');

    // repository charts are displayed
    assert.dom('#chart-doi-title').includesText('DOIs by year');
  });

  test('visiting repository DataCite Journal prefixes', async function(assert) {
    await visit('/repositories/datacite.datacite/prefixes');

    assert.equal(currentURL(), '/repositories/datacite.datacite/prefixes');
    assert.dom('h2.work').hasText('DataCite Repository');
    assert.dom('li a.nav-link.active').hasText('Prefixes');
    assert.dom('div#search').exists();

    // at least one prefix exists
    assert.dom('[data-test-results]').includesText('Prefixes');
    assert.dom('[data-test-prefix]').exists();
    assert.dom('div.panel.facets').exists();

    // TODO provider can assign new prefix
    // assert.dom('a#assign-prefix').includesText('Assign Prefix');
  });

  test('visiting repository DataCite Journal dois', async function(assert) {
    await visit('/repositories/datacite.datacite/dois');

    assert.equal(currentURL(), '/repositories/datacite.datacite/dois');
    assert.dom('h2.work').hasText('DataCite Repository');
    assert.dom('li a.nav-link.active').hasText('DOIs');
    assert.dom('div#search').exists();

    // at least one doi exists
    assert.dom('[data-test-results]').includesText('DOIs');
    assert.dom('[data-test-doi]').exists();
    assert.dom('div.panel.facets').exists();

    // provider can't add dois, but can transfer dois
    assert.dom('a#new-doi').doesNotExist();
    assert.dom('a#upload-doi').doesNotExist();
    assert.dom('a#transfer-dois').includesText('Transfer');
  });
});
