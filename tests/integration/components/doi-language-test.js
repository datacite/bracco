import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';


import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi language', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('doi'));
    console.log(this.set('model', make('doi')));
    await render(hbs`{{doi-language model=model.doi}}`);

    assert.dom('*').hasText('Language (optional)');
  });
});
