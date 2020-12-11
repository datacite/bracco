import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
// import { selectChoose } from 'ember-power-select/test-support';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi alternate-identifier', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('alternateIdentifier'));
    await render(hbs`
      <DoiAlternateIdentifier @model={{model}} @fragment={{affiliation}} @index={{0}} />
    `);

    assert.dom(this.element).hasText('Alternate Identifier Type');
  });
});
