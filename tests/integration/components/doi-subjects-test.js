import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render, fillIn,  click } from '@ember/test-helpers';

import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi subjects', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('add multiple values', async function(assert) {
    this.set('subject', make('subject'));
    this.set('model', make('doi'));
    this.set('model.subjects', [ this.subject ]);
    await render(hbs`{{doi-subjects model=model}}`);
    await click('#toggle-subjects');
    await click('#add-subject');
    await click('#add-subject');
    let subjectSchemes = this.element.querySelectorAll('[data-test-subject-scheme]');

    await fillIn(subjectSchemes[0],'Fields of Science and Technology (FOS)');
    assert.dom(subjectSchemes[0]).hasValue('Fields of Science and Technology (FOS)');
    
    let subjectSchemeUris = this.element.querySelectorAll('[data-test-subject-uri]');
    await fillIn(subjectSchemeUris[0],'https://example.com/fos');
    assert.dom(subjectSchemeUris[0]).hasValue('https://example.com/fos');

    let subjectSchemeCodes = this.element.querySelectorAll('[data-test-classification-code]');
    await fillIn(subjectSchemeCodes[0],'ABC123');
    assert.dom(subjectSchemeCodes[0]).hasValue('ABC123');

  });
});
