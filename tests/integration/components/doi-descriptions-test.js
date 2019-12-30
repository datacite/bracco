// import { module, test } from 'qunit';
// import { setupRenderingTest } from 'ember-qunit';
// import { setupFactoryGuy, make } from 'ember-data-factory-guy';
// import { render, fillIn, click } from '@ember/test-helpers';
// import hbs from 'htmlbars-inline-precompile';

// module('Integration | Component | doi descriptions', function(hooks) {
//   setupRenderingTest(hooks);
//   setupFactoryGuy(hooks);

//   test('it renders', async function(assert) {
//     this.set('model', make('doi'));
//     await render(hbs`{{doi-descriptions model=model}}`);
//     await click('#add-description');
//     let descriptions = this.element.querySelectorAll('textarea.description-field');

//     await fillIn(descriptions[0], "Abhinandan: Crowds gather for Indian pilots release");
//     assert.dom(descriptions[0]).hasValue("Abhinandan: Crowds gather for Indian pilots release");
//   });

//   test('add multiple values', async function(assert) {
//     this.set('model', make('doi'));
//     await render(hbs`{{doi-descriptions model=model}}`);
//     await click('#add-description');
//     await click('#add-description');
//     let descriptions = this.element.querySelectorAll('textarea.description-field');

//     await fillIn(descriptions[0], "Abhinandan: Crowds gather for Indian pilots release");
//     await fillIn(descriptions[1], "Praesent quis blandit odio. Donec justo ex, ");

//     assert.dom(descriptions[0]).hasValue("Abhinandan: Crowds gather for Indian pilots release");
//     assert.dom(descriptions[1]).hasValue("Praesent quis blandit odio. Donec justo ex, ");
//   });
// });
