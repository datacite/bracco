
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('format-author', 'helper:format-author', {
  integration: true
});

test('it renders up to two authors', function(assert) {
  this.set('authors', [{ "given": "John", "family": "Smith" }, { "given": "Jane", "family": "Miller" }]);

  this.render(hbs`{{format-author authors}}`);

  assert.equal(this.$().text().trim(), '1234');
});

test('it renders four authors', function(assert) {
  this.set('authors', [{ "given": "John", "family": "Smith" },
                       { "given": "Jane", "family": "Miller" },
                       { "given": "Beth", "family": "Jones" },
                       { "given": "William", "family": "Hunter" }]);

  this.render(hbs`{{format-author authors}}`);

  assert.equal(this.$().text().trim(), '1234');
});
