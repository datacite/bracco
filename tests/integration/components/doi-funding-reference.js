import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
// import { selectChoose } from 'ember-power-select/test-support';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi funding-reference', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('fundingReference'));
    await render(hbs`{{doi-funding-reference model=model fragment=fragment index=0}}`);

    assert.dom('*').hasText('Identifiers of related resources. These must be globally unique identifiers, such as: ARK, arXiv, bibcode, DOI, EAN13, EISSN, Handle, IGSN, ISBN, ISSN, ISTC, LISSN, LSID, PMID, PURL, UPC, URL, URN, w3id. Related Identifier Type Relation Type');
  });
});