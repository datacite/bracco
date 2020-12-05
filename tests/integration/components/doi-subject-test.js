import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi-subject', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('subject'));
    await render(hbs`{{doi-subject model=model fragment=fragment index=0}}`);

    assert
      .dom('*')
      .hasText(
        'Subject Scheme The name of the subject scheme or classification code or authority if one is used. Subject Scheme URI The URI of the subject identifier scheme. For example http://id.loc.gov/authorities/subjects'
      );
  });
});
