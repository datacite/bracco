import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | state label', function(hooks) {
  setupRenderingTest(hooks);

  // test('it renders draft', function(assert) {
  //   this.set('state', 'draft');

  //   this.render(hbs`{{state-label state=state}}`);

  //   assert.equal(this.$('span.label-default').text().trim(), 'Draft');
  // });

  test('it renders registered', async function(assert) {
    this.set('state', 'registered');

    await render(hbs`{{state-label state=state}}`);

    assert.dom('span.label-info').hasText('Registered');
  });

  test('it renders findable', async function(assert) {
    this.set('state', 'findable');

    await render(hbs`{{state-label state=state}}`);

    assert.dom('span.label-primary').hasText('Findable');
  });
});
