import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi-name-identifier', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{doi-name-identifier}}`);

    assert.dom('*').hasText('Use name identifier expressed as URL. Uniquely identifies an individual or legal entity, according to various schemas, e.g. ORCID, ROR or ISNI. The Given Name, Family Name, and Name will automatically be filled out for ORCID and ROR identifiers.');
  });
});
