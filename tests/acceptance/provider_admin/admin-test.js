import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | provider_admin | admin', function(hooks) {
  setupApplicationTest(hooks);

  test('is logged in', async function(assert) {
    await authenticateSession({
      uid: 'tib',
      name: 'Technische Informationsbibliothek',
      role_id: 'provider_admin',
      provider_id: 'tib'
    });
    await visit('/');

    assert.dom('a#account_menu_link').hasText('TIB');
  });

  test('visiting homepage', async function(assert) {
    await authenticateSession({
      uid: 'tib',
      name: 'Technische Informationsbibliothek',
      role_id: 'provider_admin',
      provider_id: 'tib'
    });
    await visit('/');

    assert.equal(currentURL(), '/providers/tib');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
  });

  // the following pages require authentication. Redirects to provider homepage otherwise
  test('visiting settings', async function(assert) {
    await authenticateSession({
      uid: 'tib',
      name: 'Technische Informationsbibliothek',
      role_id: 'provider_admin',
      provider_id: 'tib'
    });
    await visit('/settings');

    assert.equal(currentURL(), '/providers/tib');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
  });

  test('visiting providers', async function(assert) {
    await authenticateSession({
      uid: 'tib',
      name: 'Technische Informationsbibliothek',
      role_id: 'provider_admin',
      provider_id: 'tib'
    });
    await visit('/providers');

    assert.equal(currentURL(), '/providers/tib');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
  });

  test('visiting clients', async function(assert) {
    await authenticateSession({
      uid: 'tib',
      name: 'Technische Informationsbibliothek',
      role_id: 'provider_admin',
      provider_id: 'tib'
    });
    await visit('/clients');

    assert.equal(currentURL(), '/providers/tib');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
  });

  test('visiting prefixes', async function(assert) {
    await authenticateSession({
      uid: 'tib',
      name: 'Technische Informationsbibliothek',
      role_id: 'provider_admin',
      provider_id: 'tib'
    });
    await visit('/prefixes');

    assert.equal(currentURL(), '/providers/tib');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
  });

  test('visiting prefix 10.5072', async function(assert) {
    await authenticateSession({
      uid: 'tib',
      name: 'Technische Informationsbibliothek',
      role_id: 'provider_admin',
      provider_id: 'tib'
    });
    await visit('/prefixes/10.5072');

    assert.equal(currentURL(), '/prefixes/10.5072');
    assert.dom('div.alert-warning').includesText('The page was not found.');
  });

  test('visiting dois', async function(assert) {
    await authenticateSession({
      uid: 'tib',
      name: 'Technische Informationsbibliothek',
      role_id: 'provider_admin',
      provider_id: 'tib'
    });
    await visit('/dois');

    assert.equal(currentURL(), '/providers/tib');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
  });
});
