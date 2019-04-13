import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | prefix select', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('client'));

    // Template block usage:
    await render(hbs`
      {{#prefix-select model=model}}
        
      {{/prefix-select}}
    `);

    assert.dom('*').hasText('');
  });
});
