import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi transfer', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-transfer model=this.model}}`);

    assert
      .dom('*')
      .hasText(
        'Transfer DOI Repository Australian Data Archive Transfer the DOI to this repository. Transfer DOI Cancel'
      );
  });
});
