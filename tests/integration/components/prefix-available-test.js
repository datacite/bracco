import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | prefix available', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', { repository: make('repository') });

    // Template block usage:
    await render(hbs`
      {{#prefix-available model=model}}
        
      {{/prefix-available}}
    `);

    assert.dom('*').hasText('');
  });
});