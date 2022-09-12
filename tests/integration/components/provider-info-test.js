import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | provider-info', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{provider-info}}`);

    let currentYear = new Date().getFullYear();
    let startDate = (currentYear - 10).toString();
    let endDate = currentYear.toString();

    assert
      .dom(this.element)
      .hasText(
        `Repositories by year 0 20122022 DOIs by year 0 in ${currentYear} ${startDate+endDate}`
      );
  });
});
