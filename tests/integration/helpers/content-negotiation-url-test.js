
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content-negotiation', 'helper:content-negotiation', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{content-negotiation inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

