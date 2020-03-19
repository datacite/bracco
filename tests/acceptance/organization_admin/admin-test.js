import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  click,
  fillIn,
} from '@ember/test-helpers';
import ENV from 'bracco/config/environment';

module('Acceptance | organization_admin | admin', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await visit('/sign-in');
    await fillIn('input#account-field', 'DATACITE');
    await fillIn('input#password-field', ENV.ORGANIZATION_ADMIN_PASSWORD);
    await click('button[type=submit]');
  });

  test('is logged in', async function(assert) {
    await visit('/');

    assert.dom('a#account_menu_link').hasText('DATACITE');
  });

  test('visiting homepage', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/providers/datacite/repositories');
    assert.dom('h2.work').hasText('DataCite');
  });

  // the following pages require authentication. Redirects to provider homepage otherwise
  test('visiting info', async function(assert) {
    await visit('/info');

    assert.equal(currentURL(), '/providers/datacite/repositories');
    assert.dom('h2.work').hasText('DataCite');
  });

  test('visiting providers', async function(assert) {
    await visit('/providers');

    assert.equal(currentURL(), '/providers/datacite/repositories');
    assert.dom('h2.work').hasText('DataCite');
  });

  test('visiting repositories', async function(assert) {
    await visit('/repositories');

    assert.equal(currentURL(), '/providers/datacite/repositories');
    assert.dom('h2.work').hasText('DataCite');
  });

  test('visiting prefixes', async function(assert) {
    await visit('/prefixes');

    assert.equal(currentURL(), '/providers/datacite/repositories');
    assert.dom('h2.work').hasText('DataCite');
  });

  test('visiting prefix 10.80225', async function(assert) {
    await visit('/prefixes/10.80225');

    assert.equal(currentURL(), '/prefixes/10.80225');
    assert.dom('div.alert-warning').includesText('The page was not found.');
  });
});
