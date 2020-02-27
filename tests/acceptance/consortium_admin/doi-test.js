import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | consortium_admin | admin', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'dc',
      name: 'DataCite Consortium',
      role_id: 'consortium_admin',
      provider_id: 'dc',
    });
  });

  test('visiting dois', async function(assert) {
    await visit('/dois');

    assert.equal(currentURL(), '/providers/dc');
    assert.dom('h2.work').hasText('DataCite Consortium');
  });

  test('visiting specific doi', async function(assert) {
    await visit('/dois/10.70048%2Fe605-dg05');

    assert.equal(currentURL(), '/dois/10.70048%2Fe605-dg05');
    assert.dom('h2.work').hasText('10.70048/e605-dg05');
  });
});
