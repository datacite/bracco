import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import ENV from 'bracco/config/environment';

module('helper:search-url', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{search-url}}`);

    assert.dom(this.element).hasText(ENV.SEARCH_URL);
  });
});
