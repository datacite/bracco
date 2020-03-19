import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  click,
  fillIn,
} from '@ember/test-helpers';
import ENV from 'bracco/config/environment';

module('Acceptance | staff_admin | admin', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await visit('/sign-in');
    await fillIn('input#account-field', 'ADMIN');
    await fillIn('input#password-field', ENV.STAFF_ADMIN_PASSWORD);
    await click('button[type=submit]');
  });

  test('is logged in', async function(assert) {
    await visit('/');

    assert.dom('a#account_menu_link').hasText('ADMIN');
  });

  test('visiting homepage', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('li a.nav-link.active').hasText('Settings');
  });

  // the following pages require authentication. Redirects to homepage otherwise
  test('visiting info', async function(assert) {
    await visit('/info');

    assert.equal(currentURL(), '/info');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('div.tab-content').exists();
    assert.dom('li a.nav-link.active').hasText('Info');
  });

  test('editing admin form', async function(assert) {
    assert.expect(11);

    await visit('/edit');

    assert.equal(currentURL(), '/edit');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('div.tab-content').exists();

    assert.dom('input#member-id-field').exists();
    assert.dom('input#system-email-field').exists();
    assert.dom('input#website-field').exists();
    assert.dom('input#twitter-handle-field').exists();
    assert.dom('div#ror-id').exists();
    assert.dom('div#country').exists();
    assert.dom('textarea#description-field').exists();

    assert.dom('button#update-provider').includesText('Update Account');
  });

  test('editing admin password form', async function(assert) {
    await visit('/change');

    assert.equal(currentURL(), '/change');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('div.tab-content').exists();

    assert.dom('input#password-input-field').exists();
    assert.dom('input#confirm-password-input-field').exists();

    assert.dom('button[type=submit]').includesText('Set Password');
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
    assert.dom('a#add-provider').includesText('Add Member');
    assert.dom('a#add-provider').hasAttribute('href', '/providers/new');
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
    assert.dom('a#add-prefixes').hasAttribute('href', '/prefixes/new');
  });

  test('visiting prefix 10.5038', async function(assert) {
    await visit('/prefixes/10.5038');

    assert.equal(currentURL(), '/prefixes/10.5038');
    assert.dom('div.alert-warning').includesText('The page was not found.');
  });
});
