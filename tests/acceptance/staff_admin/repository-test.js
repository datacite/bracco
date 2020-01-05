import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | staff_admin | repository', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin',
    });
  });

  test('visiting repository AWI', async function(assert) {
    await visit('/repositories/tib.awi');

    assert.equal(currentURL(), '/repositories/tib.awi');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('li a.nav-link.active').hasText('Info');

    // repository charts are displayed
    assert.dom('#chart-doi-title').includesText('DOIs by year');
  });

  test('visiting repository AWI settings', async function(assert) {
    await visit('/repositories/tib.awi/settings');

    assert.equal(currentURL(), '/repositories/tib.awi/settings');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('li a.nav-link.active').hasText('Settings');
    assert.dom('button#edit-repository').includesText('Update Repository');
    assert.dom('button#delete-repository').includesText('Delete');
  });

  test('visiting repository RPH prefixes', async function(assert) {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin',
    });
    await visit('/repositories/datacite.rph/prefixes');

    assert.equal(currentURL(), '/repositories/datacite.rph/prefixes');
    assert.dom('h2.work').hasText('DataCite Test RPH');
    assert.dom('li a.nav-link.active').hasText('Prefixes');
    assert.dom('div#search').exists();

    // search result title bar not shown when only one prefix
    assert.dom('[data-test-results]').doesNotExist();

    // at least one prefix exists
    assert.dom('[data-test-prefix]').exists();
    assert.dom('div.panel.facets').exists();

    // TODO admin can assign new prefix
    // assert.dom('a#assign-prefix').includesText('Assign Prefix');
  });

  test('visiting repository RPH dois', async function(assert) {
    await visit('/repositories/datacite.rph/dois');

    assert.equal(currentURL(), '/repositories/datacite.rph/dois');
    assert.dom('h2.work').hasText('DataCite Test RPH');
    assert.dom('li a.nav-link.active').hasText('DOIs');
    assert.dom('div#search').exists();

    // at least one doi exists
    assert.dom('[data-test-results]').includesText('DOIs');
    assert.dom('[data-test-doi]').exists();
    assert.dom('div.panel.facets').exists();

    // admin can add dois
    assert.dom('a#new-doi').exists();
    assert.dom('a#upload-doi').exists();
    assert.dom('a#transfer-dois').includesText('Transfer');
  });
});
