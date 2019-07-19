import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | url check', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('state', 'registered');

    // Template block usage:
    await render(hbs`
      {{#url-check}}

      {{/url-check}}
  ` );

    assert.dom('*').hasText('');
  });
});