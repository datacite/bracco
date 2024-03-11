import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ENV from 'bracco/config/environment';

module('helper:site-title', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{site-title}}`);

    assert.dom('*').hasText(ENV.SITE_TITLE);
  });
});
