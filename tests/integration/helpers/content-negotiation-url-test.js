import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import ENV from 'bracco/config/environment';

module('helper:content-negotiation-url', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('inputValue', '1234');

    await render(hbs`{{content-negotiation-url inputValue}}`);

    assert.equal(
      this.element.textContent.trim(),
      ENV.API_URL + '/dois/application/vnd.schemaorg.ld+json/1234'
    );
  });
});
