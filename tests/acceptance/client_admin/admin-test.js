import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  click,
  fillIn,
} from '@ember/test-helpers';
import ENV from 'bracco/config/environment';

module('Acceptance | client_admin | admin', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await visit('/sign-in');
    await fillIn('input#account-field', 'DATACITE.TEST');
    await fillIn('input#password-field', ENV.CLIENT_ADMIN_PASSWORD);
    await click('button[type=submit]');
  });

  test('is logged in', async function(assert) {
    await visit('/');

    assert.dom('a#account_menu_link').hasText('DATACITE.TEST');
  });

  test('visiting homepage', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });

  // the following pages require authentication. Redirects to homepage otherwise
  test('visiting info', async function(assert) {
    await visit('/info');

    assert.equal(currentURL(), '/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });

  test('visiting providers', async function(assert) {
    await visit('/providers');

    assert.equal(currentURL(), '/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });

  test('visiting repositories', async function(assert) {
    await visit('/repositories');

    assert.equal(currentURL(), '/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });

  test('visiting prefixes', async function(assert) {
    await visit('/prefixes');

    assert.equal(currentURL(), '/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });
});
