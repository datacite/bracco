import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi metrics badge', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders no metrics', async function(assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-metrics-badge doi="10.222/sfdsew"}}`);

    assert.dom('p').hasText('  No citations were reported. No usage information was reported.');
  });
});
