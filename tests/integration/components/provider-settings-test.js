import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | provider settings', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('repository'));

    // Template block usage:
    await render(hbs`
      {{#provider-settings}}

      {{/provider-settings}}
    `);

    assert.dom('*').hasText('The password reset functionality goes here.');
  });
});
