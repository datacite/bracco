import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import {
  selectChoose
  // clickTrigger
} from 'ember-power-select/test-support/helpers';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi description', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);
  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('description'));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiDescription @model={{model}} @fragment={{fragment}} @form={{form}} @index={{0}}/>
      </BsForm>
    `);

    assert
      .dom(this.element)
      .hasText(
        'All additional information that does not fit in any of the other categories. Description Type Abstract Language Select Language'
      );
  });

  test('select type and language values', async function (assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('description'));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiDescription @model={{model}} @fragment={{fragment}} @form={{form}} @index={{0}}/>
      </BsForm>
    `);

    await fillIn(
      '.description-field',
      'Abhinandan: Crowds gather for Indian pilots release'
    );

    // await clickTrigger('.description-types');
    await selectChoose('.description-types', 'Methods');

    // await clickTrigger('.description-langs');
    await selectChoose('.description-langs', 'Arabic');

    assert
      .dom('.description-field')
      .hasText('Abhinandan: Crowds gather for Indian pilots release');
    assert.dom('.description-types').hasText('Methods');
    assert.dom('.description-langs').hasText('Arabic');
  });
});
