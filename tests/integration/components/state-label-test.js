import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | state label', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders registered', async function (assert) {
    this.set('state', 'registered');

    await render(hbs`{{state-label state=this.state}}`);

    assert.dom('span.label-info').hasText('Registered');
  });

  test('it renders findable', async function (assert) {
    this.set('state', 'findable');

    await render(hbs`{{state-label state=this.state}}`);

    assert.dom('span.label-primary').hasText('Findable');
  });
});
