import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';

module('Integration | Component | doi affiliation', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    this.set('creator', make('creator'));
    this.set('affiliation', make('affiliation'));

    await render(
      hbs`{{doi-affiliation model=this.model creator=this.creator fragment=this.affiliation index=0}}`
    );

    assert.dom('*').hasText('');
  });
});
