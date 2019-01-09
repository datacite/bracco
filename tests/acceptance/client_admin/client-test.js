import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | client_admin | client', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting client AWI', async function(assert) {
    await authenticateSession({
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi'
    });
    await visit('/clients/tib.awi');

    assert.equal(currentURL(), '/clients/tib.awi');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('a.nav-link.active').hasText('Info');
  });

  test('visiting client AWI settings', async function(assert) {
    await authenticateSession({
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi'
    });
    await visit('/clients/tib.awi/settings');

    assert.equal(currentURL(), '/clients/tib.awi/settings');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('a.nav-link.active').hasText('Settings');
    assert.dom('button#edit-client').includesText('Update Account');
    assert.dom('button#delete-client').doesNotExist();
  });

  test('visiting client AWI prefixes', async function(assert) {
    await authenticateSession({
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi'
    });
    await visit('/clients/tib.awi/prefixes');

    assert.equal(currentURL(), '/clients/tib.awi/prefixes');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('a.nav-link.active').hasText('Prefixes');
  });

  test('visiting client AWI dois', async function(assert) {
    await authenticateSession({
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi'
    });
    await visit('/clients/tib.awi/dois');

    assert.equal(currentURL(), '/clients/tib.awi/dois');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('a.nav-link.active').hasText('DOIs');
    assert.dom('a#new-doi').includesText('Create DOI (Form)');
    assert.dom('a#upload-doi').includesText('Create DOI (File Upload)');
    assert.dom('a#transfer-dois').doesNotExist();
  });
});
