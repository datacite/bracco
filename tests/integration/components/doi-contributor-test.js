import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi contributor', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('doi'));
    this.set('contributor', make('contributor'));

    await render(hbs`{{doi-contributor model=model fragment=contributor index=0}}`);

    assert.dom('*').hasText('Contributor Type Name Identifier Use name identifier expressed as URL. Uniquely identifies an individual or legal entity, according to various schemas, e.g. ORCID, ROR or ISNI. The Given Name, Family Name, and Name will automatically be filled out for ORCID and ROR identifiers. Add another name identifier Person Organization Unknown Given Name Family Name Name (from Given Name and Family Name) Affiliation Affiliation names and identifiers are provided by the Research Organization Registry (ROR). Add another affiliation');
  });
});
