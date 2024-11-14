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
    await render(
      hbs`{{doi-related-identifier model=this.model fragment=this.fragment index=0}}`
    );

    assert
      .dom('*')
      .hasText(
        'Must be a globally unique identifier. Visit the DataCite Metadata Schema documentation for the list of supported unique identifiers. Related Identifier Type Relation Type Resource Type General Related Metadata Scheme The name of the scheme. Related Metadata Scheme URI The URI of the relatedMetadataScheme. For example: http://www.ddialliance.org/Specification/DDILifecycle/3.1/XMLSchema/instance.xsd for DDI-L schema. Related Metadata Scheme Type The type of the relatedMetadataScheme, linked with the schemeURI.'
      );
  });
});
