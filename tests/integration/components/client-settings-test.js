import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | client-settings', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('client'));

    await render(hbs`{{client-settings}}`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      {{#client-settings}}
        
      {{/client-settings}}
    `);

    assert.dom('*').hasText('');
  });
});
