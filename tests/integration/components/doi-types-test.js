import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi-types', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiTypes @model={{model}} @form={{form}} />
      </BsForm>
    `);

    assert
      .dom(this.element)
      .hasText(
        'Resource Type General The general type of the resource. Dataset If none of the provided values matches, use Other and specify the resource type in the field below. Resource Type A description of the resource, the preferred format is a single term of some detail.'
      );
  });
});
