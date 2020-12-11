import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';

module('Integration | Helper | doi-form-errors', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('errors', async function (assert) {
    this.set('model', make('emptyDoi', { mode: 'new' }));

    await render(hbs`{{doi-form-errors model}}`);

    assert
      .dom(this.element)
      .hasText(
        'prefix, suffix, url, publisher, publicationYear, title, name, name, description, subject, relatedIdentifier, relatedIdentifierType, funderName, date, pointLongitude, pointLatitude, rights'
      );
  });

  test('no errors', async function (assert) {
    this.set(
      'model',
      make('doi', {
        mode: 'new',
        prefix: '10.5438',
        suffix: 'cxe5-rg55'
      })
    );

    await render(hbs`{{doi-form-errors model}}`);

    // TODO avoid errors
    assert.dom(this.element).hasText('url');
  });

  test('draft doi', async function (assert) {
    this.set('model', make('draft'));

    await render(hbs`{{doi-form-errors model}}`);

    assert.dom(this.element).hasText('');
  });
});
