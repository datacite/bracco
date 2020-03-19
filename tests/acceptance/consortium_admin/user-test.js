import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  click,
  fillIn,
} from '@ember/test-helpers';
import ENV from 'bracco/config/environment';

module('Acceptance | consortium_admin | user', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await visit('/sign-in');
    await fillIn('input#account-field', 'DC');
    await fillIn('input#password-field', ENV.CONSORTIUM_ADMIN_PASSWORD);
    await click('button[type=submit]');
  });

  test('visiting users', async function(assert) {
    await visit('/users');

    assert.equal(currentURL(), '/providers/dc/organizations');
    assert.dom('h2.work').hasText('DataCite Consortium');
  });

  test('visiting specific user', async function(assert) {
    await visit('/users/0000-0003-1419-2405');

    assert.equal(currentURL(), '/users/0000-0003-1419-2405');
    assert.dom('h2.work').hasText('Martin Fenner');
  });
});
