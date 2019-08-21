// import { module, test } from 'qunit';
// import { setupRenderingTest } from 'ember-qunit';
// import { render } from '@ember/test-helpers';
// import hbs from 'htmlbars-inline-precompile';

// module('helper:format-creator', function(hooks) {
//   setupRenderingTest(hooks);

//   test('it renders one creator', async function(assert) {
//     this.set('creators', [{
//       "type": "Person",
//       "id": "https://orcid.org/0000-0002-2822-4968",
//       "name": "Mitesh Patel",
//       "given-name": "Mitesh",
//       "family-name": "Patel"
//     }]);

//     await render(hbs`{{format-creator creators}}`);

//     assert.dom('*').hasText('<a href="https://orcid.org/0000-0002-2822-4968">Mitesh Patel</a>');
//   });

//   test('it renders three creators', async function(assert) {
//     this.set('creators', [
//       {
//         "type": "Person",
//         "name": "Empbh R. Goh",
//         "given-name": "Empbh R.",
//         "family-name": "Goh"
//       }, {
//         "type": "Person",
//         "name": "M. Barrgow",
//         "given-name": "M.",
//         "family-name": "Barrgow"
//       }, {
//         "type": "Person",
//         "name": "M. Barrgoe",
//         "given-name": "M.",
//         "family-name": "Barrgoe"
//       }
//     ]);

//     await render(hbs`{{format-creator creators}}`);

//     assert.dom('*').hasText('Empbh R. Goh, M. Barrgow & M. Barrgoe');
//   });
// });
