import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi summary', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-summary model=model}}`);

    assert.dom('*').hasText('10.25499/jjva5eho424vep7dz2pson7qz Dataset Substance published 2017 via Royal Society of Chemistry');
  });
});
