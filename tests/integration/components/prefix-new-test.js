import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | prefix new', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('prefix'));
    await render(hbs`
      <PrefixNew @model={{this.model}} />
    `);

    assert
      .dom(this.element)
      .hasText(
        'From First prefix in range of new prefixes provided by CNRI. To Last prefix in range of new prefixes provided by CNRI. Add Prefixes Cancel'
      );
  });
});
