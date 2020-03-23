import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { setupQunit as setupPolly } from '@pollyjs/core';

module('Acceptance | anonymous | repository', function(hooks) {
  setupPolly(hooks);
  setupApplicationTest(hooks);

  test('visiting repository AWI', async function(assert) {
    await visit('/repositories/tib.awi');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Test');
  });

  test('visiting repository AWI info', async function(assert) {
    await visit('/repositories/tib.awi/info');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Test');
  });

  test('visiting repository AWI prefixes', async function(assert) {
    await visit('/repositories/tib.awi/prefixes');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Test');
  });

  test('visiting repository AWI dois', async function(assert) {
    await visit('/repositories/tib.awi/dois');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Test');
  });
});
