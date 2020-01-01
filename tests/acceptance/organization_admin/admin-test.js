import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | organization_admin | admin', function(hooks) {
  setupApplicationTest(hooks);

  test('is logged in', async function(assert) {
    await authenticateSession({
      uid: 'datacite',
      name: 'DataCite',
      role_id: 'provider_admin',
      provider_id: 'datacite',
    });
    await visit('/');

    assert.dom('a#account_menu_link').hasText('DATACITE');
  });

  test('visiting homepage', async function(assert) {
    await authenticateSession({
      uid: 'datacite',
      name: 'DataCite',
      role_id: 'provider_admin',
      provider_id: 'datacite',
    });
    await visit('/');

    assert.equal(currentURL(), '/providers/datacite');
    assert.dom('h2.work').hasText('DataCite');
  });

  // the following pages require authentication. Redirects to provider homepage otherwise
  test('visiting settings', async function(assert) {
    await authenticateSession({
      uid: 'datacite',
      name: 'DataCite',
      role_id: 'provider_admin',
      provider_id: 'datacite',
    });
    await visit('/settings');

    assert.equal(currentURL(), '/providers/datacite');
    assert.dom('h2.work').hasText('DataCite');
  });

  test('visiting providers', async function(assert) {
    await authenticateSession({
      uid: 'datacite',
      name: 'DataCite',
      role_id: 'provider_admin',
      provider_id: 'datacite',
    });
    await visit('/providers');

    assert.equal(currentURL(), '/providers/datacite');
    assert.dom('h2.work').hasText('DataCite');
  });

  test('visiting repositories', async function(assert) {
    await authenticateSession({
      uid: 'datacite',
      name: 'DataCite',
      role_id: 'provider_admin',
      provider_id: 'datacite',
    });
    await visit('/repositories');

    assert.equal(currentURL(), '/providers/datacite');
    assert.dom('h2.work').hasText('DataCite');
  });

  test('visiting prefixes', async function(assert) {
    await authenticateSession({
      uid: 'datacite',
      name: 'DataCite',
      role_id: 'provider_admin',
      provider_id: 'datacite',
    });
    await visit('/prefixes');

    assert.equal(currentURL(), '/providers/datacite');
    assert.dom('h2.work').hasText('DataCite');
  });

  test('visiting prefix 10.5038', async function(assert) {
    await authenticateSession({
      uid: 'datacite',
      name: 'DataCite',
      role_id: 'provider_admin',
      provider_id: 'datacite',
    });
    await visit('/prefixes/10.5038');

    assert.equal(currentURL(), '/prefixes/10.5038');
    assert.dom('div.alert-warning').includesText('The page was not found.');
  });

  test('visiting dois', async function(assert) {
    await authenticateSession({
      uid: 'datacite',
      name: 'DataCite',
      role_id: 'provider_admin',
      provider_id: 'datacite',
    });
    await visit('/dois');

    assert.equal(currentURL(), '/providers/datacite');
    assert.dom('h2.work').hasText('DataCite');
  });

  test('visiting users', async function(assert) {
    await authenticateSession({
      uid: 'datacite',
      name: 'DataCite',
      role_id: 'provider_admin',
      provider_id: 'datacite',
    });

    await visit('/users');

    assert.equal(currentURL(), '/providers/datacite');
    assert.dom('h2.work').hasText('DataCite');
  });

  test('visiting specific user', async function(assert) {
    await authenticateSession({
      uid: 'tib',
      name: 'Technische Informationsbibliothek',
      role_id: 'provider_admin',
      provider_id: 'tib',
    });

    await visit('/users/0000-0003-1419-2405');

    assert.equal(currentURL(), '/users/0000-0003-1419-2405');
    assert.dom('h2.work').hasText('Martin Fenner');
  });
});
