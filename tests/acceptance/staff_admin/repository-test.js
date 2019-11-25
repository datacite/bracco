import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | staff_admin | repository', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting repository AWI', async function(assert) {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    await visit('/repositories/tib.awi');

    assert.equal(currentURL(), '/repositories/tib.awi');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('li.nav-link.active a').hasText('Info');
  });

  test('visiting repository AWI settings', async function(assert) {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    await visit('/repositories/tib.awi/settings');

    assert.equal(currentURL(), '/repositories/tib.awi/settings');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('li.nav-link.active a').hasText('Settings');
    assert.dom('button#edit-repository').includesText('Update Repository');
    assert.dom('button#delete-repository').includesText('Delete');
  });

  // test('visiting repository AWI prefixes', async function(assert) {
  //   await authenticateSession({
  //     uid: 'admin',
  //     name: 'Admin',
  //     role_id: 'staff_admin'
  //   });
  //   await visit('/repositories/tib.awi/prefixes');

  //   assert.equal(currentURL(), '/repositories/tib.awi/prefixes');
  //   assert.dom('h2.work').hasText('Alfred Wegener Institute');
  //   assert.dom('li.nav-link.active a').hasText('Prefixes');
  // });

  test('visiting repository AWI dois', async function(assert) {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    await visit('/repositories/tib.awi/dois');

    assert.equal(currentURL(), '/repositories/tib.awi/dois');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    
    // assert.dom('h3.work').doesNotExist();
    assert.dom('a#new-doi').exists();
    assert.dom('a#upload-doi').exists();
    // assert.dom('a#transfer-dois').includesText('Transfer DOIs');
  });
});
