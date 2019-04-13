import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('url-check', 'Integration | Component | url check', {
  integration: true
});

test('it renders', function(assert) {

  // Template block usage:
  this.render(hbs`
    {{#url-check}}
      working …
    {{/url-check}}
  `);

  assert.equal(this.$().text().trim(), '');
});
