import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
// import { selectChoose } from 'ember-power-select/test-support';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi related-identifier', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('relatedIdentifier'));
    await render(hbs`{{doi-related-identifier model=model fragment=fragment index=0}}`);

    assert.dom('*').hasText('Identifiers of related resources. These must be globally unique identifiers. Visit our support website for the list of supported unique identifiers. Related Identifier Type Relation Type');
  });
});
