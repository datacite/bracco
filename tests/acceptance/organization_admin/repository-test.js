import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  click,
  fillIn,
} from '@ember/test-helpers';
import ENV from 'bracco/config/environment';

module('Acceptance | organization_admin | repository', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await visit('/sign-in');
    await fillIn('input#account-field', 'DATACITE');
    await fillIn('input#password-field', ENV.ORGANIZATION_ADMIN_PASSWORD);
    await click('button[type=submit]');
  });

  test('visiting repository DataCite Journal', async function(assert) {
    await visit('/repositories/datacite.datacite/info');

    assert.equal(currentURL(), '/repositories/datacite.datacite/info');
    assert.dom('h2.work').hasText('DataCite Repository');
    assert.dom('li a.nav-link.active').hasText('Info');

    // repository charts are displayed
    assert.dom('#chart-doi-title').includesText('by year');
  });

  test('visiting repository DataCite Journal', async function(assert) {
    await visit('/repositories/datacite.datacite');

    assert.equal(currentURL(), '/repositories/datacite.datacite');
    assert.dom('h2.work').hasText('DataCite Repository');
    assert.dom('li a.nav-link.active').hasText('Settings');
    assert.dom('a#edit-repository').includesText('Update Repository');
    assert.dom('a#delete-repository').includesText('Delete');
  });

  test('visiting repository DataCite Test', async function(assert) {
    await visit('/repositories/datacite.test');

    assert.equal(currentURL(), '/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
    assert.dom('li a.nav-link.active').hasText('Settings');
    assert.dom('a#edit-repository').includesText('Update Repository');
    assert.dom('a#delete-repository').includesText('Delete');
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
