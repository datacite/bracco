import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';

module('Integration | Helper | repository-form-errors', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('errors', async function (assert) {
    this.set(
      'model',
      make('repository', {
        name: null,
        systemEmail: null,
        serviceContact: { email: 'jane' }
      })
    );

    await render(hbs`{{repository-form-errors model}}`);
    // TODO fix repository ID validation
    assert
      .dom(this.element)
      .hasText(
        'repository ID, repository name, system email, service contact email'
      );
  });

  test('no errors', async function (assert) {
    this.set('model', make('repository'));

    await render(hbs`{{repository-form-errors model}}`);
    // TODO fix repository ID validation
    assert.dom(this.element).hasText('repository ID');
  });
});
