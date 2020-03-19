import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  fillIn,
  click,
} from '@ember/test-helpers';
import ENV from 'bracco/config/environment';

module('Acceptance | staff_admin | user', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await visit('/sign-in');
    await fillIn('input#account-field', 'ADMIN');
    await fillIn('input#password-field', ENV.STAFF_ADMIN_PASSWORD);
    await click('button[type=submit]');
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
