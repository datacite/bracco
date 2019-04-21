// import { module, test } from 'qunit';
// import { setupRenderingTest } from 'ember-qunit';
// import { setupFactoryGuy, make } from 'ember-data-factory-guy';
// import { render } from '@ember/test-helpers';
// import hbs from 'htmlbars-inline-precompile';

// module('Integration | Component | doi creator', function(hooks) {
//   setupRenderingTest(hooks);
//   setupFactoryGuy(hooks);

//   test('it renders', async function(assert) {
//     this.set('model', make('doi'));
//     this.set('creator', make('creator'));

//     await render(hbs`{{doi-creator model=model fragment=creator index=0}}`);

//     assert.dom('*').hasText('Name Identifier (optional) Uniquely identifies an individual or legal entity, according to various schemas, e.g. ORCID, ROR or ISNI. Use name identifier expressed as URL. The Given Name, Family Name and Name will automatically be filled out for ORCID and ROR identifiers. Add another name identifier Person Organization Given Name Family Name Name (from Given Name and Family Name) The main researchers involved in producing the data, or the authors of the publication, in priority order. Affiliation (optional) Organization names are provided by the Research Organization Registry (ROR). Add another affiliation');
//   });
// });
