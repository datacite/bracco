import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { selectChoose } from 'ember-power-select/test-support';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi description', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('description'));
    await render(hbs`{{doi-description model=model fragment=fragment index=0}}`);

    assert.dom('*').hasText('One or more names or titles by which the resource is known. Description Type Language (optional)');
  });

  test('select type and language values', async function(assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('description'));
    await render(hbs`{{doi-description model=model fragment=fragment index=0}}`);

    await selectChoose(".description-langs", '.ember-power-select-option', "Akan");
    await selectChoose(".description-types",'.ember-power-select-option', "Methods");

    assert.dom(".description-types div").hasValue("Methods");
    assert.dom(".description-langs div").hasValue("Akan");
  });
});