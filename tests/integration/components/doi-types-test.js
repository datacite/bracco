import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('doi-types', 'Integration | Component | doi types', {
  integration: true
});

test('it renders', function(assert) {

  // Template block usage:
  this.render(hbs`
    {{#doi-types}}
      template block text
    {{/doi-types}}
  `);

  assert.dom('*').hasText('');
});
