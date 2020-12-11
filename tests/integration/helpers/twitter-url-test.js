import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | twitter-url', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('inputValue', '@datacite');

    await render(hbs`{{twitter-url inputValue}}`);

    assert.dom(this.element).hasText('https://twitter.com/datacite');
  });

  test('it renders null', async function (assert) {
    this.set('inputValue', null);

    await render(hbs`{{twitter-url inputValue}}`);

    assert.dom(this.element).hasText('');
  });
});
