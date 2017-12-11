import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('url-transform', 'helper:url-transform', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '10.5072/1234');

  this.render(hbs`{{url-transform inputValue}}`);

  assert.equal(this.$().text().trim(), 'https://data.test.datacite.org/10.5072/1234?status');
});
