import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('menu-links', 'Integration | Component | menu-links', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{menu-links}}`);
  assert.ok(/^Services+/.test(this.$().text().trim()), 'begins with Services');
});
