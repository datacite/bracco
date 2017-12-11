import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import ENV from 'bracco/config/environment';

moduleForComponent('search-url', 'helper:search-url', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{search-url}}`);

  assert.equal(this.$().text(), ENV.SEARCH_URL);
});
