import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
// import { pauseTest } from 'ember-power-select/test-support';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi size', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-size model=model fragment="5kb" index=0}}`);
    // await pauseTest();

    assert.dom('*').hasText('');
  });

  test('it renders add add size', async function (assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-size model=model fragment="5kb" index=0}}`);

    assert.dom('[data-test-size]').hasValue('5kb');
  });
});
