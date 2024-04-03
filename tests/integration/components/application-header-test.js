import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupIntl } from 'ember-intl/test-support';

module('Integration | Component | application header', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{application-header}}`);

    assert.dom('*').hasText('Toggle navigation About Support Sign in');
  });
});
