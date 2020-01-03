import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit, click, fillIn } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | organization_admin | provider', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'datacite',
      name: 'DataCite',
      role_id: 'provider_admin',
      provider_id: 'datacite',
    });
  });

  test('visiting provider DataCite', async function(assert) {
    await visit('/providers/datacite');

    assert.equal(currentURL(), '/providers/datacite');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('li a.nav-link.active').hasText('Info');

    // provider charts are displayed
    assert.dom('#chart-repository-title').includesText('Repositories by year');
    assert.dom('#chart-doi-title').includesText('DOIs by year');
  });

  test('visiting provider DataCite settings', async function(assert) {
    await visit('/providers/datacite/settings');

    assert.equal(currentURL(), '/providers/datacite/settings');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('li a.nav-link.active').hasText('Settings');
    assert.dom('button#edit-provider').includesText('Update Account');
    assert.dom('button#delete-provider').doesNotExist();
  });

  test('editing provider DataCite settings', async function(assert) {
    await visit('/providers/datacite/settings');

    assert.equal(currentURL(), '/providers/datacite/settings');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('li a.nav-link.active').hasText('Settings');
    assert.dom('button#edit-provider').exists();
    assert.dom('button#delete-provider').doesNotExist();

    await click('button#edit-provider');
    await fillIn('input#display-name-field', 'DataCite II');
    await click('button[type=submit]');

    assert.equal(currentURL(), '/providers/datacite/settings');
    assert.dom('h2.work').hasText('DataCite II');
    assert.dom('li a.nav-link.active').hasText('Settings');
  });

  test('visiting provider DataCite repositories', async function(assert) {
    await visit('/providers/datacite/repositories');

    assert.equal(currentURL(), '/providers/datacite/repositories');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('a.nav-link.active').hasText('Repositories');
    assert.dom('div#search').exists();

    // at least one repository exists
    assert.dom('[data-test-results]').includesText('Repositories');
    assert.dom('[data-test-repository]').exists();
    assert.dom('div.panel.facets').exists();

    // provider can add repository
    assert.dom('button#add-repository').includesText('Add Repository');
  });

  test('visiting provider DataCite dois', async function(assert) {
    await visit('/providers/datacite/dois');

    assert.equal(currentURL(), '/providers/datacite/dois');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('li a.nav-link.active').hasText('DOIs');
    assert.dom('div#search').exists();

    // at least one doi exists
    // TODO Ember-Inflector pluralizes DOI to Dois
    assert.dom('[data-test-results]').includesText('Dois');
    assert.dom('[data-test-doi]').exists();
    assert.dom('div.panel.facets').exists();

    // provider can't add dois here (or via repository)
    assert.dom('a#new-doi').doesNotExist();
    assert.dom('a#upload-doi').doesNotExist();
    assert.dom('a#transfer-dois').doesNotExist();
  });

  // test('visiting specific doi managed by provider', async function(assert) {
  //   await visit('/providers/tib/dois');

  //   // first DOI in list
  //   await click('h3.work:first-child a');

  //   assert.dom('a#transfer-doi').includesText('Transfer DOI');
  //   assert.dom('a#edit-doi').doesNotExist();
  //   assert.dom('a#modify-doi').doesNotExist();
  //   assert.dom('a#delete-doi').doesNotExist();
  // });

  test('visiting provider DataCite prefixes', async function(assert) {
    await visit('/providers/datacite/prefixes');

    assert.equal(currentURL(), '/providers/datacite/prefixes');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('li a.nav-link.active').hasText('Prefixes');
    assert.dom('div#search').exists();

    // at least one prefix exists
    assert.dom('[data-test-results]').includesText('Prefixes');
    assert.dom('[data-test-prefix]').exists();
    assert.dom('div.panel.facets').exists();

    // provider can assign new prefix
    assert.dom('a#assign-prefix').includesText('Assign Prefix');
  });
});
