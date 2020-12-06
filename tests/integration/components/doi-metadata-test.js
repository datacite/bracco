import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | doi-metadata', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      {{#doi-metadata}}

      {{/doi-metadata}}
  `);

    assert.dom(this.element).hasText('');
  });
});
