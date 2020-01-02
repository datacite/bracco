import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | organization_admin | repository', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'datacite',
      name: 'DataCite',
      role_id: 'provider_admin',
      provider_id: 'datacite',
    });
  });

  test('visiting repository DataCite Journal', async function(assert) {
    await visit('/repositories/datacite.datacite');

    assert.equal(currentURL(), '/repositories/datacite.datacite');
    assert.dom('h2.work').hasText('DataCite Repository');
    assert.dom('li a.nav-link.active').hasText('Info');
  });

  test('visiting repository DataCite Journal settings', async function(assert) {
    await visit('/repositories/datacite.datacite/settings');

    assert.equal(currentURL(), '/repositories/datacite.datacite/settings');
    assert.dom('h2.work').hasText('DataCite Repository');
    assert.dom('li a.nav-link.active').hasText('Settings');
    assert.dom('button#edit-repository').includesText('Update Repository');
    assert.dom('button#delete-repository').includesText('Delete');
  });

  // test('visiting repository DataCite Journal prefixes', async function(assert) {
  //   await visit('/repositories/datacite.datacite/prefixes');

  //   assert.equal(currentURL(), '/repositories/datacite.datacite/prefixes');
  //   assert.dom('h2.work').hasText('DataCite Repository');
  //   assert.dom('li a.nav-link.active').hasText('Prefixes');
  // });

  test('visiting repository DataCite Journal dois', async function(assert) {
    await visit('/repositories/datacite.datacite/dois');

    assert.equal(currentURL(), '/repositories/datacite.datacite/dois');
    assert.dom('h2.work').hasText('DataCite Repository');
    assert.dom('li a.nav-link.active').hasText('DOIs');

    assert.dom('h3.work').exists();
    assert.dom('a#new-doi').doesNotExist();
    assert.dom('a#upload-doi').doesNotExist();
    assert.dom('a#transfer-dois').includesText('Transfer');
  });

  test('fail creating a new DOI for repository', async function(assert) {
    await visit('/repositories/datacite.datacite/dois');

    assert.dom('new-doi').doesNotExist();
  });
});
