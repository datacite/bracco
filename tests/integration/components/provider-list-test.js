import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | provider-list', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    // Template block usage:
    await render(hbs`
      {{#provider-list model=this.model link="repositories.index"}}

      {{/provider-list}}
    `);

    assert.dom('*').hasText('No members found.');
  });
});
