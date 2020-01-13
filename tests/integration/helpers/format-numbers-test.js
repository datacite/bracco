// import { moduleForComponent, test } from 'ember-qunit';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:format-numbers', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('inputValue', '12345');

    await render(hbs`{{format-numbers inputValue}}`);

    assert.dom('*').hasText('12.3K');
  });
});
