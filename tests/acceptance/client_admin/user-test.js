import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | client_admin | user', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi',
    });
  });

  test('visiting users', async function(assert) {
    await visit('/users');

    assert.equal(currentURL(), '/repositories/tib.awi');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
  });

  test('visiting specific user', async function(assert) {
    await visit('/users/0000-0003-1419-2405');

    assert.equal(currentURL(), '/users/0000-0003-1419-2405');
    assert.dom('h2.work').hasText('Martin Fenner');
  });
});