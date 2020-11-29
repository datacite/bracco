import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { setupQunit as setupPolly } from '@pollyjs/core';

module('Acceptance | anonymous | doi', function (hooks) {
  setupPolly(hooks);
  setupApplicationTest(hooks);

  test('visiting dois', async function (assert) {
    await visit('/dois');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Stage');
  });

  test('visiting specific doi', async function (assert) {
    await visit('/dois/10.80225%2Fda52-7919');

    assert.equal(currentURL(), '/dois/10.80225%2Fda52-7919');
    assert.dom('h2.work').hasText('10.80225/da52-7919');
  });
});
