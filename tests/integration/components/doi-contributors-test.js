import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, findAll } from '@ember/test-helpers';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi contributors', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('adding multiple persons', async function (assert) {
    this.set('model', make('doi'));

    await render(hbs`{{doi-contributors model=this.model}}`);
    await click('button#add-contributor');
    await click('button#add-contributor');

    assert.dom('input.given-name-field').exists({ count: 2 });
  });
});
