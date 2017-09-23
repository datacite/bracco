import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('provider-prefix-list', 'Integration | Component | provider prefix list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{provider-prefix-list}}`);

  assert.equal(this.$().text().trim(), 'No prefixes found.');

  // Template block usage:
  this.render(hbs`
    {{#provider-prefix-list}}

    {{/provider-prefix-list}}
  `);

  assert.equal(this.$().text().trim(), 'No prefixes found.');
});
