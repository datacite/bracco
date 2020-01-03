import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
} from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | staff_admin | user', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin',
    });
  });

  test('visiting users', async function(assert) {
    await visit('/users');

    assert.equal(currentURL(), '/users');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('li a.nav-link.active').hasText('Users');
    assert.dom('div#search').exists();

    // at least one user exists
    assert.dom('[data-test-results]').includesText('Users');
    assert.dom('[data-test-user]').exists();

    // no facets for users
    assert.dom('div.panel.facets').doesNotExist();
  });

  test('visiting specific user', async function(assert) {
    await visit('/users/0000-0003-1419-2405');

    assert.equal(currentURL(), '/users/0000-0003-1419-2405');
    assert.dom('h2.work').hasText('Martin Fenner');
  });
});
