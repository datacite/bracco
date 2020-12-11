import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | format-numbers', function (hooks) {
  setupRenderingTest(hooks);

  test('below 1K', async function (assert) {
    this.set('inputValue', 764);

    await render(hbs`{{format-numbers inputValue}}`);

    assert.dom(this.element).hasText('764');
  });

  test('above 1K', async function (assert) {
    this.set('inputValue', 13764);

    await render(hbs`{{format-numbers inputValue}}`);

    assert.dom(this.element).hasText('13.8K');
  });

  test('above 1M', async function (assert) {
    this.set('inputValue', 13732764);

    await render(hbs`{{format-numbers inputValue}}`);

    assert.dom(this.element).hasText('13.7M');
  });

  test('above 1G', async function (assert) {
    this.set('inputValue', 14143732764);

    await render(hbs`{{format-numbers inputValue}}`);

    assert.dom(this.element).hasText('14.1B');
  });

  test('above 1T', async function (assert) {
    this.set('inputValue', 14661143732764);

    await render(hbs`{{format-numbers inputValue}}`);

    assert.dom(this.element).hasText('14.7T');
  });

  test('missing', async function (assert) {
    this.set('inputValue', null);

    await render(hbs`{{format-numbers inputValue}}`);

    assert.dom(this.element).hasText('0');
  });
});
