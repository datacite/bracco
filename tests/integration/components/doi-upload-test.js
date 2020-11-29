import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi upload', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Template block usage:
    await render(hbs`
      {{#doi-upload}}
        template block text
      {{/doi-upload}}
    `);

    assert
      .dom('*')
      .hasText('Metadata Metadata that describe the resource. Upload File');
  });
});
