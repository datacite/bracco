import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | repository-settings', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('repository'));

    await render(hbs`{{repository-settings}}`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      {{#repository-settings}}
        
      {{/repository-settings}}
    `);

    assert.dom('*').hasText('');
  });
});
