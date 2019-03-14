import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';


module('Integration | Component | doi descriptions', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);



  test('it renders', async function(assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-descriptions model=model}}`);
    await click('#add-description');
    let descriptions = this.element.querySelectorAll('textarea.description-field');

    await fillIn(descriptions[0], "Abhinandan: Crowds gather for Indian pilots release");
    assert.dom(descriptions[0]).hasValue("Abhinandan: Crowds gather for Indian pilots release");
  });

  test('add multiple values', async function(assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-descriptions model=model}}`);
    await click('#add-description');
    await click('#add-description');
    let descriptions = this.element.querySelectorAll('textarea.description-field');

    await fillIn(descriptions[0], "Abhinandan: Crowds gather for Indian pilots release");
    await fillIn(descriptions[1], "Praesent quis blandit odio. Donec justo ex, ");

    assert.dom(descriptions[0]).hasValue("Abhinandan: Crowds gather for Indian pilots release");
    assert.dom(descriptions[1]).hasValue("Praesent quis blandit odio. Donec justo ex, ");
  
  });

  // test('select type and language values', async function(assert) {
  //   this.set('model', make('doi'));
  //   await render(hbs`{{doi-descriptions model=model}}`);
  //   await click('#add-description');

  
  //   let types = this.element.querySelectorAll('.description-types .ember-power-select-trigger'); 
  //   let langs = this.element.querySelectorAll('.description-langs .ember-power-select-trigger'); 

  //   let lang = this.element.querySelectorAll('.power-select-fragment.description-langs .form-group.ember-view')

  //   // await clickTrigger();
  //   await click(lang);
  //   // await selectChoose(".description-langs", '.ember-power-select-option', "Akan");
  //      // await selectChoose(".description-types",'.ember-power-select-option', "Methods");
  //   // await selectChoose(".description-langs", '.ember-power-select-option', "Akan");
  //   // await pauseTest()

  //   assert.dom(".description-types div").hasValue("Methods");
  //   assert.dom(".description-langs div").hasValue("Akan");
  
  // });

});
