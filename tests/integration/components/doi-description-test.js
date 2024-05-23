import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
// import { selectChoose } from 'ember-power-select/test-support';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi description', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('description'));
    await render(
      hbs`{{doi-description model=this.model fragment=this.fragment index=0}}`
    );

    assert
      .dom('*')
      .hasText(
        'All additional information that does not fit in any of the other categories. Description Type Language'
      );
  });

  // test('select type and language values', async function(assert) {
  //   this.set('model', make('doi'));
  //   this.set('fragment', make('description'));
  //   await render(hbs`{{doi-description model=model fragment=fragment index=0}}`);

  //   await selectChoose('.description-langs', '.ember-power-select-option', 'Akan');
  //   await selectChoose('.description-types', '.ember-power-select-option', 'Methods');

  //   assert.dom('.description-types').hasText('Methods');
  //   assert.dom('.description-langs').hasText('Akan');
  // });
});
