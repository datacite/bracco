import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi-title', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    await render(hbs`
      <BsForm @model={{model}} as |form index|>
        <DoiTitle @model={{model}} @fragment={{model.titles.[index]}} @form={{form}} @index={{index}} />
      </BsForm>
    `);

    assert
      .dom(this.element)
      .hasText('Title Type Select Title Type Language Select Language');
  });
});
