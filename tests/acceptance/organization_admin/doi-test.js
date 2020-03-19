import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  click,
  fillIn,
} from '@ember/test-helpers';
import ENV from 'bracco/config/environment';

module('Acceptance | organization_admin | admin', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await visit('/sign-in');
    await fillIn('input#account-field', 'DATACITE');
    await fillIn('input#password-field', ENV.ORGANIZATION_ADMIN_PASSWORD);
    await click('button[type=submit]');
  });

  test('visiting dois', async function(assert) {
    await visit('/dois');

    assert.equal(currentURL(), '/providers/datacite/repositories');
    assert.dom('h2.work').hasText('DataCite');
  });

  test('visiting specific doi', async function(assert) {
    await visit('/dois/10.80225%2Fe605-dg05');

    assert.equal(currentURL(), '/dois/80225%2Fe605-dg05');
    assert.dom('h2.work').hasText('10.80225/e605-dg05');
  });
});
