import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | client-show', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('client'));

    // Template block usage:
    await render(hbs`
      {{#client-show model=model link="clients.index"}}
        
      {{/client-show}}
    `);

    assert.dom('*').hasText('Client ID Contact Email ada@anu.edu.au Domains ada.edu.au nesstar.ada.edu.au Password has not been set');
  });
});
