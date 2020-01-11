import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  // click,
} from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | staff_admin | admin', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin',
    });
  });

  test('is logged in', async function(assert) {
    await visit('/');

    assert.dom('a#account_menu_link').hasText('ADMIN');
  });

  test('visiting homepage', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('li a.nav-link.active').hasText('Info');
  });

  // the following pages require authentication. Redirects to homepage otherwise
  test('visiting settings', async function(assert) {
    await visit('/settings');

    assert.equal(currentURL(), '/settings');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('li a.nav-link.active').hasText('Settings');
  });

  test('visiting members', async function(assert) {
    await visit('/providers');

    assert.equal(currentURL(), '/providers');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('li a.nav-link.active').hasText('Members');
    assert.dom('div#search').exists();

    // at least one member exists
    assert.dom('[data-test-results]').includesText('Members');
    assert.dom('[data-test-provider]').exists();
    assert.dom('div.panel.facets').exists();

    // staff can add member
    assert.dom('a#add-provider').exists();
  });

  test('visiting repositories', async function(assert) {
    await visit('/repositories');

    assert.equal(currentURL(), '/repositories');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('li a.nav-link.active').hasText('Repositories');
    assert.dom('div#search').exists();

    // at least one repository exists
    assert.dom('[data-test-results]').includesText('Repositories');
    assert.dom('[data-test-repository]').exists();
    assert.dom('div.panel.facets').exists();

    // staff can't add repositories here (needs to go to provider first)
    assert.dom('a#add-repository').doesNotExist();
  });

  test('visiting prefixes', async function(assert) {
    await visit('/prefixes');

    assert.equal(currentURL(), '/prefixes');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('li a.nav-link.active').hasText('Prefixes');
    assert.dom('div#search').exists();

    // at least one prefix exists
    assert.dom('[data-test-results]').includesText('Prefixes');
    assert.dom('[data-test-prefix]').exists();
    assert.dom('div.panel.facets').exists();

    // admin can add new prefixes
    assert.dom('a#add-prefixes').includesText('Add Prefixes');
  });

  test('visiting prefix 10.5038', async function(assert) {
    await visit('/prefixes/10.5038');

    assert.equal(currentURL(), '/prefixes/10.5038');
    assert.dom('div.alert-warning').includesText('The page was not found.');
  });
});
