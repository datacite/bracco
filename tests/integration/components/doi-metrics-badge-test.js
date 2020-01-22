import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi metrics badge', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders citations', async function(assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-metrics-badge model=model}}`);

    assert.dom('i').hasText('  123 Citations');
  });

  test('it renders 0 citations', async function(assert) {
    this.set('model', make('doi', {citations: 0}));
    await render(hbs`{{doi-metrics-badge model=model}}`);

    assert.dom('i').hasText('  No citations were reported.');
  });
});


