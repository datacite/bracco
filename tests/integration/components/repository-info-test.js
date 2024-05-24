import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';

module('Integration | Component | repository-info', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<RepositoryInfo />`);

    let currentYear = new Date().getFullYear();
    let startDate = (currentYear - 10).toString();
    let endDate = currentYear.toString();

    assert
      .dom(this.element)
      .hasText(`Role: DOIs by year 0 in ${currentYear} ${startDate + endDate}`);
  });
});
