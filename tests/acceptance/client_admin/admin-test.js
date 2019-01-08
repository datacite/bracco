import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | client_admin | admin', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting homepage', async function(assert) {
    // await authenticateSession();
    await visit('/');
    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite DOI Fabrica');
  });

  // the following pages require authentication. Redirects to homepage otherwise
  test('visiting settings', async function(assert) {
    await authenticateSession({
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi'
    });
    await visit('/settings');
    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite DOI Fabrica');
  });

  test('visiting providers', async function(assert) {
    await authenticateSession({
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi'
    });
    await visit('/providers');
    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite DOI Fabrica');
  });

  test('visiting clients', async function(assert) {
    await authenticateSession({
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi'
    });
    await visit('/clients');
    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite DOI Fabrica');
  });

  test('visiting prefixes', async function(assert) {
    await authenticateSession({
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi'
    });
    await visit('/prefixes');
    assert.equal(currentURL(), '/');
    assert.dom('div.motto h1').hasText('DataCite DOI Fabrica');
  });
});
