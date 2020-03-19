import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  click,
  fillIn,
} from '@ember/test-helpers';
import ENV from 'bracco/config/environment';

module('Acceptance | client_admin | provider', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await visit('/sign-in');
    await fillIn('input#account-field', 'DATACITE.TEST');
    await fillIn('input#password-field', ENV.CLIENT_ADMIN_PASSWORD);
    await click('button[type=submit]');
  });

  test('visiting provider DataCite info', async function(assert) {
    await visit('/providers/datacite/info');

    assert.equal(currentURL(), '/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });

  test('visiting provider DataCite repositories', async function(assert) {
    await visit('/providers/datacite/repositories');

    assert.equal(currentURL(), '/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });

  test('visiting provider DataCite prefixes', async function(assert) {
    await visit('/providers/datacite/prefixes');

    assert.equal(currentURL(), '/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });

  test('visiting provider DataCite dois', async function(assert) {
    await visit('/providers/datacite/dois');

    assert.equal(currentURL(), '/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });
});
