import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi-name-identifier', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('nameIdentifier'));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiNameIdentifier @model={{model}} @fragment={{fragment}} @form={{form}} @index={{0}} />
      </BsForm>
    `);

    assert
      .dom(this.element)
      .hasText(
        'Uniquely identifies an individual or legal entity, according to various schemas, e.g. ORCID, ROR or ISNI. Use name identifier expressed as URL. The Given Name, Family Name and Name will automatically be filled out for ORCID and ROR identifiers.'
      );
  });
});
