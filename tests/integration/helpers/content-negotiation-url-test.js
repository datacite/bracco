
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import ENV from 'bracco/config/environment';

moduleForComponent('content-negotiation-url', 'helper:content-negotiation-url', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{content-negotiation-url inputValue}}`);

  assert.equal(this.$().text().trim(), ENV.API_URL + '/dois/application/vnd.schemaorg.ld+json/1234');
});

