import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('prefix-list', 'Integration | Component | prefix list', {
  integration: true
});

test('it renders', function(assert) {

  // Template block usage:
  this.render(hbs`
    {{#prefix-list}}

    {{/prefix-list}}
  `);

  assert.dom('*').hasText('');
});
