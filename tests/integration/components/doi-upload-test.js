import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | doi upload', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Template block usage:
    await render(hbs`
      <DoiUpload>
        template block text
      </DoiUpload>
    `);

    assert
      .dom('*')
      .hasText('Metadata Metadata that describe the resource. Upload File');
  });
});
