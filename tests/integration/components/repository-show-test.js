import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | repository-show', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('repository'));

    // Template block usage:
    await render(hbs`
      {{#repository-show model=model link="repositories.index"}}
        
      {{/repository-show}}
    `);

    assert.dom('*').hasText('Repository ID System Email ada@anu.edu.au Domains ada.edu.au nesstar.ada.edu.au Password has not been set');
  });
});
