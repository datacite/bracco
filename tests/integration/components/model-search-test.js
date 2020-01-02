// import { module, test } from 'qunit';
// import { setupRenderingTest } from 'ember-qunit';
// import { render } from '@ember/test-helpers';
// import hbs from 'htmlbars-inline-precompile';

// module('Integration | Component | model search', function(hooks) {
//   setupRenderingTest(hooks);

//   test('search dois', async function(assert) {
//     await render(hbs`
//       {{#model-search name='DOI' query='climate' total=2 sortable=true}}

//       {{/model-search}}
//     `);
//     assert.dom('*').hasText('Search Reset All Sort by Date Updated Sort by Date Created Sort by DOI Sort by Relevance 2 Dois');
//   });

//   test('search providers', async function(assert) {
//     await render(hbs`
//       {{#model-search name='Member' query='university' total=31 sortable=true}}

//       {{/model-search}}
//     `);
//     assert.dom('*').hasText('Search Reset All Sort by Name Sort by Date Joined Sort by Relevance 31 Members');
//   });

//   test('search repositories', async function(assert) {
//     await render(hbs`
//       {{#model-search name='Repository' query='university' total=22 sortable=true}}

//       {{/model-search}}
//     `);
//     assert.dom('*').hasText('Search Reset All Sort by Name Sort by Date Joined Sort by Relevance 22 Repositories');
//   });

//   test('search prefixes', async function(assert) {
//     await render(hbs`
//       {{#model-search name='Prefix' query='10.5038' total=3 sortable=true}}

//       {{/model-search}}
//     `);
//     assert.dom('*').hasText('Search Reset All Sort by Prefix Sort by Date Created 3 Prefixes');
//   });

//   test('search users', async function(assert) {
//     await render(hbs`
//       {{#model-search name='User' query='john' total=64 sortable=true}}

//       {{/model-search}}
//     `);
//     assert.dom('*').hasText('Search Reset All Sort by Name Sort by Date Joined Sort by Relevance 64 Users');
//   });
// });
