// import { module, test } from 'qunit';
// import { setupRenderingTest } from 'ember-qunit';
// import { setupFactoryGuy, makeList } from 'ember-data-factory-guy';
// import { render } from '@ember/test-helpers';
// import hbs from 'htmlbars-inline-precompile';

// module('Integration | Component | client list', function(hooks) {
//   setupRenderingTest(hooks);
//   setupFactoryGuy(hooks);

//   test('it renders', async function(assert) {
//     this.set('model', { clients: makeList('client', 2) });
//     await render(hbs`{{client-list model=model link="clients" searchable=true}}`);

//     assert.dom('span.help-block').hasText('Reset All');
//     assert.dom('div.panel-body > h3.work a').exists({ count: 2 });
//     assert.dom('div.panel-body:first-child a').hasText('Australian Data Archive');
//   });
// });
