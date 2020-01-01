import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | user | repository', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting repository AWI', async function(assert) {
    await authenticateSession({
      uid: '0000-0001-6528-2027',
      name: 'Martin Fenner',
      role_id: 'user',
    });

    await visit('/repositories/tib.awi');

    assert.equal(currentURL(), '/users/0000-0001-6528-2027');
    assert.dom('h2.work').hasText('Martin Fenner');
  });

  test('visiting repository AWI settings', async function(assert) {
    await authenticateSession({
      uid: '0000-0001-6528-2027',
      name: 'Martin Fenner',
      role_id: 'user',
    });

    await visit('/repositories/tib.awi/settings');

    assert.equal(currentURL(), '/users/0000-0001-6528-2027');
    assert.dom('h2.work').hasText('Martin Fenner');
  });

  test('visiting repository AWI prefixes', async function(assert) {
    await authenticateSession({
      uid: '0000-0001-6528-2027',
      name: 'Martin Fenner',
      role_id: 'user',
    });

    await visit('/repositories/tib.awi/prefixes');

    assert.equal(currentURL(), '/users/0000-0001-6528-2027');
    assert.dom('h2.work').hasText('Martin Fenner');
  });

  test('visiting repository AWI dois', async function(assert) {
    await authenticateSession({
      uid: '0000-0001-6528-2027',
      name: 'Martin Fenner',
      role_id: 'user',
    });

    await visit('/repositories/tib.awi/dois');

    assert.equal(currentURL(), '/users/0000-0001-6528-2027');
    assert.dom('h2.work').hasText('Martin Fenner');
  });
});