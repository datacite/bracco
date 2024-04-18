import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ENV from 'bracco/config/environment';

module('helper:content-negotiation-url', function (hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function (assert) {
    this.set('inputValue', '1234');

    await render(hbs`{{content-negotiation-url this.inputValue}}`);

    assert
      .dom()
      .hasText(ENV.API_URL + '/dois/application/vnd.schemaorg.ld+json/1234');
  });
});
