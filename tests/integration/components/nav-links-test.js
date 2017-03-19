import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nav-links', 'Integration | Component | nav-links', {
  integration: true
});

test('it renders', function(assert) {
  this.set('navLinks', [{ url: "http://example.com", name: "Example" }]);

  this.render(hbs`{{nav-links links=navLinks}}`);
  assert.equal(this.$().text().trim(), 'Example');
});
