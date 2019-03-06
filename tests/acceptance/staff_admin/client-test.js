import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | staff_admin | client', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting client AWI', async function(assert) {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    await visit('/clients/tib.awi');

    assert.equal(currentURL(), '/clients/tib.awi');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('a.nav-link.active').hasText('Info');
  });

  test('visiting client AWI settings', async function(assert) {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    await visit('/clients/tib.awi/settings');

    assert.equal(currentURL(), '/clients/tib.awi/settings');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('a.nav-link.active').hasText('Settings');
    assert.dom('button#edit-client').includesText('Update Client');
    assert.dom('button#delete-client').includesText('Delete');
  });

  test('visiting client AWI prefixes', async function(assert) {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    await visit('/clients/tib.awi/prefixes');

    assert.equal(currentURL(), '/clients/tib.awi/prefixes');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('a.nav-link.active').hasText('Prefixes');
  });

  test('visiting client AWI dois', async function(assert) {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    await visit('/clients/tib.awi/dois');

    assert.equal(currentURL(), '/clients/tib.awi/dois');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    
    // assert.dom('h3.work').doesNotExist();
    // assert.dom('a#new-doi').doesNotExist();
    // assert.dom('a#upload-doi').doesNotExist();
    // assert.dom('a#transfer-dois').includesText('Transfer DOIs');
  });
});
