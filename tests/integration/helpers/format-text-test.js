import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | format-text', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('text', '<p>A <strong>paragraph with words</strong>.</p>');

    await render(hbs`{{format-text text}}`);

    assert.dom('strong').hasText('paragraph with words');
  });

  test('it removes tags not whitelisted', async function (assert) {
    this.set(
      'text',
      '<p>A <strong>paragraph with words</strong> is a wonderful thing.</p>'
    );

    await render(hbs`{{format-text text}}`);

    assert.dom('p').doesNotExist();
  });
});
