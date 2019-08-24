import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | prefix list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Template block usage:
    await render(hbs`
      {{#prefix-list}}

      {{/prefix-list}}
    `);

    assert.dom('*').hasText('');
  });
});
