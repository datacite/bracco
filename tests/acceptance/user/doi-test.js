import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | user | doi', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: '0000-0001-6528-2027',
      name: 'Martin Fenner',
      role_id: 'user',
    });
  });

  test('visiting dois', async function(assert) {
    await visit('/dois');

    assert.equal(currentURL(), '/users/0000-0001-6528-2027');
    assert.dom('h2.work').hasText('Martin Fenner');
  });

  test('visiting specific doi', async function(assert) {
    await authenticateSession({
      uid: '0000-0001-6528-2027',
      name: 'Martin Fenner',
      role_id: 'user',
    });
    await visit('/dois/10.80225%2Fda52-79195');

    assert.equal(currentURL(), '/users/0000-0001-6528-2027');
    assert.dom('h2.work').hasText('Martin Fenner');
  });
});
