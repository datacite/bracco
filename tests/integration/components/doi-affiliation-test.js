import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';

module('Integration | Component | doi-affiliation', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    this.set('creator', make('creator'));
    this.set('affiliation', make('affiliation'));

    await render(hbs`
      <DoiAffiliation @model={{model}} @creator={{creator}} @fragment={{affiliation}} @index={{0}} />
    `);

    assert.dom(this.element).hasText('');
  });
});
