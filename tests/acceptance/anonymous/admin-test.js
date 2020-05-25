import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { setupQunit as setupPolly } from '@pollyjs/core';

module('Acceptance | anonymous | admin', function(hooks) {
  setupPolly(hooks);
  setupApplicationTest(hooks);

  test('is not logged in', async function(assert) {
    await visit('/');

    assert.dom('a#account_menu_link').doesNotExist();
  });

  test('visiting homepage', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Stage');
  });

  // the following pages require authentication. Redirects to homepage otherwise
  test('visiting info', async function(assert) {
    await visit('/info');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Stage');
  });

  test('visiting providers', async function(assert) {
    await visit('/providers');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Stage');
  });

  test('visiting repositories', async function(assert) {
    await visit('/repositories');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Stage');
  });

  test('visiting prefixes', async function(assert) {
    await visit('/prefixes');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Stage');
  });

  test('visiting prefix 10.80225', async function(assert) {
    await visit('/prefixes/10.80225');

    assert.equal(currentURL(), '/prefixes/10.80225');
    assert.dom('div.alert-warning').includesText('The page was not found.');
  });
});
