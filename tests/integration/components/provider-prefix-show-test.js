import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('provider-prefix-show', 'Integration | Component | provider prefix show', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{provider-prefix-show}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#provider-prefix-show}}
      template block text
    {{/provider-prefix-show}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
