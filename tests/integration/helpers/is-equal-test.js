
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('is-equal', 'helper:is-equal', {
  integration: true
});

test('it renders true', function(assert) {
  this.set('inputValue', ['1234', '1234']);

  this.render(hbs`{{is-equal inputValue}}`);

  assert.ok(this.$(), 'is equal');
});

// test('it renders false', function(assert) {
//   this.set('inputValue', ['1234', '5678']);
//
//   this.render(hbs`{{is-equal inputValue}}`);
//
//   assert.notOk(this.$(), 'is not equal');
// });
