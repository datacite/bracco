import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';

module('Integration | Component | application header', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{application-header}}`);

    assert.dom('*').hasText('About Support Sign in');
    assert
      .dom('.navbar-toggle')
      .hasAttribute('aria-label', 'Toggle navigation menu');
    assert
      .dom('.navbar-header a.navbar-brand')
      .hasAttribute('aria-label', 'DataCite Fabrica home');
    assert.dom('.navbar-toggle .navbar-toggler-icon').hasAttribute('aria-hidden', 'true');
  });
});
