import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('list-links', 'Integration | Component | list-links', {
  integration: true
});

test('it renders', function(assert) {
  this.set('listLinks', [{ url: "http://example.com", name: "Example" }]);

  this.render(hbs`{{list-links links=listLinks}}`);
  assert.equal(this.$().text().trim(), 'Example');
});
