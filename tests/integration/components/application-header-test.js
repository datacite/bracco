import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | application-header', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <ApplicationHeader @sign-in={{true}} />
    `);

    assert
      .dom(this.element)
      .hasText('Toggle navigation DataCite Fabrica Stage Support');
  });
});
