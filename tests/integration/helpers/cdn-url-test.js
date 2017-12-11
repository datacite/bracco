import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import ENV from 'bracco/config/environment';

moduleForComponent('cdn-url', 'helper:cdn-url', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{cdn-url}}`);

  assert.equal(this.$().text(), ENV.CDN_URL);
});
