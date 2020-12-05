import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render, fillIn, click } from '@ember/test-helpers';

module('Integration | Component | doi-formats', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi', { formats: ['tiff', 'jpeg'] }));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiFormats @model={{model}} @form={{form}} />
      </BsForm>
    `);

    await click('#toggle-formats');
    let formats = this.element.querySelectorAll('input.format-field');

    assert.dom(formats[0]).hasValue('tiff');
    assert.dom(formats[1]).hasValue('jpeg');
  });

  test('add multiple values', async function (assert) {
    this.set('model', make('doi', { formats: ['tiff', 'jpeg'] }));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiFormats @model={{model}} @form={{form}} />
      </BsForm>
    `);

    await click('#toggle-formats');
    // await click('#add-format');
    // await click('#add-format');
    let formats = this.element.querySelectorAll('input.format-field');
    await fillIn(formats[0], 'gif');
    await fillIn(formats[1], 'png');

    assert.dom(formats[0]).hasValue('gif');
    assert.dom(formats[1]).hasValue('png');
  });
});
