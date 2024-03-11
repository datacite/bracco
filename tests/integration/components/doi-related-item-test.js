import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi related-item', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('relatedItem'));
    await render(
      hbs`{{doi-related-item model=model fragment=fragment index=0}}`
    );

    assert.dom('*').includesText('One title by which the resource is known.');
    assert.dom('*').includesText('Issue number or name of the related item.');
    assert.dom('*').includesText('Related Item Identifier');
    assert.dom('*').includesText("Related Item's Creators Show 1 creator");
    assert
      .dom('*')
      .includesText("Related Item's Contributors Show 1 contributor");
  });
});
