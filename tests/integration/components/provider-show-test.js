import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | provider-show', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('repository'));

    // Template block usage:
    await render(hbs`
      {{#provider-show model=model link="repositories.index"}}

      {{/provider-show}}
    `);

    assert.dom('*').hasText('Organization Information Member ID Member Type Tax Status Organization Name Australian Data Archive System Email ada@anu.edu.au Service Contact Information Password has not been set Billing Information has not been provided');
  });
});
