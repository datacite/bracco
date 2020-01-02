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

    assert.dom('[data-test-doi]').hasText('10.70048/rph240519');
    assert.dom('[data-test-resource-type-general]').hasText('Dataset');
    assert.dom('[data-test-metadata]').hasText('Substance published 2017 via Royal Society of Chemistry');
  });
});
