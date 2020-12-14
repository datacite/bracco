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

    await click('[data-test-toggle-formats]');
    let formats = this.element.querySelectorAll('input.format-field');

    assert.equal(formats.length, 2);
    assert.dom(formats[0]).hasValue('tiff');
    assert.dom(formats[1]).hasValue('jpeg');
    assert.dom('[data-test-toggle-formats]').hasText('Hide 2 formats');
    assert.dom('[data-test-add-format]').hasText('Add another format');
  });

  test('no formats', async function (assert) {
    this.set('model', make('doi', { formats: null }));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiFormats @model={{model}} @form={{form}} />
      </BsForm>
    `);

    assert.dom('[data-test-toggle-formats]').doesNotExist();
    assert.dom('[data-test-add-format]').hasText('Add format');
  });

  test('add format', async function (assert) {
    this.set('model', make('doi', { formats: [] }));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiFormats @model={{model}} @form={{form}} />
      </BsForm>
    `);

    await click('[data-test-add-format]');
    await fillIn('input.format-field', 'gif');

    assert.dom('input.format-field').hasValue('gif');
    assert.dom('[data-test-toggle-formats]').hasText('Hide 1 format');
    assert.dom('[data-test-add-format]').hasText('Add another format');
  });
});
