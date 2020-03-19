import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  click,
  fillIn,
} from '@ember/test-helpers';
import ENV from 'bracco/config/environment';

module('Acceptance | consortium_admin | admin', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await visit('/sign-in');
    await fillIn('input#account-field', 'DC');
    await fillIn('input#password-field', ENV.CONSORTIUM_ADMIN_PASSWORD);
    await click('button[type=submit]');
  });

  test('visiting dois', async function(assert) {
    await visit('/dois');

    assert.equal(currentURL(), '/providers/dc/organizations');
    assert.dom('h2.work').hasText('DataCite Consortium');
  });

  test('visiting specific doi', async function(assert) {
    await visit('/dois/10.80225%2Fe605-dg05');

    assert.equal(currentURL(), '/dois/10.80225%2Fe605-dg05');
    assert.dom('h2.work').hasText('10.80225/e605-dg05');
  });
});
