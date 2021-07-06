import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | index-info', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{index-info}}`);

    assert
      .dom(this.element)
      .hasText(
        'Members by year 0 20102020 Repositories by year 0 20102020 DOIs by year 0 in 2021 20102020'
      );
  });
});
