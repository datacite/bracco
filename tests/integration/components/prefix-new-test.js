import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | prefix new', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Template block usage:
    await render(hbs`
      <PrefixNew>
        template block text
      </PrefixNew>
    `);

    assert
      .dom('*')
      .hasText(
        'From First prefix in range of new prefixes provided by CNRI. To Last prefix in range of new prefixes provided by CNRI. Add Prefixes Cancel'
      );
  });
});
