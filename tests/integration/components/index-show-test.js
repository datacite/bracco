import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | index show', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{index-show}}`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      <IndexShow>
        
      </IndexShow>
    `);

    assert.dom('*').hasText('');
  });
});
