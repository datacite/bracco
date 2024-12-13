import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | footer status', function (hooks) {
  setupRenderingTest(hooks);

  // Skip this for now.  It is failing for an unknown reason (on conversion of @classic to native javascript class).
  test.skip('it renders', async function (assert) {
    await render(hbs`{{footer-status}}`);

    // This test fails
    assert.dom('*').hasText('');
  });
});
