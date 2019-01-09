import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | client transfer', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('client'));

    await render(hbs`{{client-transfer model=model}}`);

    assert.dom('*').hasText('Transfer DOIs Client Transfer all DOIs to this client. It can take up to one hour for the transfer to complete. Transfer DOIs Cancel');

    // Template block usage:
    await render(hbs`
      {{#client-transfer model=model}}
        
      {{/client-transfer}}
    `);

    assert.dom('*').hasText('Transfer DOIs Client Transfer all DOIs to this client. It can take up to one hour for the transfer to complete. Transfer DOIs Cancel');
  });
});
