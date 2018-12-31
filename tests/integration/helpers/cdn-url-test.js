import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ENV from 'bracco/config/environment';

module('helper:cdn-url', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{cdn-url}}`);

    assert.dom('*').hasText(ENV.CDN_URL);
  });
});
