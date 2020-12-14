import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

import { render, fillIn, click } from '@ember/test-helpers';

module('Integration | Component | doi-subjects', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set(
      'model',
      make('doi', {
        subjects: [
          {
            subject: 'Clinical medicine',
            subjectScheme: 'Fields of Science and Technology (FOS)',
            schemeUri: 'http://www.oecd.org/science/inno/38235147.pdf'
          }
        ]
      })
    );
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiSubjects @model={{model}} @form={{form}} />
      </BsForm>
    `);

    await click('[data-test-toggle-subjects]');

    assert.dom('input.subject-field').hasValue('10.80225/rph240519sdfd');
    assert.dom('[data-test-add-subject]').hasText('Add another subject');
  });

  test('no subjects', async function (assert) {
    this.set('model', make('doi', { subjects: null }));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiSubjects @model={{model}} @form={{form}} />
      </BsForm>
    `);

    assert.dom('[data-test-toggle-subjects]').doesNotExist();
    assert.dom('[data-test-add-subject]').hasText('Add subject');
  });

  test('add subject', async function (assert) {
    this.set('model', make('doi', { subjects: [] }));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiSubjects @model={{model}} @form={{form}} />
      </BsForm>
    `);
    await click('[data-test-add-subject]');
    await fillIn('input.subject-field', 'Clinical Medicine');

    assert.dom('input.subject-field').hasValue('Clinical Medicine');
    assert.dom('[data-test-toggle-subjects]').hasText('Hide 1 subject');
    assert.dom('[data-test-add-subject]').hasText('Add another subject');
  });
});
