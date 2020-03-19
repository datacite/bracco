import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';

module('Acceptance | anonymous | admin', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting dois', async function(assert) {
    await visit('/dois');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Test');
  });

  test('visiting specific doi', async function(assert) {
    await visit('/dois/10.80225%2Fe605-dg05');

    assert.equal(currentURL(), '/dois/10.80225%2Fe605-dg05');
    assert.dom('h2.work').hasText('10.80225/e605-dg05');
  });
});
