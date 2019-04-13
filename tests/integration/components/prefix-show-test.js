import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('prefix-show', 'Integration | Component | prefix show', {
  integration: true
});

test('it renders', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#prefix-show}}
      template block text
    {{/prefix-show}}
  `);

  assert.dom('*').hasText('Providers No providers found. Clients No clients found.');
});
