import { find } from '@ember/test-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('doi-metadata', 'Integration | Component | doi metadata', {
  integration: true
});

test('it renders', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#doi-metadata}}
      template block text
    {{/doi-metadata}}
  `);

  assert.equal(find('*').textContent.trim(), '');
});
