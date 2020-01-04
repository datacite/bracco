import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  // click,
  // fillIn,
} from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | staff_admin | provider', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin',
    });
  });

  test('visiting provider TIB', async function(assert) {
    await visit('/providers/tib');

    assert.equal(currentURL(), '/providers/tib');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('li a.nav-link.active').hasText('Info');

    // provider charts are displayed
    assert.dom('#chart-repository-title').includesText('Repositories by year');
    assert.dom('#chart-doi-title').includesText('DOIs by year');
  });

  test('visiting consortium DC', async function(assert) {
    await visit('/providers/dc');

    assert.equal(currentURL(), '/providers/dc');
    assert.dom('h2.work').hasText('DataCite Consortium');
    assert.dom('li a.nav-link.active').hasText('Info');

    // consortium charts are displayed
    assert.dom('#chart-organization-title').includesText('Organizations by year');
    assert.dom('#chart-repository-title').includesText('Repositories by year');
    assert.dom('#chart-doi-title').includesText('DOIs by year');
  });

  test('visiting provider TIB settings', async function(assert) {
    await visit('/providers/tib/settings');

    assert.equal(currentURL(), '/providers/tib/settings');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('a.nav-link.active').hasText('Settings');
    assert.dom('button#edit-provider').includesText('Update Member');
    assert.dom('button#delete-provider').includesText('Delete Member');
  });

  // test('editing provider TIB settings', async function(assert) {
  //   await visit('/providers/tib/settings');
  //   await click('button#edit-provider');

  //   assert.equal(currentURL(), '/providers/tib/settings');
  //   assert.dom('h2.work').hasText('German National Library of Science and Technology');
  //   assert.dom('button#edit-provider').doesNotExist();

  //   await fillIn('input#provider-name-field', 'German National Library of Science and Technology');
  //   await click('button#cancel');

  //   assert.equal(currentURL(), '/providers/tib/settings');
  //   assert.dom('h2.work').hasText('German National Library of Science and Technology');
  //   assert.dom('a.nav-link.active').hasText('Settings');
  // });

  test('visiting provider TIB repositories', async function(assert) {
    await visit('/providers/tib/repositories');

    assert.equal(currentURL(), '/providers/tib/repositories');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('a.nav-link.active').hasText('Repositories');
    assert.dom('div#search').exists();

    // at least one repository exists
    assert.dom('[data-test-results]').includesText('Repositories');
    assert.dom('[data-test-repository]').exists();
    assert.dom('div.panel.facets').exists();

    // admin can add repository
    assert.dom('button#add-repository').includesText('Add Repository');
  });

  test('visiting provider TIB dois', async function(assert) {
    await visit('/providers/tib/dois');

    assert.equal(currentURL(), '/providers/tib/dois');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('li a.nav-link.active').hasText('DOIs');
    assert.dom('div#search').exists();

    // at least one doi exists
    assert.dom('[data-test-results]').includesText('DOIs');
    assert.dom('[data-test-doi]').exists();
    assert.dom('div.panel.facets').exists();

    // admin can't add dois here (needs to go to repository)
    assert.dom('a#new-doi').doesNotExist();
    assert.dom('a#upload-doi').doesNotExist();
    assert.dom('a#transfer-dois').doesNotExist();
  });

  test('visiting provider TIB prefixes', async function(assert) {
    await visit('/providers/tib/prefixes');

    assert.equal(currentURL(), '/providers/tib/prefixes');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('li a.nav-link.active').hasText('Prefixes');
    assert.dom('div#search').exists();

    // at least one prefix exists
    assert.dom('[data-test-results]').includesText('Prefixes');
    assert.dom('[data-test-prefix]').exists();
    assert.dom('div.panel.facets').exists();

    // admin can assign new prefix
    assert.dom('a#assign-prefix').includesText('Assign Prefix');
  });
});
