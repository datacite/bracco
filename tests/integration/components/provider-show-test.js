import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | provider-show', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('client'));

    // Template block usage:
    await render(hbs`
      {{#provider-show model=model link="clients.index"}}

      {{/provider-show}}
    `);

    assert.dom('*').hasText('Organization Information Provider ID Service Contact Information General Contact Name Dr. Steven McEachern General Contact Email ada@anu.edu.au Password has not been set Billing Information has not been provided');
  });
});
