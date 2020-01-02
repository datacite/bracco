import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | consortium_admin | repository', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'dc',
      name: 'DataCite Consortium',
      role_id: 'provider_admin',
      provider_id: 'dc',
    });
  });

  test('visiting repository DataCite RPH', async function(assert) {
    await visit('/repositories/datacite.rph');

    assert.equal(currentURL(), '/repositories/datacite.rph');
    assert.dom('h2.work').hasText('DataCite Test RPH');
    assert.dom('li a.nav-link.active').hasText('Info');
  });

  test('visiting repository DataCite RPH settings', async function(assert) {
    await visit('/repositories/datacite.rph/settings');

    assert.equal(currentURL(), '/repositories/datacite.rph/settings');
    assert.dom('h2.work').hasText('DataCite Test RPH');
    assert.dom('li a.nav-link.active').hasText('Settings');

    // consortium members can't edit or delete repositories
    assert.dom('button#edit-repository').doesNotExist();
    assert.dom('button#delete-repository').doesNotExist();
  });

  // test('visiting repository DataCite RPH prefixes', async function(assert) {
  //   await visit('/repositories/datacite.rph/prefixes');

  //   assert.equal(currentURL(), '/repositories/datacite.rph/prefixes');
  //   assert.dom('h2.work').hasText('DataCite Test RPH');
  //   assert.dom('li a.nav-link.active').hasText('Prefixes');
  // });

  test('visiting repository DataCite RPH dois', async function(assert) {
    await visit('/repositories/datacite.rph/dois');

    assert.equal(currentURL(), '/repositories/datacite.rph/dois');
    assert.dom('h2.work').hasText('DataCite Test RPH');
    assert.dom('li a.nav-link.active').hasText('DOIs');

    assert.dom('h3.work').exists();
    assert.dom('a#new-doi').doesNotExist();
    assert.dom('a#upload-doi').doesNotExist();
    assert.dom('a#transfer-dois').includesText('Transfer');
  });

  test('fail creating a new DOI for repository', async function(assert) {
    await visit('/repositories/datacite.rph/dois');

    assert.dom('new-doi').doesNotExist();
    assert.dom('a#upload-doi').doesNotExist();
  });
});
