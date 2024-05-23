import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';

module('Integration | Component | provider-info', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{provider-info}}`);

    let currentYear = new Date().getFullYear();
    let startDate = (currentYear - 10).toString();
    let endDate = currentYear.toString();

    assert
      .dom(this.element)
      .hasText(
        `Role: Repositories by year 0 ${
          startDate + endDate
        } DOIs by year 0 in ${currentYear} ${startDate + endDate}`
      );
  });
});
