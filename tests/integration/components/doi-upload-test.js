import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('doi-upload', 'Integration | Component | doi upload', {
  integration: true
});

test('it renders', function(assert) {

  // Template block usage:
  this.render(hbs`
    {{#doi-upload}}
      template block text
    {{/doi-upload}}
  `);

  assert.dom('*').hasText('Metadata Upload File');
});
