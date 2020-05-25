import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { setupQunit as setupPolly } from '@pollyjs/core';

module('Acceptance | anonymous | user', function(hooks) {
  setupPolly(hooks);
  setupApplicationTest(hooks);

  test('visiting users', async function(assert) {
    await visit('/users');

    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite Fabrica Stage');
  });

  test('visiting specific user', async function(assert) {
    await visit('/users/0000-0003-1419-2405');

    assert.equal(currentURL(), '/users/0000-0003-1419-2405');
    assert.dom('h2.work').hasText('Martin Fenner');
  });
});
