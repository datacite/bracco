import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render, fillIn, click } from '@ember/test-helpers';

module('Integration | Component | doi-sizes', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi', { sizes: ['2 pages', '750kB'] }));

    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiSizes @model={{model}} @form={{form}} />
      </BsForm>
    `);

    await click('[data-test-toggle-sizes]');
    let sizes = this.element.querySelectorAll('input.size-field');

    assert.equal(sizes.length, 2);
    assert.dom(sizes[0]).hasValue('2 pages');
    assert.dom(sizes[1]).hasValue('750kB');
    assert.dom('[data-test-toggle-sizes]').hasText('Hide 2 sizes');
    assert.dom('[data-test-add-size]').hasText('Add another size');
  });

  test('no sizes', async function (assert) {
    this.set('model', make('doi', { sizes: null }));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiFormats @model={{model}} @form={{form}} />
      </BsForm>
    `);

    assert.dom('[data-test-toggle-sizes]').doesNotExist();
    assert.dom('[data-test-add-size]').hasText('Add size');
  });

  test('add size', async function (assert) {
    this.set('model', make('doi', { sizes: [] }));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiSizes @model={{model}} @form={{form}} />
      </BsForm>
    `);

    assert.dom('[data-test-size]').doesNotExist();

    await click('[data-test-add-size]');
    await fillIn('[data-test-size]', '5kB');

    assert.dom('[data-test-size]').hasValue('5kB');
    assert.dom('[data-test-toggle-sizes]').hasText('Hide 1 size');
    assert.dom('[data-test-add-size]').hasText('Add another size');
  });
});
