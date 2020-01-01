// import { module, test } from 'qunit';
// import { setupRenderingTest } from 'ember-qunit';
// import {
//   render,
//   click,
//   typeIn,
//   findAll,
//   triggerKeyEvent,
//   // pauseTest
// } from '@ember/test-helpers';
// import hbs from 'htmlbars-inline-precompile';
// import { setupFactoryGuy, make } from 'ember-data-factory-guy';


// module('Integration | Component | doi creators', function(hooks) {
//   setupRenderingTest(hooks);
//   setupFactoryGuy(hooks);

//   // test('adding multiple persons', async function(assert) {
//   //   this.set('model', make('doi'));

//   //   await render(hbs`{{doi-creators model=model}}`);
//   //   await click('button#add-creator');
//   //   await click('button#add-creator');

//   //   var persons = findAll(".select-person");
//   //   var givenNames = findAll('input.given-name-field');
//   //   var FamilyNames = findAll('input.family-name-field');
//   //   var creators = findAll('input.creator-field');

//   //   await click(persons[0]);
//   //   await fillIn(givenNames[0], "Teresa")
//   //   await fillIn(FamilyNames[0], "May")

//   //   await click(persons[1]);
//   //   await fillIn(givenNames[1], "Billy")
//   //   await fillIn(FamilyNames[1], "Corgan")

//   //   assert.equal(persons[0].checked, true);
//   //   assert.equal(creators[0].value,'May, Teresa');

//   //   assert.equal(persons[1].checked, true);
//   //   assert.equal(creators[1].value,'Corgan, Billy');
//   // });

//   // test('incorrect value(s)', async function(assert) {
//   //   this.set('model', make('doi'));

//   //   await render(hbs`{{doi-creators model=model}}`);
//   //   await click('button#add-creator')

//   //   let nameIdentifiers = findAll('input.name-identifier-field')
//   //   let organisations = findAll('input.select-organisation')
//   //   let persons = findAll('input.select-person')
//   //   var creators = findAll('input.creator-field');

//   //   await typeIn(nameIdentifiers[0], "Teresa May")
//   //   await triggerKeyEvent(creators[0], 'keyup', 'Tab');

//   //   assert.equal(nameIdentifiers[0].className, 'form-control name-identifier-field  ');
//   //   assert.dom(organisations[0]).isNotChecked();
//   //   assert.dom(persons[0]).isChecked();

//   //   await click(organisations[0])
//   //   await typeIn(nameIdentifiers[0], "Nilly May")
//   //   await triggerKeyEvent(creators[0], 'keyup', 'Tab');
//   //   // await pauseTest()

//   //   assert.equal(nameIdentifiers[0].className, 'form-control name-identifier-field  ');
//   //   assert.dom(organisations[0]).isChecked();
//   //   assert.dom(persons[0]).isNotChecked();
//   // });

//   test('no value(s)', async function(assert) {
//     this.set('model', make('doi'));

//     await render(hbs`{{doi-creators model=model}}`);
//     await click('button#add-creator')
//     await click('button#add-creator')
//     var creators = findAll('input.creator-field');
//     await typeIn(creators[0], "")
//     await typeIn(creators[1], "")
//     await triggerKeyEvent(creators[0], 'keyup', 'Tab');
//     await triggerKeyEvent(creators[1], 'keyup', 'Tab');

//     assert.equal(findAll('input.creator-field')[0].value,"");
//     assert.equal(findAll('input.creator-field')[1].value,"");
//     assert.equal(creators[1].className, 'form-control creator-field no-error no-success');
//     assert.equal(creators[1].className, 'form-control creator-field no-error no-success');
//   });
// });
