import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render, fillIn, click } from '@ember/test-helpers';

import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi subjects', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('add multiple values', async function(assert) {
    this.set('subject', make('subject'));
    this.set('model', make('doi'));
    this.set('model.subjects', [ this.subject, 
      {
        subject: 'Custom Subject',
        subjectScheme: 'Custom Scheme',
        schemeUri: 'http://www.oecd.org/science/custom.pdf',
        classificationCode: 'CustomCode'
      } ]);
    await render(hbs`{{doi-subjects model=model}}`);
    await click('#toggle-subjects');

    let subjectSchemesInput = this.element.querySelectorAll('input.subject-scheme-field');
    let subjectSchemes = this.element.querySelectorAll('[data-test-subject-scheme]');
    assert.dom(subjectSchemesInput[0]).hasAttribute('disabled', '');
    assert.dom(subjectSchemes[0]).hasValue('Fields of Science and Technology (FOS)');
    
    let subjectSchemeUrisInput = this.element.querySelectorAll('input.subject-scheme-uri-field');
    let subjectSchemeUris = this.element.querySelectorAll('[data-test-subject-uri]');
    assert.dom(subjectSchemeUrisInput[0]).hasAttribute('disabled', '');
    assert.dom(subjectSchemeUris[0]).hasValue('http://www.oecd.org/science/inno/38235147.pdf');

    let subjectSchemeCodesInput = this.element.querySelectorAll('input.subject-classification-code-field');
    let subjectSchemeCodes = this.element.querySelectorAll('[data-test-classification-code]');
    assert.dom(subjectSchemeCodesInput[0]).hasAttribute('disabled', '');
    assert.dom(subjectSchemeCodes[0]).hasValue('3.2');

    assert.dom(subjectSchemes[1]).hasValue('Custom Scheme');
    assert.dom(subjectSchemeUris[1]).hasValue('http://www.oecd.org/science/custom.pdf');
    assert.dom(subjectSchemeCodes[1]).hasValue('CustomCode');

    await fillIn(subjectSchemes[1],'NEW CUSTOM SCHEME');
    assert.dom(subjectSchemes[1]).hasValue('NEW CUSTOM SCHEME');
    await fillIn(subjectSchemeUris[1],'https://example.org/custom.pdf');
    assert.dom(subjectSchemeUris[1]).hasValue('https://example.org/custom.pdf');
    await fillIn(subjectSchemeCodes[1],'abcdCustomCode');
    assert.dom(subjectSchemeCodes[1]).hasValue('abcdCustomCode');

  });
});
