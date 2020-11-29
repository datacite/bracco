import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { setupQunit as setupPolly } from '@pollyjs/core';

module('Acceptance | anonymous | provider', function (hooks) {
  setupPolly(hooks);
  setupApplicationTest(hooks);

  test('visiting provider TIB', async function (assert) {
    await visit('/providers/tib');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Stage');
  });

  test('visiting provider TIB info', async function (assert) {
    await visit('/providers/tib/info');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Stage');
  });

  test('visiting provider TIB repositories', async function (assert) {
    await visit('/providers/tib/repositories');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Stage');
  });

  test('visiting provider TIB prefixes', async function (assert) {
    await visit('/providers/tib/prefixes');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Stage');
  });

  test('visiting provider TIB dois', async function (assert) {
    await visit('/providers/tib/dois');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Stage');
  });
});
