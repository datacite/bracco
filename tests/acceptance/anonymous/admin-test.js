import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';

module('Acceptance | anonymous | admin', function(hooks) {
  setupApplicationTest(hooks);

  test('is not logged in', async function(assert) {
    await visit('/');

    assert.dom('a#account_menu_link').doesNotExist();
  });

  test('visiting homepage', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Test');
  });

  // the following pages require authentication. Redirects to homepage otherwise
  test('visiting dashboard', async function(assert) {
    await visit('/dashboard');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Test');
  });

  test('visiting providers', async function(assert) {
    await visit('/providers');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Test');
  });

  test('visiting repositories', async function(assert) {
    await visit('/repositories');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Test');
  });

  test('visiting prefixes', async function(assert) {
    await visit('/prefixes');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Test');
  });

  test('visiting prefix 10.5038', async function(assert) {
    await visit('/prefixes/10.5038');

    assert.equal(currentURL(), '/prefixes/10.5038');
    assert.dom('div.alert-warning').includesText('The page was not found.');
  });
});
