import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi-contributors', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('adding multiple persons', async function (assert) {
    this.set('model', make('doi'));

    await render(hbs`{{doi-contributors model=model}}`);
    await click('[data-test-add-contributor]');

    assert.dom('input.given-name-field').exists({ count: 1 });
  });
});
