import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render, fillIn, click } from '@ember/test-helpers';

module('Integration | Component | doi-funding-references', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiFundingReferences @model={{model}} @form={{form}} />
      </BsForm>
    `);

    assert
      .dom(this.element)
      .hasText(
        'Funding References Information about financial support (funding) for the resource being registered. Add funding reference'
      );
  });

  test('add multiple values', async function (assert) {
    this.set('model', make('doi', { fundingReferences: [] }));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiFormats @model={{model}} @form={{form}} />
      </BsForm>
    `);

    await click('[data-test-add-funding-reference]');
    await click('[data-test-add-funding-reference]');
    let fundingReferences = this.element.querySelectorAll(
      '[data-test-award-number]'
    );

    await fillIn(fundingReferences[0], '234432');
    await fillIn(fundingReferences[1], '1890');

    assert.dom(fundingReferences[0]).hasValue('234432');
    assert.dom(fundingReferences[1]).hasValue('1890');
  });
});
