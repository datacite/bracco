import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';

module('Acceptance | anonymous | client', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting client AWI', async function(assert) {
    await visit('/clients/tib.awi');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Test');
  });

  test('visiting client AWI settings', async function(assert) {
    await visit('/clients/tib.awi/settings');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Test');
  });

  test('visiting client AWI prefixes', async function(assert) {
    await visit('/clients/tib.awi/prefixes');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Test');
  });

  test('visiting client AWI dois', async function(assert) {
    await visit('/clients/tib.awi/dois');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Test');
  });
});
