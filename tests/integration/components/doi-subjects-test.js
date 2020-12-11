import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

import { render, fillIn, click } from '@ember/test-helpers';

module('Integration | Component | doi subjects', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('add multiple values', async function (assert) {
    this.set('subject', make('subject'));
    this.set('model', make('doi'));
    this.set('model.subjects', [this.subject]);
    await render(hbs`{{doi-subjects model=model}}`);
    await click('[data-test-toggle-subjects]');
    await click('[data-test-add-subject]');
    let subjects = this.element.querySelectorAll('[data-test-subject-scheme]');

    await fillIn(subjects[0], 'Fields of Science and Technology (FOS)');
    assert.dom(subjects[0]).hasValue('Fields of Science and Technology (FOS)');
  });
});
