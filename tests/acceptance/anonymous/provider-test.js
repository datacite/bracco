import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';

module('Acceptance | anonymous | provider', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting provider TIB', async function(assert) {
    await visit('/providers/tib');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite DOI Fabrica Test');
  });

  test('visiting provider TIB settings', async function(assert) {
    await visit('/providers/tib/settings');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite DOI Fabrica Test');
  });

  test('visiting provider TIB clients', async function(assert) {
    await visit('/providers/tib/clients');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite DOI Fabrica Test');
  });

  test('visiting provider TIB prefixes', async function(assert) {
    await visit('/providers/tib/prefixes');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite DOI Fabrica Test');
  });

  test('visiting provider TIB dois', async function(assert) {
    await visit('/providers/tib/dois');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite DOI Fabrica Test');
  });
});
