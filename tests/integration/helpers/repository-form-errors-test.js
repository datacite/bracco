import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | repository-form-errors', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('model', make('repository'));

    await render(hbs`{{repository-form-errors model}}`);

    assert.dom(this.element).hasText('symbol, confirmSymbol');
  });
});
