import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  click,
  findAll,
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';


module('Integration | Component | doi contributors', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('adding multiple persons', async function(assert) {
    this.set('model', make('doi'));

    await render(hbs`{{doi-contributors model=model}}`);
    await click('button#add-contributor');
    await click('button#add-contributor');

    assert.equal(findAll('input.given-name-field').length, 2);
  });
});
