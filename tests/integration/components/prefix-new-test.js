import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | prefix new', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      {{#prefix-new}}
        template block text
      {{/prefix-new}}
    `);

    assert
      .dom(this.element)
      .hasText(
        'From First prefix in range of new prefixes provided by CNRI. To Last prefix in range of new prefixes provided by CNRI. Add Prefixes Cancel'
      );
  });
});
