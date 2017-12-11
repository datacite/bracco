import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import ENV from 'bracco/config/environment';

moduleForComponent('site-title', 'helper:site-title', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{site-title}}`);

  assert.equal(this.$().text().trim(), ENV.SITE_TITLE);
});
