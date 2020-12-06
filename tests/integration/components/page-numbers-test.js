import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | page-numbers', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      {{#page-numbers}}
        template block text
      {{/page-numbers}}
    `);

    assert.dom(this.element).hasText('« 1 »');
  });
});
