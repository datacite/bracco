import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  // click,
  // fillIn,
  // pauseTest,
} from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | staff_admin | organization', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin',
    });
  });

  test('visiting provider DC consortium organizations', async function(assert) {
    await visit('/providers/dc/organizations');

    assert.equal(currentURL(), '/providers/dc/organizations');
    assert.dom('h2.work').hasText('DataCite Consortium');
    assert.dom('li a.nav-link.active').hasText('Consortium Organizations');
    assert.dom('div#search').exists();

    // at least one consortium organization exists
    assert.dom('[data-test-results]').includesText('Consortium Organizations');
    assert.dom('[data-test-organization]').exists();
    assert.dom('div.panel.facets').exists();

    // consortium member can add consortium organizations
    assert.dom('a#add-organization').includesText('Add Organization');
  });
});
