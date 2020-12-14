import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render, fillIn, click } from '@ember/test-helpers';

module('Integration | Component | doi-related-identifiers', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set(
      'model',
      make('doi', {
        relatedIdentifiers: [
          {
            relatedIdentifier: '10.80225/rph240519sdfd',
            relatedIdentifierType: 'DOI',
            relationType: 'IsCitedBy'
          }
        ]
      })
    );
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiRelatedIdentifiers @model={{model}} @form={{form}} />
      </BsForm>
    `);

    await click('[data-test-toggle-related-identifiers]');

    assert
      .dom('input.related-identifier-field')
      .hasValue('10.80225/rph240519sdfd');
    assert
      .dom('[data-test-add-related-identifier]')
      .hasText('Add another related identifier');
  });

  test('no relatedIdentifiers', async function (assert) {
    this.set('model', make('doi', { relatedIdentifiers: null }));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiRelatedIdentifiers @model={{model}} @form={{form}} />
      </BsForm>
    `);

    assert.dom('[data-test-toggle-related-identifiers]').doesNotExist();
    assert
      .dom('[data-test-add-related-identifier]')
      .hasText('Add related identifier');
  });

  test('add relatedIdentifier', async function (assert) {
    this.set('model', make('doi', { relatedIdentifiers: [] }));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiRelatedIdentifiers @model={{model}} @form={{form}} />
      </BsForm>
    `);
    await click('[data-test-add-related-identifier]');
    await fillIn('.related-identifier-field', '10.80225/rph240519');

    assert.dom('.related-identifier-field').hasValue('10.80225/rph240519');
    assert
      .dom('[data-test-toggle-related-identifiers]')
      .hasText('Hide 1 format');
    assert
      .dom('[data-test-add-related-identifier]')
      .hasText('Add another related identifier');
  });
});
