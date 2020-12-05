import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import ENV from 'bracco/config/environment';

module('helper:cdn-url', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{cdn-url}}`);

    assert.equal(this.element.textContent.trim(), ENV.CDN_URL);
  });
});
