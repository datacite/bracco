import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | doi types', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      {{#doi-types}}
        template block text
      {{/doi-types}}
    `);

    assert
      .dom(this.element)
      .hasText(
        'Resource Type General The general type of the resource. Resource Type'
      );
  });
});
