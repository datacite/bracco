import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('helper:is-equal', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders true', async function (assert) {
    this.set('inputValue', ['1234', '1234']);

    await render(hbs`{{is-equal inputValue}}`);

    assert.dom(this.element).hasAnyText();
  });
});
