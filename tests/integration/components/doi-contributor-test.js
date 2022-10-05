import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi contributor', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('doi'));
    this.set('contributor', make('contributor'));

    await render(hbs`{{doi-contributor model=model fragment=contributor index=0}}`);

    assert.dom('*').hasText('Contributor Type Add another name identifier Person Organization Unknown Given Name Family Name Name (from Given Name and Family Name)');
  });
});
