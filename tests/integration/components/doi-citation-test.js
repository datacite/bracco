import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi-citation', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    await render(hbs`
      <DoiCitation @model={{model}} />
    `);

    assert
      .dom(this.element)
      .hasText('APA Harvard MLA Vancouver Chicago IEEE Citation');
  });
});
