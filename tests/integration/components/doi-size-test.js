import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi-size', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiSize @model={{model}} @fragment="5kb" @form={{form}} @index={{0}}/>
      </BsForm>
    `);

    assert.dom('[data-test-size]').hasValue('5kb');
  });
});
