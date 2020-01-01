import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | model validation errors', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('doi'));

    // Template block usage:
    await render(hbs`
      {{#model-validation-errors model=model}}

      {{/model-validation-errors}}
    `);

    assert.dom('*').hasText('');
  });
});
