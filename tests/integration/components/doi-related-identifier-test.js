import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
// import { selectChoose } from 'ember-power-select/test-support';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi related-identifier', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('relatedIdentifier'));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiRelatedIdentifier @model={{model}} @fragment={{fragment}} @form={{form}} @index={{0}} />
      </BsForm>
    `);

    assert
      .dom(this.element)
      .hasText(
        'Must be a globally unique identifier. Visit our support website for the list of supported unique identifiers. Related Identifier Type The type of the Related Identifier. Relation Type The type of the Relation. Resource Type General The general type of the related resource. Related Metadata Scheme The name of the scheme. Related Metadata Scheme URI The URI of the relatedMetadataScheme. For example: http://www.ddialliance.org/Specification/DDILifecycle/3.1/XMLSchema/instance.xsd for DDI-L schema. Related Metadata Scheme Type The type of the relatedMetadataScheme, linked with the schemeURI.'
      );
  });
});
