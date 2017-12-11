import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import ENV from 'bracco/config/environment';

moduleForComponent('orcid-url', 'helper:orcid-url', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{orcid-url}}`);

  assert.equal(this.$().text(), ENV.ORCID_URL);
});
